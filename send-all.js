require('dotenv').config();
const { Client, GatewayIntentBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const config = require('./config');

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

const ticketMsg = '\n\n🎫 **¿Más información?** Abre un ticket con `/ticket` y te atendemos.';

client.once('ready', async () => {
  const guild = client.guilds.cache.get(config.guildId);
  if (!guild) { process.exit(1); }

  const channels = {
    portfolio: '1538760762867191862',
    branding: '1538760764251181076',
    galeria: '1538760765463339050',
    landing: '1538760781053829280'
  };

  const preciosChannel = guild.channels.cache.find(c => c.name === 'precios');

  // Portfolio
  const c1 = guild.channels.cache.get(channels.portfolio);
  if (c1) {
    const embed = new EmbedBuilder()
      .setColor('#5865F2')
      .setTitle('💼 Portfolio Web')
      .setDescription('Mi portfolio profesional con todos mis proyectos y trabajos.')
      .addFields(
        { name: '📋 Qué incluye', value: '• Sección de proyectos destacados\n• Habilidades y tecnologías\n• Experiencia profesional\n• Sobre mí y trayectoria\n• Formulario de contacto\n• Diseño responsive y moderno', inline: false },
        { name: '🎯 Ideal para', value: 'Desarrolladores, diseñadores y profesionales que quieren mostrar su trabajo de forma estructurada y atractiva.', inline: false },
        { name: '💡 Por qué es importante', value: 'Tu portfolio es tu primera impresión digital. Un buen portfolio genera confianza y te diferencia de la competencia.' + ticketMsg, inline: false }
      )
      .setFooter({ text: 'Bot programado por Unai' })
      .setFooter({ text: 'Portfolio Web - Proyectos' });
    await c1.send({ embeds: [embed] });
    console.log('✅ Portfolio actualizado');
  }

  // Branding
  const c2 = guild.channels.cache.get(channels.branding);
  if (c2) {
    const embed = new EmbedBuilder()
      .setColor('#5865F2')
      .setTitle('🎨 Branding de Marca')
      .setDescription('Identidad visual y branding profesional para tu negocio o proyecto.')
      .addFields(
        { name: '📋 Qué incluye', value: '• Diseño de logo y logotipos\n• Paleta de colores corporativa\n• Selección tipográfica\n• Manual de marca completo\n• Aplicaciones en redes sociales\n• Plantillas de diseño', inline: false },
        { name: '🎯 Ideal para', value: 'Emprendedores, empresas y profesionales que necesitan una identidad visual coherente y profesional.', inline: false },
        { name: '💡 Por qué es importante', value: 'Un buen branding genera confianza, profesionalismo y reconocimiento. Tu marca es la primera impresión que dejas.' + ticketMsg, inline: false }
      )
      .setFooter({ text: 'Bot programado por Unai' })
      .setFooter({ text: 'Branding de Marca - Portfolio Web' });
    await c2.send({ embeds: [embed] });
    console.log('✅ Branding actualizado');
  }

  // Galería
  const c3 = guild.channels.cache.get(channels.galeria);
  if (c3) {
    const embed = new EmbedBuilder()
      .setColor('#FEE75C')
      .setTitle('📸 Galería Fotográfica')
      .setDescription('Portfolio fotográfico profesional con mis mejores trabajos.')
      .addFields(
        { name: '📋 Qué incluye', value: '• Galería organizada por categorías\n• Retratos y sesiones fotográficas\n• Paisajes y naturaleza\n• Fotografía de eventos\n• Edición profesional\n• Modo presentación y lightbox', inline: false },
        { name: '🎯 Ideal para', value: 'Fotógrafos, creadores de contenido y profesionales que quieren mostrar su trabajo visual de forma elegante.', inline: false },
        { name: '💡 Por qué es importante', value: 'Una galería bien diseñada muestra tu estilo, calidad y profesionalismo. Es tu tarjeta de presentación visual.' + ticketMsg, inline: false }
      )
      .setFooter({ text: 'Bot programado por Unai' })
      .setFooter({ text: 'Galería Fotográfica - Portfolio Web' });
    await c3.send({ embeds: [embed] });
    console.log('✅ Galería actualizada');
  }

  // Landing
  const c4 = guild.channels.cache.get(channels.landing);
  if (c4) {
    const embed = new EmbedBuilder()
      .setColor('#57F287')
      .setTitle('🏪 Landing para Negocio Local')
      .setDescription('Página de presentación para un pequeño comercio con todo lo necesario para atraer clientes.')
      .addFields(
        { name: '📋 Qué incluye', value: '• Diseño moderno y profesional\n• Sección de servicios\n• Horarios y ubicación\n• Formulario de contacto\n• Enlaces a redes sociales\n• Optimizada para móvil', inline: false },
        { name: '🎯 Ideal para', value: 'Negocios locales como tiendas, restaurantes, peluquerías, gimnasios y cualquier comercio que quiera presencia online.', inline: false },
        { name: '💡 Por qué es importante', value: 'Una landing page profesional genera confianza y facilita que los clientes te encuentren y contacten.' + ticketMsg, inline: false }
      )
      .setFooter({ text: 'Bot programado por Unai' })
      .setFooter({ text: 'Landing para Negocio Local' });
    await c4.send({ embeds: [embed] });
    console.log('✅ Landing actualizado');
  }

  // Precios
  if (preciosChannel) {
    const embed = new EmbedBuilder()
      .setColor('#57F287')
      .setTitle('💰 Precios')
      .setDescription('Precios orientativos para empezar. Cada proyecto se presupuesta a medida.')
      .addFields(
        { name: 'Página web', value: 'Web personal o de negocio, clara y moderna, con formulario de contacto.\n**desde 50 €**', inline: true },
        { name: 'Edición de vídeo', value: 'Vídeos para redes, presentaciones y contenido con buen ritmo y estética.\n**desde 20 €**', inline: true },
        { name: 'Diseño y branding', value: 'Logos, paletas de color y piezas gráficas para que tu marca se vea profesional.\n**desde 15 €**', inline: true }
      )
      .addFields(
        { name: '¿Necesitas otra cosa?', value: 'Abre un ticket con `/ticket` y te atendemos.' + ticketMsg, inline: false }
      )
      .setFooter({ text: 'Bot programado por Unai' })
      .setFooter({ text: 'Todos los precios son orientativos' });
    await preciosChannel.send({ embeds: [embed] });
    console.log('✅ Precios actualizado');
  }

  console.log('\nTodos los canales actualizados con mensaje de ticket');
  process.exit(0);
});

client.login(config.token);
