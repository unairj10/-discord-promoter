require('dotenv').config({ path: '.env.new' });
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers]
});

client.once('ready', async () => {
  const guild = client.guilds.cache.get(process.env.GUILD_ID);
  if (!guild) { console.log('Servidor no encontrado'); process.exit(1); }

  console.log('Servidor:', guild.name);
  console.log('Miembros:', guild.members.cache.size);

  // Try to fetch the role
  try {
    const role = await guild.roles.fetch('1485405932728090749');
    console.log('Rol encontrado:', role.name);
    console.log('Color:', role.color);
    console.log('Posición:', role.position);
  } catch (e) {
    console.log('Error al buscar rol:', e.message);
  }

  // Try to add role to a member (the bot owner)
  try {
    const me = await guild.members.fetch(guild.ownerId);
    console.log('Probando con:', me.user.tag);
    
    const role = guild.roles.cache.get('1485405932728090749');
    if (role) {
      await me.roles.add(role);
      console.log('✅ Rol añadido exitosamente');
    } else {
      console.log('❌ Rol no encontrado en cache');
    }
  } catch (e) {
    console.log('Error al añadir rol:', e.message);
    console.log('Error code:', e.code);
  }

  process.exit(0);
});

client.login(process.env.DISCORD_TOKEN);
