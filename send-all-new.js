require('dotenv').config({ path: '.env.new' });
const { Client, GatewayIntentBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits } = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once('ready', async () => {
  const guild = client.guilds.cache.get(process.env.GUILD_ID);
  if (!guild) { process.exit(1); }

  const ticketMsg = '\n\n━━━━━━━━━━━━━━━━━━━━━\n\n🎫 **¿Más información?** Abre un ticket con `/ticket` y te atendemos.';

  const channels = {
    portfolio: guild.channels.cache.find(c => c.name.includes('portfolio-web')),
    branding: guild.channels.cache.find(c => c.name.includes('branding')),
    galeria: guild.channels.cache.find(c => c.name.includes('galeria')),
    landing: guild.channels.cache.find(c => c.name.includes('landing')),
    precios: guild.channels.cache.find(c => c.name.includes('precios')),
    videos: guild.channels.cache.find(c => c.name.includes('videos')),
    blog: guild.channels.cache.find(c => c.name.includes('blog')),
    recetas: guild.channels.cache.find(c => c.name.includes('recetas')),
    memoria: guild.channels.cache.find(c => c.name.includes('memoria')),
    montajes: guild.channels.cache.find(c => c.name.includes('ediciones')),
    tareas: guild.channels.cache.find(c => c.name.includes('app-tareas')),
    calculadora: guild.channels.cache.find(c => c.name.includes('calculadora')),
    comunidad: guild.channels.cache.find(c => c.name.includes('asistente')),
    editor: guild.channels.cache.find(c => c.name.includes('editor')),
    anuncios: guild.channels.cache.find(c => c.name === '📢-anuncios' || c.name.includes('anuncios')),
    sugerencias: guild.channels.cache.find(c => c.name.includes('sugerencias')),
    chat: guild.channels.cache.find(c => c.name.includes('chat-general'))
  };

  // Portfolio
  if (channels.portfolio) {
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
    await channels.portfolio.send({ embeds: [embed] });
    console.log('✅ Portfolio');
  }

  // Branding
  if (channels.branding) {
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
    await channels.branding.send({ embeds: [embed] });
    console.log('✅ Branding');
  }

  // Galería
  if (channels.galeria) {
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
    await channels.galeria.send({ embeds: [embed] });
    console.log('✅ Galería');
  }

  // Landing
  if (channels.landing) {
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
    await channels.landing.send({ embeds: [embed] });
    console.log('✅ Landing');
  }

  // Vídeos de Marca
  if (channels.videos) {
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
    await channels.videos.send({ embeds: [embed] });
    console.log('✅ Videos de marca');
  }

  // Blog
  if (channels.blog) {
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
    await channels.blog.send({ embeds: [embed] });
    console.log('✅ Blog');
  }

  // Recetas
  if (channels.recetas) {
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
    await channels.recetas.send({ embeds: [embed] });
    console.log('✅ Recetas');
  }

  // Memoria
  if (channels.memoria) {
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
    await channels.memoria.send({ embeds: [embed] });
    console.log('✅ Memoria');
  }

  // Montajes
  if (channels.montajes) {
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
    await channels.montajes.send({ embeds: [embed] });
    console.log('✅ Montajes');
  }

  // App de Tareas
  if (channels.tareas) {
    const embed = new EmbedBuilder()
      .setColor('#5865F2')
      .setTitle('📱 App de Tareas')
      .setDescription('Aplicación para organizar tus tareas del día a día.\n\n━━━━━━━━━━━━━━━━━━━━━')
      .addFields(
        { name: '📋 **Qué incluye**', value: '> Lista de tareas\n> Marcar como completadas\n> Prioridades\n> Fechas límite\n> Categorías\n> Sincronización entre dispositivos', inline: false },
        { name: '🎯 **Ideal para**', value: '> Estudiantes, profesionales y cualquiera que quiera organizar mejor su tiempo.', inline: false },
        { name: '💡 **Por qué es importante**', value: '> Organizar tus tareas aumenta tu productividad y reduce el estrás. Una buena app te ayuda a no olvidar nada.' + ticketMsg, inline: false }
      )
      .setFooter({ text: 'Bot programado por Unai' });
    await channels.tareas.send({ embeds: [embed] });
    console.log('✅ App de Tareas');
  }

  // Calculadora de Presupuestos
  if (channels.calculadora) {
    const embed = new EmbedBuilder()
      .setColor('#5865F2')
      .setTitle('📊 Calculadora de Presupuestos')
      .setDescription('Herramienta para calcular presupuestos de proyectos.\n\n━━━━━━━━━━━━━━━━━━━━━')
      .addFields(
        { name: '📋 **Qué incluye**', value: '> Calculadora de costes\n> Estimación de tiempos\n> Desglose por servicios\n> Presupuesto personalizado\n> Exportar a PDF\n> Historial de presupuestos', inline: false },
        { name: '🎯 **Ideal para**', value: '> Freelancers, empresas y profesionales que necesitan presupuestar sus proyectos de forma rápida y precisa.', inline: false },
        { name: '💡 **Por qué es importante**', value: '> Un presupuesto bien calculado evita sorpresas y genera confianza con el cliente.' + ticketMsg, inline: false }
      )
      .setFooter({ text: 'Bot programado por Unai' });
    await channels.calculadora.send({ embeds: [embed] });
    console.log('✅ Calculadora');
  }

  // Asistente de Comunidad
  if (channels.comunidad) {
    const embed = new EmbedBuilder()
      .setColor('#57F287')
      .setTitle('👥 Asistente de Comunidad')
      .setDescription('Herramienta para gestionar comunidades online.\n\n━━━━━━━━━━━━━━━━━━━━━')
      .addFields(
        { name: '📋 **Qué incluye**', value: '> Gestión de miembros\n> Automatización de tareas\n> Bienvenidas automáticas\n> Sistema de roles\n> Estadísticas de comunidad\n> Moderación inteligente', inline: false },
        { name: '🎯 **Ideal para**', value: '> Comunidades de Discord, Telegram y otras plataformas que necesiten gestionar sus miembros de forma eficiente.', inline: false },
        { name: '💡 **Por qué es importante**', value: '> Una bien gestionada genera engagement y retención. El asistente te ahorra tiempo y mejora la experiencia.' + ticketMsg, inline: false }
      )
      .setFooter({ text: 'Bot programado por Unai' });
    await channels.comunidad.send({ embeds: [embed] });
    console.log('✅ Asistente de Comunidad');
  }

  // Editor de Imágenes
  if (channels.editor) {
    const embed = new EmbedBuilder()
      .setColor('#EB459E')
      .setTitle('🖼️ Editor de Imágenes')
      .setDescription('Herramienta para editar y crear imágenes online.\n\n━━━━━━━━━━━━━━━━━━━━━')
      .addFields(
        { name: '📋 **Qué incluye**', value: '> Filtros y efectos\n> Recorte y redimensionado\n> Texto y capas\n> Formas y dibujo\n> Exportar en múltiples formatos\n> Plantillas prediseñadas', inline: false },
        { name: '🎯 **Ideal para**', value: '> Creadores de contenido, diseñadores y cualquiera que necesite editar imágenes sin usar software complejo.', inline: false },
        { name: '💡 **Por qué es importante**', value: '> Las imágenes son clave en marketing digital. Un buen editor te permite crear contenido visual atractivo sin complicaciones.' + ticketMsg, inline: false }
      )
      .setFooter({ text: 'Bot programado por Unai' });
    await channels.editor.send({ embeds: [embed] });
    console.log('✅ Editor de Imágenes');
  }

  console.log('\n🎉 Todos los canales del nuevo servidor actualizados');
  process.exit(0);
});

client.login(process.env.DISCORD_TOKEN);
