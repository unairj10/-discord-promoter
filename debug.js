require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers]
});

client.once('ready', () => {
  console.log(`Bot: ${client.user.tag}`);
  console.log(`ID: ${client.user.id}`);
  console.log(`Guilds count: ${client.guilds.cache.size}`);
  
  if (client.guilds.cache.size === 0) {
    console.log('\n❌ El bot NO está en ningún servidor.');
    console.log('\n🔧 Soluciones:');
    console.log('1. Ve a https://discord.com/developers/applications');
    console.log('2. Selecciona tu bot');
    console.log('3. OAuth2 → URL Generator');
    console.log('4. Marca: bot + applications.commands');
    console.log('5. En Bot Permissions marca: Administrator');
    console.log('6. Usa la URL que se genera abajo para invitar al bot');
  } else {
    client.guilds.cache.forEach(g => {
      console.log(`  - ${g.name} | ID: ${g.id} | Members: ${g.memberCount}`);
    });
  }
  
  process.exit(0);
});

client.on('error', error => {
  console.error('Error:', error.message);
  process.exit(1);
});

client.login(process.env.DISCORD_TOKEN);
