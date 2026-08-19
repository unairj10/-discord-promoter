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
    .setDescription('Blog con artículos y publicaciones sobre lo que quieras.\n\n━━━━━━━━━━━━━━━━━━━━━')
    .addFields(
      { name: '📋 **Qué incluye**', value: '> Diseño limpio y profesional\n> Categorías y etiquetas\n> Sistema de comentarios\n> Optimizado para SEO\n> Compartir en redes sociales\n> Panel de administración', inline: false },
      { name: '🎯 **Ideal para**', value: '> Escritores, profesionales, empresas y cualquier persona que quiera compartir conocimiento o noticias.', inline: false },
      { name: '💡 **Por qué es importante**', value: '> Un blog posiciona tu marca, genera tráfico a tu web y demuestra experiencia en tu sector.\n\n━━━━━━━━━━━━━━━━━━━━━\n\n🎫 **¿Más información?** Abre un ticket con `/ticket` y te atendemos.', inline: false }
    )
    .setFooter({ text: 'Bot programado por Unai' });

  await channel.send({ embeds: [embed] });
  console.log('✅ Blog actualizado');
  process.exit(0);
});

client.login(config.token);
