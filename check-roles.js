require('dotenv').config({ path: '.env.new' });
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once('ready', async () => {
  const guild = client.guilds.cache.get(process.env.GUILD_ID);
  if (!guild) { console.log('Servidor no encontrado'); process.exit(1); }

  console.log('Roles en el servidor:');
  guild.roles.cache.forEach(role => {
    console.log(`  ${role.id} - ${role.name}`);
  });

  process.exit(0);
});

client.login(process.env.DISCORD_TOKEN);
