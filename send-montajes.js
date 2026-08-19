require('dotenv').config();
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const config = require('./config');

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once('ready', async () => {
  const guild = client.guilds.cache.get(config.guildId);
  if (!guild) { process.exit(1); }

  const channel = guild.channels.cache.get('1538760774783082607');
  if (!channel) { console.log('Canal no encontrado'); process.exit(1); }

  const embed = new EmbedBuilder()
    .setColor('#5865F2')
    .setTitle('🎞️ Ediciones y Montajes')
    .setDescription('Vídeos y clips editados para redes sociales.')
    .addFields(
      { name: '━━━━━━━━━━━━━━━━━━━━━', value: '**🔹 Qué es**\nServicio de edición profesional de vídeo para crear clips, reels, stories y contenido optimizado para redes.', inline: false },
      { name: '━━━━━━━━━━━━━━━━━━━━━', value: '**🔹 Qué incluye**\n• Edición de ritmo y corte\n• Transiciones y efectos\n• Texto y subtítulos\n• Música y sonido\n• Color correction\n• Optimizado para cada plataforma', inline: false },
      { name: '━━━━━━━━━━━━━━━━━━━━━', value: '**🎯 Ideal para**\nCreadores de contenido, influencers, empresas y cualquiera que necesite vídeos con buen ritmo y estética.', inline: false },
      { name: '━━━━━━━━━━━━━━━━━━━━━', value: '**💡 Por qué es importante**\nUn buen vídeo editado genera más engagement, más reproducciones y más seguidores. El contenido sin editar pasa desapercibido.' + '\n\n🎫 **¿Más información?** Abre un ticket con `/ticket` y te atendemos.', inline: false }
    )
    .setFooter({ text: 'Bot programado por Unai' });

  await channel.send({ embeds: [embed] });
  console.log('Publicado en canal de ediciones y montajes');
  process.exit(0);
});

client.login(config.token);
