require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const config = require('./config');

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once('ready', async () => {
  const guild = client.guilds.cache.get(config.guildId);
  if (!guild) { process.exit(1); }

  const me = guild.members.cache.get(client.user.id);
  if (me) {
    await me.setNickname('Zenith Bot');
    console.log('✅ Nickname cambiado a "Zenith Bot"');
  }

  process.exit(0);
});

client.login(config.token);
