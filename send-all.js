require('dotenv').config();
const { Client, GatewayIntentBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const config = require('./config');

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

const ticketMsg = '\n\n━━━━━━━━━━━━━━━━━━━━━\n\n🎫 **¿Más información?** Abre un ticket con `/ticket` y te atendemos.';

client.once('ready', async () => {
  const guild = client.guilds.cache.get(config.guildId);
  if (!guild) { process.exit(1); }

  const channels = {
    portfolio: '1538760762867191862',
    branding: '1538760764251181076',
    galeria: '1538760765463339050',
    landing: '1538760781053829280',
    precios: guild.channels.cache.find(c => c.name === 'precios'),
    videos: '1538760782286946335',
    blog: '1538760778528854117',
    recetas: '1538760776909848718',
    memoria: '1538760775991173170',
    montajes: '1538760774783082607'
  };

  // Portfolio
  const c1 = guild.channels.cache.get(channels.portfolio);
  if (c1) {
    const embed = new EmbedBuilder()
      .setColor('#5865F2')
      .setTitle('💼 Portfolio Web')
      .setDescription('Mi portfolio profesional con todos mis proyectos y trabajos.\n\n━━━━━━━━━━━━━━━━━━━━━')
      .addFields(
        { name: '📋 **Qué incluye**', value: '> Sección de proyectos destacados\n> Habilidades y tecnologías\n> Experiencia profesional\n> Sobre mí y trayectoria\n> Formulario de contacto\n> Diseño responsive y moderno', inline: false },
        { name: '🎯 **Ideal para**', value: '> Desarrolladores, diseñadores y profesionales que quieren mostrar su trabajo de forma estructurada y atractiva.', inline: false },
        { name: '💡 **Por qué es importante**', value: '> Tu portfolio es tu primera impresión digital. Un buen portfolio genera confianza y te diferencia de la competencia.' + ticketMsg, inline: false }
      )
      .setFooter({ text: 'Bot programado por Unai' });
    await c1.send({ embeds: [embed] });
    console.log('✅ Portfolio actualizado');
  }

  // Branding
  const c2 = guild.channels.cache.get(channels.branding);
  if (c2) {
    const embed = new EmbedBuilder()
      .setColor('#5865F2')
      .setTitle('🎨 Branding de Marca')
      .setDescription('Identidad visual y branding profesional para tu negocio o proyecto.\n\n━━━━━━━━━━━━━━━━━━━━━')
      .addFields(
        { name: '📋 **Qué incluye**', value: '> Diseño de logo y logotipos\n> Paleta de colores corporativa\n> Selección tipográfica\n> Manual de marca completo\n> Aplicaciones en redes sociales\n> Plantillas de diseño', inline: false },
        { name: '🎯 **Ideal para**', value: '> Emprendedores, empresas y profesionales que necesitan una identidad visual coherente y profesional.', inline: false },
        { name: '💡 **Por qué es importante**', value: '> Un buen branding genera confianza, profesionalismo y reconocimiento. Tu marca es la primera impresión que dejas.' + ticketMsg, inline: false }
      )
      .setFooter({ text: 'Bot programado por Unai' });
    await c2.send({ embeds: [embed] });
    console.log('✅ Branding actualizado');
  }

  // Galería
  const c3 = guild.channels.cache.get(channels.galeria);
  if (c3) {
    const embed = new EmbedBuilder()
      .setColor('#FEE75C')
      .setTitle('📸 Galería Fotográfica')
      .setDescription('Portfolio fotográfico profesional con mis mejores trabajos.\n\n━━━━━━━━━━━━━━━━━━━━━')
      .addFields(
        { name: '📋 **Qué incluye**', value: '> Galería organizada por categorías\n> Retratos y sesiones fotográficas\n> Paisajes y naturaleza\n> Fotografía de eventos\n> Edición profesional\n> Modo presentación y lightbox', inline: false },
        { name: '🎯 **Ideal para**', value: '> Fotógrafos, creadores de contenido y profesionales que quieren mostrar su trabajo visual de forma elegante.', inline: false },
        { name: '💡 **Por qué es importante**', value: '> Una galería bien diseñada muestra tu estilo, calidad y profesionalismo. Es tu tarjeta de presentación visual.' + ticketMsg, inline: false }
      )
      .setFooter({ text: 'Bot programado por Unai' });
    await c3.send({ embeds: [embed] });
    console.log('✅ Galería actualizada');
  }

  // Landing
  const c4 = guild.channels.cache.get(channels.landing);
  if (c4) {
    const embed = new EmbedBuilder()
      .setColor('#57F287')
      .setTitle('🏪 Landing para Negocio Local')
      .setDescription('Página de presentación para un pequeño comercio con todo lo necesario para atraer clientes.\n\n━━━━━━━━━━━━━━━━━━━━━')
      .addFields(
        { name: '📋 **Qué incluye**', value: '> Diseño moderno y profesional\n> Sección de servicios\n> Horarios y ubicación\n> Formulario de contacto\n> Enlaces a redes sociales\n> Optimizada para móvil', inline: false },
        { name: '🎯 **Ideal para**', value: '> Negocios locales como tiendas, restaurantes, peluquerías, gimnasios y cualquier comercio que quiera presencia online.', inline: false },
        { name: '💡 **Por qué es importante**', value: '> Una landing page profesional genera confianza y facilita que los clientes te encuentren y contacten.' + ticketMsg, inline: false }
      )
      .setFooter({ text: 'Bot programado por Unai' });
    await c4.send({ embeds: [embed] });
    console.log('✅ Landing actualizado');
  }

  // Precios
  if (channels.precios) {
    const embed = new EmbedBuilder()
      .setColor('#57F287')
      .setTitle('💰 Precios')
      .setDescription('Precios orientativos para empezar. Cada proyecto se presupuesta a medida.\n\n━━━━━━━━━━━━━━━━━━━━━')
      .addFields(
        { name: '🌐 **Página web**', value: '> Web personal o de negocio, clara y moderna, con formulario de contacto.\n> **desde 50 €**', inline: true },
        { name: '🎬 **Edición de vídeo**', value: '> Vídeos para redes, presentaciones y contenido con buen ritmo y estética.\n> **desde 20 €**', inline: true },
        { name: '🎨 **Diseño y branding**', value: '> Logos, paletas de color y piezas gráficas para que tu marca se vea profesional.\n> **desde 15 €**', inline: true }
      )
      .addFields(
        { name: '━━━━━━━━━━━━━━━━━━━━━', value: '**¿Necesitas otra cosa?**\nAbre un ticket con `/ticket` y te atendemos.', inline: false }
      )
      .setFooter({ text: 'Bot programado por Unai' });
    await channels.precios.send({ embeds: [embed] });
    console.log('✅ Precios actualizado');
  }

  // Vídeos de Marca
  const c5 = guild.channels.cache.get(channels.videos);
  if (c5) {
    const embed = new EmbedBuilder()
      .setColor('#5865F2')
      .setTitle('🎬 Vídeos de Marca')
      .setDescription('Animaciones y vídeos promocionales para redes sociales, presentaciones y publicidad de tu marca.\n\n━━━━━━━━━━━━━━━━━━━━━')
      .addFields(
        { name: '📋 **Qué incluye**', value: '> Animaciones y motion graphics\n> Vídeos para Instagram, TikTok, YouTube\n> Presentaciones con vídeo\n> Vídeos promocionales\n> Edición con ritmo y estética', inline: false },
        { name: '🎯 **Ideal para**', value: '> Emprendedores, negocios y marcas que quieren captar la atención con contenido visual dinámico.', inline: false },
        { name: '💡 **Por qué es importante**', value: '> El vídeo es el formato que más engagement genera. Un buen vídeo de marca marca la diferencia y te hace memorable.' + ticketMsg, inline: false }
      )
      .setFooter({ text: 'Bot programado por Unai' });
    await c5.send({ embeds: [embed] });
    console.log('✅ Videos de marca actualizado');
  }

  // Blog
  const c6 = guild.channels.cache.get(channels.blog);
  if (c6) {
    const embed = new EmbedBuilder()
      .setColor('#5865F2')
      .setTitle('📝 Blog Personal')
      .setDescription('Blog con artículos y publicaciones sobre lo que quieras.\n\n━━━━━━━━━━━━━━━━━━━━━')
      .addFields(
        { name: '📋 **Qué incluye**', value: '> Diseño limpio y profesional\n> Categorías y etiquetas\n> Sistema de comentarios\n> Optimizado para SEO\n> Compartir en redes sociales\n> Panel de administración', inline: false },
        { name: '🎯 **Ideal para**', value: '> Escritores, profesionales, empresas y cualquier persona que quiera compartir conocimiento o noticias.', inline: false },
        { name: '💡 **Por qué es importante**', value: '> Un blog posiciona tu marca, genera tráfico a tu web y demuestra experiencia en tu sector.' + ticketMsg, inline: false }
      )
      .setFooter({ text: 'Bot programado por Unai' });
    await c6.send({ embeds: [embed] });
    console.log('✅ Blog actualizado');
  }

  // Recetas
  const c7 = guild.channels.cache.get(channels.recetas);
  if (c7) {
    const embed = new EmbedBuilder()
      .setColor('#5865F2')
      .setTitle('🍳 Web de Recetas')
      .setDescription('Web con recetas organizadas, paso a paso y con fotos.\n\n━━━━━━━━━━━━━━━━━━━━━')
      .addFields(
        { name: '📋 **Qué incluye**', value: '> Recetas con ingredientes y pasos\n> Fotos de cada receta\n> Filtros por categoría\n> Tiempo de preparación\n> Porciones y dificultad\n> Compartir en redes sociales', inline: false },
        { name: '🎯 **Ideal para**', value: '> Cocineros, foodies, chefs y cualquier persona que quiera compartir sus recetas con el mundo.', inline: false },
        { name: '💡 **Por qué es importante**', value: '> Una web de recetas bien diseñada genera comunidad, demuestra tu habilidad y puede incluso monetizarse.' + ticketMsg, inline: false }
      )
      .setFooter({ text: 'Bot programado por Unai' });
    await c7.send({ embeds: [embed] });
    console.log('✅ Recetas actualizado');
  }

  // Memoria
  const c8 = guild.channels.cache.get(channels.memoria);
  if (c8) {
    const embed = new EmbedBuilder()
      .setColor('#5865F2')
      .setTitle('🧠 Juego de Memoria')
      .setDescription('Juego interactivo de memoria para entrenar el cerebro.\n\n━━━━━━━━━━━━━━━━━━━━━')
      .addFields(
        { name: '📋 **Qué incluye**', value: '> Tablero con cartas boca abajo\n> Voltear dos cartas por turno\n> Si coinciden, desaparecen\n> Cronómetro para medir tiempo\n> Contador de intentos\n> Diferentes niveles de dificultad', inline: false },
        { name: '🎯 **Ideal para**', value: '> Niños, adultos y mayores que quieran entrenar su memoria de forma divertida.', inline: false },
        { name: '💡 **Por qué es importante**', value: '> Los juegos de memoria mejoran la concentración, la atención y la capacidad de recordar. ¡Además son adictivos!' + ticketMsg, inline: false }
      )
      .setFooter({ text: 'Bot programado por Unai' });
    await c8.send({ embeds: [embed] });
    console.log('✅ Memoria actualizado');
  }

  // Montajes
  const c9 = guild.channels.cache.get(channels.montajes);
  if (c9) {
    const embed = new EmbedBuilder()
      .setColor('#5865F2')
      .setTitle('🎞️ Ediciones y Montajes')
      .setDescription('Vídeos y clips editados para redes sociales.\n\n━━━━━━━━━━━━━━━━━━━━━')
      .addFields(
        { name: '📋 **Qué incluye**', value: '> Edición de ritmo y corte\n> Transiciones y efectos\n> Texto y subtítulos\n> Música y sonido\n> Color correction\n> Optimizado para cada plataforma', inline: false },
        { name: '🎯 **Ideal para**', value: '> Creadores de contenido, influencers, empresas y cualquiera que necesite vídeos con buen ritmo y estética.', inline: false },
        { name: '💡 **Por qué es importante**', value: '> Un buen vídeo editado genera más engagement, más reproducciones y más seguidores. El contenido sin editar pasa desapercibido.' + ticketMsg, inline: false }
      )
      .setFooter({ text: 'Bot programado por Unai' });
    await c9.send({ embeds: [embed] });
    console.log('✅ Montajes actualizado');
  }

  console.log('\n🎉 Todos los canales actualizados con el nuevo diseño');
  process.exit(0);
});

client.login(config.token);
