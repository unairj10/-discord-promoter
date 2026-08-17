require('dotenv').config();
const { Client, GatewayIntentBits, ChannelType, PermissionFlagsBits } = require('discord.js');
const config = require('./config');

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once('ready', async () => {
  const guild = client.guilds.cache.get(config.guildId);
  if (!guild) { console.error('❌ Servidor no encontrado'); process.exit(1); }

  // Find ADMINISTRACIÓN category
  let adminCategory = guild.channels.cache.find(
    c => c.type === ChannelType.GuildCategory && (c.name === 'ADMINISTRACIÓN' || c.name === 'ADMINISTRACION')
  );

  if (!adminCategory) {
    adminCategory = await guild.channels.create({
      name: 'ADMINISTRACIÓN',
      type: ChannelType.GuildCategory,
      permissionOverwrites: [
        { id: guild.id, deny: [PermissionFlagsBits.ViewChannel] }
      ]
    });
    console.log('✅ Categoría ADMINISTRACIÓN creada');
  }

  // Check if transcripts channel exists
  const existing = guild.channels.cache.find(c => c.name === 'transcripts');
  if (existing) {
    console.log('✅ Canal transcripts ya existe');
    process.exit(0);
  }

  // Create transcripts channel
  const ownerRole = guild.roles.cache.find(r => r.name.includes('Owner'));
  const adminRole = guild.roles.cache.find(r => r.name.includes('Admin'));
  const modRole = guild.roles.cache.find(r => r.name.includes('Moderador'));

  const overwrites = [
    { id: guild.id, deny: [PermissionFlagsBits.ViewChannel] }
  ];

  if (ownerRole) overwrites.push({ id: ownerRole.id, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages] });
  if (adminRole) overwrites.push({ id: adminRole.id, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages] });
  if (modRole) overwrites.push({ id: modRole.id, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages] });

  await guild.channels.create({
    name: 'transcripts',
    type: ChannelType.GuildText,
    parent: adminCategory.id,
    permissionOverwrites: overwrites
  });

  console.log('✅ Canal #transcripts creado en ADMINISTRACIÓN');
  process.exit(0);
});

client.login(config.token);
