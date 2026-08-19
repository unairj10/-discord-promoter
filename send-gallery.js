require('dotenv').config();
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const config = require('./config');

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once('ready', async () => {
  const guild = client.guilds.cache.get(config.guildId);
  if (!guild) { process.exit(1); }

  const channel = guild.channels.cache.get('1538760765463339050');
  if (!channel) { console.log('Canal no encontrado'); process.exit(1); }

  const embed = new EmbedBuilder()
    .setColor('#FEE75C')
    .setTitle('📸 Galería Fotográfica')
    .setDescription('Portfolio fotográfico profesional con mis mejores trabajos.')
    .addFields(
      { name: '📋 Qué incluye', value: '• Galería organizada por categorías\n• Retratos y sesiones fotográficas\n• Paisajes y naturaleza\n• Fotografía de eventos\n• Edición profesional\n• Modo presentación y lightbox', inline: false },
      { name: '🎯 Ideal para', value: 'Fotógrafos, creadores de contenido y profesionales que quieren展示 su trabajo visual de forma elegante.', inline: false },
      { name: '💡 Por qué es importante', value: 'Una galería bien diseñada muestra tu estilo, calidad y profesionalismo. Es tu tarjeta de presentación visual.', inline: false }
    )
    .setTimestamp()
    .setFooter({ text: 'Galería Fotográfica - Portfolio Web' });

  await channel.send({ embeds: [embed] });
  console.log('Publicado en canal de galería');
  process.exit(0);
});

client.login(config.token);
