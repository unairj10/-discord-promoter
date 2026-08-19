require('dotenv').config();
const { Client, GatewayIntentBits, ChannelType } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', () => {
  const g = client.guilds.cache.get(process.env.GUILD_ID);
  const cat = g.channels.cache.find(x => x.type === ChannelType.GuildCategory && x.name === 'TICKETS');
  if (cat) {
    const ch = g.channels.cache.filter(x => x.parentId === cat.id);
    ch.forEach(x => console.log(x.id, x.name));
  } else {
    console.log('No TICKETS category');
  }
  process.exit(0);
});

client.login(process.env.DISCORD_TOKEN);
