require('dotenv').config();
const { Client, GatewayIntentBits, EmbedBuilder, ChannelType, PermissionFlagsBits } = require('discord.js');
const config = require('./config');

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once('ready', async () => {
  const guild = client.guilds.cache.get(config.guildId);
  if (!guild) { process.exit(1); }

  const channel = guild.channels.cache.find(c => c.name === 'precios');
  if (!channel) { console.log('Canal no encontrado'); process.exit(1); }

  const embed = new EmbedBuilder()
    .setColor('#57F287')
    .setTitle('💰 Precios')
    .setDescription('Precios orientativos para empezar. Cada proyecto se presupuesta a medida.\n\n━━━━━━━━━━━━━━━━━━━━━')
    .addFields(
      { name: '🌐 **Página web**', value: '> Web personal o de negocio, clara y moderna, con formulario de contacto.\n> **desde 50 €**', inline: true },
      { name: '🎬 **Edición de vídeo**', value: '> Vídeos para redes, presentaciones y contenido con buen ritmo y estética.\n> **desde 20 €**', inline: true },
      { name: '🎨 **Diseño y branding**', value: '> Logos, paletas de color y piezas gráficas para que tu marca se vea profesional.\n> **desde 15 €**', inline: true }
    )
    .addFields(
      { name: '━━━━━━━━━━━━━━━━━━━━━', value: '**¿Necesitas otra cosa?**\nAbre un ticket con `/ticket` y te atendemos.', inline: false }
    )
    .setFooter({ text: 'Bot programado por Unai' });

  await channel.send({ embeds: [embed] });
  console.log('✅ Precios actualizado');
  process.exit(0);
});

client.login(config.token);
