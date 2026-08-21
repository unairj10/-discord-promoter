require('dotenv').config({ path: '.env.new' });
const { Client, GatewayIntentBits, ChannelType } = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once('ready', async () => {
  const guild = client.guilds.cache.get(process.env.GUILD_ID);
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
    { find: 'bienvenida', newName: '👋-bienvenida' },
    { find: 'reglas', newName: '📜-reglas' },
    { find: 'anuncios', newName: '📢-anuncios' },
    { find: 'proyectos', newName: '📋-proyectos' },
    // PORTFOLIO
    { find: 'portfolio-web', newName: '💼-portfolio-web' },
    { find: 'branding', newName: '🎨-branding' },
    { find: 'galeria-fotografica', newName: '📸-galeria-fotografica' },
    // HERRAMIENTAS
    { find: 'asistente-comunidad', newName: '👥-asistente-comunidad' },
    { find: 'app-tareas', newName: '📱-app-tareas' },
    { find: 'calculadora-presupuestos', newName: '📊-calculadora-presupuestos' },
    { find: 'editor-imagenes', newName: '🖼️-editor-imagenes' },
    // CONTENIDO
    { find: 'ediciones-montajes', newName: '🎞️-ediciones-montajes' },
    { find: 'juego-memoria', newName: '🧠-juego-memoria' },
    { find: 'web-recetas', newName: '🍳-web-recetas' },
    { find: 'blog-personal', newName: '📝-blog-personal' },
    // MARKETING
    { find: 'landing-negocio', newName: '🏪-landing-negocio' },
    { find: 'videos-marca', newName: '🎬-videos-marca' },
    // COMUNIDAD
    { find: 'chat-general', newName: '💬-chat-general' },
    { find: 'chat-proyectos', newName: '💡-chat-proyectos' },
    { find: 'sugerencias', newName: '🗳️-sugerencias' },
    // ROLES
    { find: 'seleccionar-roles', newName: '🎭-seleccionar-roles' },
    // TICKETS
    { find: 'abrir-ticket', newName: '🎫-abrir-ticket' }
  ];

  for (const ch of channels) {
    const channel = guild.channels.cache.find(c => c.name.includes(ch.find));
    if (channel) {
      await channel.setName(ch.newName);
      console.log(`✅ Canal: ${channel.name} → ${ch.newName}`);
    }
  }

  console.log('\n🎉 Todos los canales actualizados con emojis');
  process.exit(0);
});

client.login(process.env.DISCORD_TOKEN);
