require('dotenv').config();
const { Client, GatewayIntentBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const config = require('./config');

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once('ready', async () => {
  const guild = client.guilds.cache.get(config.guildId);
  if (!guild) { process.exit(1); }

  const channel = guild.channels.cache.get('1538760762867191862');
  if (!channel) { console.log('Canal no encontrado'); process.exit(1); }

  const embed = new EmbedBuilder()
    .setColor('#5865F2')
    .setTitle('💼 Portfolio Web')
    .setDescription('Mi portfolio profesional con todos mis proyectos y trabajos.\n\n━━━━━━━━━━━━━━━━━━━━━')
    .addFields(
      { name: '📋 **Qué incluye**', value: '> Sección de proyectos destacados\n> Habilidades y tecnologías\n> Experiencia profesional\n> Sobre mí y trayectoria\n> Formulario de contacto\n> Diseño responsive y moderno', inline: false },
      { name: '🎯 **Ideal para**', value: '> Desarrolladores, diseñadores y profesionales que quieren mostrar su trabajo de forma estructurada y atractiva.', inline: false },
      { name: '💡 **Por qué es importante**', value: '> Tu portfolio es tu primera impresión digital. Un buen portfolio genera confianza y te diferencia de la competencia.\n\n━━━━━━━━━━━━━━━━━━━━━\n\n🎫 **¿Más información?** Abre un ticket con `/ticket` y te atendemos.', inline: false }
    )
    .setFooter({ text: 'Bot programado por Unai' });

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder().setLabel('Ver Portfolio').setStyle(ButtonStyle.Link).setURL('https://tu-portfolio.com').setEmoji('🌐')
  );

  await channel.send({ embeds: [embed], components: [row] });
  console.log('✅ Portfolio actualizado');
  process.exit(0);
});

client.login(config.token);
