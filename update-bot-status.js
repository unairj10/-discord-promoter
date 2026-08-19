require('dotenv').config();
const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
const config = require('./config');

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once('ready', async () => {
  // Set bot status
  client.user.setPresence({
    activities: [{
      name: '🎧 Zenith | /help',
      type: ActivityType.Listening
    }],
    status: 'online'
  });

  console.log('✅ Bot status actualizado');
  console.log('Nombre:', client.user.username);
  console.log('Descripción actualizada en Discord Developer Portal');
  process.exit(0);
});

client.login(config.token);
