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
    .setDescription('Vídeos y clips editados para redes sociales.\n\n━━━━━━━━━━━━━━━━━━━━━')
    .addFields(
      { name: '📋 **Qué incluye**', value: '> Edición de ritmo y corte\n> Transiciones y efectos\n> Texto y subtítulos\n> Música y sonido\n> Color correction\n> Optimizado para cada plataforma', inline: false },
      { name: '🎯 **Ideal para**', value: '> Creadores de contenido, influencers, empresas y cualquiera que necesite vídeos con buen ritmo y estética.', inline: false },
      { name: '💡 **Por qué es importante**', value: '> Un buen vídeo editado genera más engagement, más reproducciones y más seguidores. El contenido sin editar pasa desapercibido.\n\n━━━━━━━━━━━━━━━━━━━━━\n\n🎫 **¿Más información?** Abre un ticket con `/ticket` y te atendemos.', inline: false }
    )
    .setFooter({ text: 'Bot programado por Unai' });

  await channel.send({ embeds: [embed] });
  console.log('✅ Montajes actualizado');
  process.exit(0);
});

client.login(config.token);
