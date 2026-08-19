require('dotenv').config();
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const config = require('./config');

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once('ready', async () => {
  const guild = client.guilds.cache.get(config.guildId);
  if (!guild) { process.exit(1); }

  const channel = guild.channels.cache.get('1538760782286946335');
  if (!channel) { console.log('Canal no encontrado'); process.exit(1); }

  const embed = new EmbedBuilder()
    .setColor('#5865F2')
    .setTitle('🎬 Vídeos de Marca')
    .setDescription('Animaciones y vídeos promocionales para redes sociales, presentaciones y publicidad de tu marca.')
    .addFields(
      { name: '━━━━━━━━━━━━━━━━━━━━━', value: '**🔹 Qué es**\nVídeos animados o promocionales creados para destacar tu marca en redes sociales, presentaciones y publicidad.', inline: false },
      { name: '━━━━━━━━━━━━━━━━━━━━━', value: '**🔹 Qué incluye**\n• Animaciones y motion graphics\n• Vídeos para Instagram, TikTok, YouTube\n• Presentaciones con vídeo\n• Vídeos promocionales\n• Edición con ritmo y estética', inline: false },
      { name: '━━━━━━━━━━━━━━━━━━━━━', value: '**🎯 Ideal para**\nEmprendedores, negocios y marcas que quieren captar la atención con contenido visual dinámico.', inline: false },
      { name: '━━━━━━━━━━━━━━━━━━━━━', value: '**💡 Por qué es importante**\nEl vídeo es el formato que más engagement genera. Un buen vídeo de marca marca la diferencia y te hace memorable.' + '\n\n🎫 **¿Más información?** Abre un ticket con `/ticket` y te atendemos.', inline: false }
    )
    .setFooter({ text: 'Bot programado por Unai' });

  await channel.send({ embeds: [embed] });
  console.log('Publicado en canal de vídeos de marca');
  process.exit(0);
});

client.login(config.token);
