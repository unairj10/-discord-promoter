require('dotenv').config();
const { Client, GatewayIntentBits, ChannelType } = require('discord.js');
const config = require('./config');

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once('ready', async () => {
  const guild = client.guilds.cache.get(config.guildId);
  if (!guild) { process.exit(1); }

  // Update categories
  const categories = [
    { name: 'INFORMACIÓN', newName: '📋 INFORMACIÓN' },
    { name: 'PORTFOLIO', newName: '💼 PORTFOLIO' },
    { name: 'HERRAMIENTAS', newName: '🛠️ HERRAMIENTAS' },
    { name: 'CONTENIDO', newName: '📝 CONTENIDO' },
    { name: 'MARKETING', newName: '📈 MARKETING' },
    { name: 'COMUNIDAD', newName: '👥 COMUNIDAD' },
    { name: 'ROLES', newName: '🎭 ROLES' },
    { name: 'TICKETS', newName: '🎫 TICKETS' },
    { name: 'ADMINISTRACIÓN', newName: '⚙️ ADMINISTRACIÓN' }
  ];

  for (const cat of categories) {
    const category = guild.channels.cache.find(c => c.type === ChannelType.GuildCategory && c.name === cat.name);
    if (category) {
      await category.setName(cat.newName);
      console.log(`✅ Categoría: ${cat.name} → ${cat.newName}`);
    }
  }

  // Update channels
  const channels = [
    // INFORMACIÓN
    { id: '1538760756533657663', newName: '📜-reglas' },
    { id: '1538760757876049931', newName: '📢-anuncios' },
    { id: '1538760759235113001', newName: '🔔-notificaciones' },
    // PORTFOLIO
    { id: '1538760762867191862', newName: '💼-portfolio-web' },
    { id: '1538760764251181076', newName: '🎨-branding' },
    { id: '1538760765463339050', newName: '📸-galeria-fotografica' },
    // HERRAMIENTAS
    { id: '1538760767044401203', newName: '👥-asistente-comunidad' },
    { id: '1538760768520796180', newName: '📊-calculadora-presupuestos' },
    // CONTENIDO
    { id: '1538760769737101353', newName: '📝-blog-personal' },
    { id: '1538760776909848718', newName: '🍳-web-recetas' },
    { id: '1538760775991173170', newName: '🧠-juego-memoria' },
    { id: '1538760778528854117', newName: '📱-app-tareas' },
    // MARKETING
    { id: '1538760781053829280', newName: '🏪-landing-negocio' },
    { id: '1538760782286946335', newName: '🎬-videos-marca' },
    { id: '1538760783763345418', newName: '🖼️-imagenes-promocionales' },
    // COMUNIDAD
    { id: '1538760785340207174', newName: '💬-chat-general' },
    { id: '1538760786418106409', newName: '💡-sugerencias' },
    { id: '1538760787345014884', newName: '🗳️-votaciones' },
    // TICKETS
    { id: '1538923207166271549', newName: '🎫-abrir-ticket' }
  ];

  for (const ch of channels) {
    const channel = guild.channels.cache.get(ch.id);
    if (channel) {
      await channel.setName(ch.newName);
      console.log(`✅ Canal: ${channel.name} → ${ch.newName}`);
    }
  }

  console.log('\n🎉 Todas las categorías y canales actualizados');
  process.exit(0);
});

client.login(config.token);
