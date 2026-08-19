require('dotenv').config();
const { Client, GatewayIntentBits, PermissionFlagsBits, ChannelType } = require('discord.js');
const config = require('./config');

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once('ready', async () => {
  const guild = client.guilds.cache.get(config.guildId);
  if (!guild) { console.log('Servidor no encontrado'); process.exit(1); }

  const colaboradorRole = guild.roles.cache.find(r => r.name.includes('Colaborador'));
  if (!colaboradorRole) { console.log('Rol Colaborador no encontrado'); process.exit(1); }

  // Find COMUNIDAD category
  const comunidadCategory = guild.channels.cache.find(
    c => c.type === ChannelType.GuildCategory && c.name === 'COMUNIDAD'
  );

  if (comunidadCategory) {
    // Allow Colaborador to view and write in the category
    await comunidadCategory.permissionOverwrites.edit(colaboradorRole, {
      ViewChannel: true,
      SendMessages: true,
      ReadMessageHistory: true
    });
    console.log('Categoria COMUNIDAD: Colaborador puede escribir');
  }

  // Find all channels in COMUNIDAD
  const comunidadChannels = guild.channels.cache.filter(
    c => c.parentId === comunidadCategory?.id
  );

  for (const [, channel] of comunidadChannels) {
    // Deny @everyone from sending messages
    await channel.permissionOverwrites.edit(guild.id, {
      SendMessages: false
    });

    // Allow Colaborador to send messages
    await channel.permissionOverwrites.edit(colaboradorRole, {
      ViewChannel: true,
      SendMessages: true,
      ReadMessageHistory: true
    });

    console.log(`Canal #${channel.name}: Colaborador puede escribir`);
  }

  console.log('Permisos configurados');
  process.exit(0);
});

client.login(config.token);
