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
    .setDescription('Animaciones y vídeos promocionales para redes sociales, presentaciones y publicidad de tu marca.\n\n━━━━━━━━━━━━━━━━━━━━━')
    .addFields(
      { name: '📋 **Qué incluye**', value: '> Animaciones y motion graphics\n> Vídeos para Instagram, TikTok, YouTube\n> Presentaciones con vídeo\n> Vídeos promocionales\n> Edición con ritmo y estética', inline: false },
      { name: '🎯 **Ideal para**', value: '> Emprendedores, negocios y marcas que quieren captar la atención con contenido visual dinámico.', inline: false },
      { name: '💡 **Por qué es importante**', value: '> El vídeo es el formato que más engagement genera. Un buen vídeo de marca marca la diferencia y te hace memorable.\n\n━━━━━━━━━━━━━━━━━━━━━\n\n🎫 **¿Más información?** Abre un ticket con `/ticket` y te atendemos.', inline: false }
    )
    .setFooter({ text: 'Bot programado por Unai' });

  await channel.send({ embeds: [embed] });
  console.log('✅ Videos de marca actualizado');
  process.exit(0);
});

client.login(config.token);
