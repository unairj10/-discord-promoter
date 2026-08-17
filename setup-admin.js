require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const config = require('./config');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers]
});

const adminRoles = [
  { name: '👑 Owner', color: '#FFD700', permissions: ['Administrator'], position: 10 },
  { name: '⚡ Admin', color: '#FF4500', permissions: ['Administrator'], position: 9 },
  { name: '🛡️ Moderador', color: '#1E90FF', permissions: ['ManageMessages', 'KickMembers', 'BanMembers', 'ManageChannels', 'ManageRoles'], position: 8 },
  { name: '🔧 Staff', color: '#32CD32', permissions: ['ManageMessages', 'KickMembers'], position: 7 },
  { name: '🎮 Gestor de Comunidad', color: '#9932CC', permissions: ['ManageMessages', 'ManageChannels'], position: 6 },
  { name: '📢 Community Manager', color: '#FF69B4', permissions: ['ManageMessages', 'ManageChannels', 'ManageRoles'], position: 5 },
  { name: '🎨 Diseñador', color: '#00CED1', permissions: ['ManageMessages'], position: 4 },
  { name: '💻 Desarrollador', color: '#FFA500', permissions: ['ManageMessages', 'ManageChannels'], position: 3 },
  { name: '📝 Editor', color: '#20B2AA', permissions: ['ManageMessages'], position: 2 },
  { name: '🤝 Colaborador', color: '#9370DB', permissions: ['ManageMessages'], position: 1 },
];

client.once('ready', async () => {
  console.log(`✅ Conectado como ${client.user.tag}`);
  
  const guild = client.guilds.cache.get(config.guildId);
  if (!guild) {
    console.error('❌ No se encontró el servidor');
    process.exit(1);
  }

  console.log(`📡 Configurando roles en: ${guild.name}`);

  for (const roleConfig of adminRoles) {
    const existingRole = guild.roles.cache.find(r => r.name === roleConfig.name);
    if (existingRole) {
      console.log(`  ⏭️ Rol ${roleConfig.name} ya existe`);
      continue;
    }

    try {
      const role = await guild.roles.create({
        name: roleConfig.name,
        color: roleConfig.color,
        permissions: roleConfig.permissions,
        mentionable: true,
        reason: `Rol de administración: ${roleConfig.name}`
      });
      console.log(`  ✅ Rol ${roleConfig.name} creado`);
    } catch (error) {
      console.error(`  ❌ Error creando rol ${roleConfig.name}:`, error.message);
    }
  }

  // Create admin channels
  const adminCategory = guild.channels.cache.find(
    c => c.type === 4 && c.name === 'ADMINISTRACIÓN'
  );

  if (!adminCategory) {
    try {
      const category = await guild.channels.create({
        name: 'ADMINISTRACIÓN',
        type: 4,
        permissionOverwrites: [
          {
            id: guild.id,
            deny: ['ViewChannel']
          },
          {
            id: guild.roles.cache.find(r => r.name === '👑 Owner')?.id,
            allow: ['ViewChannel', 'SendMessages', 'ManageChannels', 'ManageRoles']
          },
          {
            id: guild.roles.cache.find(r => r.name === '⚡ Admin')?.id,
            allow: ['ViewChannel', 'SendMessages', 'ManageChannels']
          },
          {
            id: guild.roles.cache.find(r => r.name === '🛡️ Moderador')?.id,
            allow: ['ViewChannel', 'SendMessages', 'ManageMessages']
          }
        ]
      });

      // Create admin channels
      const adminChannels = ['logs', 'staff-chat', 'moderación', 'anuncios-staff'];
      for (const channelName of adminChannels) {
        await guild.channels.create({
          name: channelName,
          type: 0,
          parent: category.id,
          permissionOverwrites: [
            {
              id: guild.id,
              deny: ['ViewChannel']
            },
            {
              id: guild.roles.cache.find(r => r.name === '👑 Owner')?.id,
              allow: ['ViewChannel', 'SendMessages']
            },
            {
              id: guild.roles.cache.find(r => r.name === '⚡ Admin')?.id,
              allow: ['ViewChannel', 'SendMessages']
            },
            {
              id: guild.roles.cache.find(r => r.name === '🛡️ Moderador')?.id,
              allow: ['ViewChannel', 'SendMessages']
            }
          ]
        });
        console.log(`  ✅ Canal ${channelName} creado`);
      }
    } catch (error) {
      console.error(`  ❌ Error creando categoría de administración:`, error.message);
    }
  }

  console.log('\n🎉 ¡Roles de administración creados!');
  process.exit(0);
});

client.login(config.token);
