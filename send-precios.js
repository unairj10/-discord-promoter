require('dotenv').config();
const { Client, GatewayIntentBits, EmbedBuilder, ChannelType, PermissionFlagsBits } = require('discord.js');
const config = require('./config');

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once('ready', async () => {
  const guild = client.guilds.cache.get(config.guildId);
  if (!guild) { process.exit(1); }

  // Create channel
  let channel = guild.channels.cache.find(c => c.name === 'precios');
  if (!channel) {
    channel = await guild.channels.create({
      name: 'precios',
      type: ChannelType.GuildText,
      parent: guild.channels.cache.find(c => c.type === ChannelType.GuildCategory && c.name === 'MARKETING')?.id,
      permissionOverwrites: [
        { id: guild.id, allow: [PermissionFlagsBits.ViewChannel], deny: [PermissionFlagsBits.SendMessages] }
      ]
    });
  }

  const embed = new EmbedBuilder()
    .setColor('#57F287')
    .setTitle('Precios')
    .setDescription('Precios orientativos para empezar. Cada proyecto se presupuesta a medida.')
    .addFields(
      { name: 'Pagina web', value: 'Web personal o de negocio, clara y moderna, con formulario de contacto.\n**desde 50 €**', inline: true },
      { name: 'Edicion de video', value: 'Videos para redes, presentaciones y contenido con buen ritmo y estetica.\n**desde 20 €**', inline: true },
      { name: 'Diseno y branding', value: 'Logos, paletas de color y piezas graficas para que tu marca se vea profesional.\n**desde 15 €**', inline: true }
    )
    .addFields(
      { name: '¿Necesitas otra cosa?', value: 'Escribeme y lo hablamos.', inline: false }
    )
    .setTimestamp()
    .setFooter({ text: 'Todos los precios son orientativos' });

  await channel.send({ embeds: [embed] });
  console.log('Canal de precios creado y publicado');
  process.exit(0);
});

client.login(config.token);
