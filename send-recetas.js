require('dotenv').config();
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const config = require('./config');

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once('ready', async () => {
  const guild = client.guilds.cache.get(config.guildId);
  if (!guild) { process.exit(1); }

  const channel = guild.channels.cache.get('1538760776909848718');
  if (!channel) { console.log('Canal no encontrado'); process.exit(1); }

  const embed = new EmbedBuilder()
    .setColor('#5865F2')
    .setTitle('🍳 Web de Recetas')
    .setDescription('Web con recetas organizadas, paso a paso y con fotos.')
    .addFields(
      { name: '━━━━━━━━━━━━━━━━━━━━━', value: '**🔹 Qué es**\nUna web donde publicar y compartir recetas de cocina de forma visual y sencilla.', inline: false },
      { name: '━━━━━━━━━━━━━━━━━━━━━', value: '**🔹 Qué incluye**\n• Recetas con ingredientes y pasos\n• Fotos de cada receta\n• Filtros por categoría\n• Tiempo de preparación\n• Porciones y dificultad\n• Compartir en redes sociales', inline: false },
      { name: '━━━━━━━━━━━━━━━━━━━━━', value: '**🎯 Ideal para**\nCocineros, foodies, chefs y cualquier persona que quiera compartir sus recetas con el mundo.', inline: false },
      { name: '━━━━━━━━━━━━━━━━━━━━━', value: '**💡 Por qué es importante**\nUna web de recetas bien diseñada genera comunidad, demuestra tu habilidad y puede incluso monetizarse.' + '\n\n🎫 **¿Más información?** Abre un ticket con `/ticket` y te atendemos.', inline: false }
    )
    .setFooter({ text: 'Bot programado por Unai' });

  await channel.send({ embeds: [embed] });
  console.log('Publicado en canal de web de recetas');
  process.exit(0);
});

client.login(config.token);
