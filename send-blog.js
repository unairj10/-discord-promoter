require('dotenv').config();
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const config = require('./config');

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once('ready', async () => {
  const guild = client.guilds.cache.get(config.guildId);
  if (!guild) { process.exit(1); }

  const channel = guild.channels.cache.get('1538760778528854117');
  if (!channel) { console.log('Canal no encontrado'); process.exit(1); }

  const embed = new EmbedBuilder()
    .setColor('#5865F2')
    .setTitle('📝 Blog Personal')
    .setDescription('Blog con artículos y publicaciones sobre lo que quieras.')
    .addFields(
      { name: '━━━━━━━━━━━━━━━━━━━━━', value: '**🔹 Qué es**\nUn blog online donde publicas artículos, tutoriales, opiniones o noticias sobre tu área de conocimiento.', inline: false },
      { name: '━━━━━━━━━━━━━━━━━━━━━', value: '**🔹 Qué incluye**\n• Diseño limpio y profesional\n• Categorías y etiquetas\n• Sistema de comentarios\n• Optimizado para SEO\n• Compartir en redes sociales\n• Panel de administración', inline: false },
      { name: '━━━━━━━━━━━━━━━━━━━━━', value: '**🎯 Ideal para**\nEscritores, profesionales, empresas y cualquier persona que quiera compartir conocimiento o noticias.', inline: false },
      { name: '━━━━━━━━━━━━━━━━━━━━━', value: '**💡 Por qué es importante**\nUn blog posiciona tu marca, genera tráfico a tu web y demuestra experiencia en tu sector.' + '\n\n🎫 **¿Más información?** Abre un ticket con `/ticket` y te atendemos.', inline: false }
    )
    .setFooter({ text: 'Bot programado por Unai' });

  await channel.send({ embeds: [embed] });
  console.log('Publicado en canal de blog personal');
  process.exit(0);
});

client.login(config.token);
