require('dotenv').config();
const { Client, GatewayIntentBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder, ChannelType, PermissionFlagsBits } = require('discord.js');
const config = require('./config');

const ticketTypes = [
  { id: 'soporte', name: 'Soporte Tecnico', emoji: '🛠️', description: 'Problemas tecnicos con mis servicios', color: '#FF4500' },
  { id: 'ventas', name: 'Ventas', emoji: '💰', description: 'Informacion sobre precios y presupuestos', color: '#FFD700' },
  { id: 'colaboracion', name: 'Colaboracion', emoji: '🤝', description: 'Propuestas de trabajo conjunto', color: '#32CD32' },
  { id: 'feedback', name: 'Feedback', emoji: '📝', description: 'Sugerencias y opiniones sobre mis proyectos', color: '#1E90FF' },
  { id: 'bug', name: 'Reportar Bug', emoji: '🐛', description: 'Reportar errores en mis aplicaciones', color: '#FF69B4' },
  { id: 'otro', name: 'Otro', emoji: '❓', description: 'Cualquier otra consulta', color: '#9370DB' }
];

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.once('ready', () => {
  console.log('Bot listo para tickets');
});

client.on('interactionCreate', async interaction => {
  if (interaction.isStringSelectMenu() && interaction.customId === 'ticket_select') {
    const ticketType = ticketTypes.find(t => t.id === interaction.values[0]);
    if (!ticketType) return;

    const guild = interaction.guild;
    const member = interaction.member;

    const existingTicket = guild.channels.cache.find(c => c.name === 'ticket-' + member.user.username.toLowerCase());
    if (existingTicket) {
      return interaction.reply({ content: 'Ya tienes un ticket abierto: ' + existingTicket, ephemeral: true });
    }

    await interaction.deferReply({ ephemeral: true });

    const ticketsCategory = guild.channels.cache.find(c => c.type === ChannelType.GuildCategory && c.name === 'TICKETS');

    const ticketChannel = await guild.channels.create({
      name: 'ticket-' + member.user.username.toLowerCase(),
      type: ChannelType.GuildText,
      parent: ticketsCategory ? ticketsCategory.id : undefined,
      permissionOverwrites: [
        { id: guild.id, deny: [PermissionFlagsBits.ViewChannel] },
        { id: member.id, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages] }
      ]
    });

    const ownerRole = guild.roles.cache.find(r => r.name.includes('Owner'));
    const adminRole = guild.roles.cache.find(r => r.name.includes('Admin'));
    const modRole = guild.roles.cache.find(r => r.name.includes('Moderador'));

    if (ownerRole) await ticketChannel.permissionOverwrites.edit(ownerRole, { ViewChannel: true, SendMessages: true });
    if (adminRole) await ticketChannel.permissionOverwrites.edit(adminRole, { ViewChannel: true, SendMessages: true });
    if (modRole) await ticketChannel.permissionOverwrites.edit(modRole, { ViewChannel: true, SendMessages: true });

    const ticketEmbed = new EmbedBuilder()
      .setColor(ticketType.color)
      .setTitle(ticketType.emoji + ' Ticket: ' + ticketType.name)
      .setDescription('Hola ' + member + ', bienvenido a tu ticket.\n\n**Tipo:** ' + ticketType.name + '\n**Motivo:** ' + ticketType.description + '\n\nUn miembro del equipo te atendera pronto.\n\nPara cerrar el ticket, haz clic en el boton de abajo.')
      .setThumbnail(member.user.displayAvatarURL())
      .setTimestamp();

    const closeButton = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId('close_ticket').setLabel('Cerrar Ticket').setStyle(ButtonStyle.Danger).setEmoji('🔒')
    );

    await ticketChannel.send({ embeds: [ticketEmbed], components: [closeButton] });
    await ticketChannel.send({ content: member.toString() });
    await interaction.editReply({ content: 'Ticket creado: ' + ticketChannel });
  }

  if (interaction.isButton() && interaction.customId === 'close_ticket') {
    const channel = interaction.channel;
    if (!channel.name.startsWith('ticket-')) return;

    const embed = new EmbedBuilder().setColor('#FF0000').setTitle('🔒 Ticket Cerrado').setDescription('Ticket cerrado por ' + interaction.user).setTimestamp();
    await channel.send({ embeds: [embed] });
    await interaction.reply({ content: '🔒 Cerrando ticket en 5 segundos...' });
    setTimeout(async () => { try { await channel.delete('Ticket cerrado'); } catch(e) {} }, 5000);
  }
});

client.login(config.token);
