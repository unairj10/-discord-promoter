require('dotenv').config();
const { Client, GatewayIntentBits, ChannelType, PermissionFlagsBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder } = require('discord.js');
const config = require('./config');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.MessageContent]
});

const ticketTypes = [
  { id: 'soporte', name: '🛠️ Soporte Técnico', emoji: '🛠️', description: 'Problemas técnicos con mis servicios', color: '#FF4500' },
  { id: 'ventas', name: '💰 Ventas', emoji: '💰', description: 'Información sobre precios y presupuestos', color: '#FFD700' },
  { id: 'colaboracion', name: '🤝 Colaboración', emoji: '🤝', description: 'Propuestas de trabajo conjunto', color: '#32CD32' },
  { id: 'feedback', name: '📝 Feedback', emoji: '📝', description: 'Sugerencias y opiniones sobre mis proyectos', color: '#1E90FF' },
  { id: 'bug', name: '🐛 Reportar Bug', emoji: '🐛', description: 'Reportar errores en mis aplicaciones', color: '#FF69B4' },
  { id: 'otro', name: '❓ Otro', emoji: '❓', description: 'Cualquier otra consulta', color: '#9370DB' }
];

client.once('ready', async () => {
  console.log(`✅ Conectado como ${client.user.tag}`);

  const guild = client.guilds.cache.get(config.guildId);
  if (!guild) {
    console.error('❌ No se encontró el servidor');
    process.exit(1);
  }

  // Create tickets category
  let ticketsCategory = guild.channels.cache.find(c => c.type === ChannelType.GuildCategory && c.name === 'TICKETS');
  if (!ticketsCategory) {
    ticketsCategory = await guild.channels.create({
      name: 'TICKETS',
      type: ChannelType.GuildCategory,
      permissionOverwrites: [
        { id: guild.id, deny: [PermissionFlagsBits.ViewChannel] }
      ]
    });
    console.log('✅ Categoría TICKETS creada');
  }

  // Create ticket panel channel
  let panelChannel = guild.channels.cache.find(c => c.name === '🎫-abrir-ticket');
  if (!panelChannel) {
    panelChannel = await guild.channels.create({
      name: '🎫-abrir-ticket',
      type: ChannelType.GuildText,
      parent: ticketsCategory.id,
      permissionOverwrites: [
        { id: guild.id, allow: [PermissionFlagsBits.ViewChannel], deny: [PermissionFlagsBits.SendMessages] }
      ]
    });
    console.log('✅ Canal de tickets creado');
  }

  // Send ticket panel
  const embed = new EmbedBuilder()
    .setColor('#5865F2')
    .setTitle('🎫 Sistema de Tickets')
    .setDescription('Selecciona el tipo de ticket que deseas abrir en el menú de abajo.\n\n**¿Qué es un ticket?**\nUn canal privado donde puedes comunicarte directamente con el equipo.')
    .addFields(
      ticketTypes.map(t => ({
        name: t.name,
        value: t.description,
        inline: true
      }))
    )
    .setTimestamp()
    .setFooter({ text: 'Selecciona una opción del menú' });

  const selectMenu = new StringSelectMenuBuilder()
    .setCustomId('ticket_select')
    .setPlaceholder('🎯 Selecciona tipo de ticket...')
    .addOptions(
      ticketTypes.map(t => ({
        label: t.name,
        value: t.id,
        description: t.description.substring(0, 100),
        emoji: t.emoji
      }))
    );

  const row = new ActionRowBuilder().addComponents(selectMenu);

  await panelChannel.send({ embeds: [embed], components: [row] });
  console.log('✅ Panel de tickets enviado');

  console.log('\n🎉 ¡Sistema de tickets configurado!');
  process.exit(0);
});

// Handle ticket creation
client.on('interactionCreate', async interaction => {
  if (!interaction.isStringSelectMenu()) return;
  if (interaction.customId !== 'ticket_select') return;

  const ticketType = ticketTypes.find(t => t.id === interaction.values[0]);
  if (!ticketType) return;

  const guild = interaction.guild;
  const member = interaction.member;

  // Check if user already has open ticket
  const existingTicket = guild.channels.cache.find(
    c => c.name === `ticket-${member.user.username.toLowerCase()}`
  );

  if (existingTicket) {
    return interaction.reply({
      content: `❌ Ya tienes un ticket abierto: ${existingTicket}`,
      ephemeral: true
    });
  }

  await interaction.deferReply({ ephemeral: true });

  // Create ticket channel
  const ticketChannel = await guild.channels.create({
    name: `ticket-${member.user.username.toLowerCase()}`,
    type: ChannelType.GuildText,
    parent: guild.channels.cache.find(c => c.type === ChannelType.GuildCategory && c.name === 'TICKETS')?.id,
    permissionOverwrites: [
      { id: guild.id, deny: [PermissionFlagsBits.ViewChannel] },
      { id: member.id, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages] },
      { id: guild.roles.cache.find(r => r.name === '👑 Owner')?.id, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages] },
      { id: guild.roles.cache.find(r => r.name === '⚡ Admin')?.id, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages] },
      { id: guild.roles.cache.find(r => r.name === '🛡️ Moderador')?.id, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages] }
    ]
  });

  // Send welcome message in ticket
  const ticketEmbed = new EmbedBuilder()
    .setColor(ticketType.color)
    .setTitle(`${ticketType.emoji} Ticket: ${ticketType.name}`)
    .setDescription(`Hola ${member}, bienvenido a tu ticket.\n\n**Tipo:** ${ticketType.name}\n**Motivo:** ${ticketType.description}\n\nUn miembro del equipo te atenderá pronto.\n\n**Para cerrar el ticket**, haz clic en el botón de abajo.`)
    .setThumbnail(member.user.displayAvatarURL())
    .setTimestamp();

  const closeButton = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId('close_ticket')
      .setLabel('Cerrar Ticket')
      .setStyle(ButtonStyle.Danger)
      .setEmoji('🔒')
  );

  await ticketChannel.send({ embeds: [ticketEmbed], components: [closeButton] });
  await ticketChannel.send(`${member}`);

  await interaction.editReply({
    content: `✅ Ticket creado: ${ticketChannel}`
  });

  console.log(`🎫 Ticket abierto: ${ticketType.name} por ${member.user.tag}`);
});

// Handle ticket close
client.on('interactionCreate', async interaction => {
  if (!interaction.isButton()) return;
  if (interaction.customId !== 'close_ticket') return;

  const channel = interaction.channel;
  if (!channel.name.startsWith('ticket-')) return;

  const embed = new EmbedBuilder()
    .setColor('#FF0000')
    .setTitle('🔒 Ticket Cerrado')
    .setDescription(`Ticket cerrado por ${interaction.user}`)
    .setTimestamp();

  await channel.send({ embeds: [embed] });

  // Archive and delete after 5 seconds
  setTimeout(async () => {
    await channel.delete('Ticket cerrado');
    console.log(`🔒 Ticket cerrado: ${channel.name}`);
  }, 5000);

  await interaction.reply({ content: '🔒 Cerrando ticket en 5 segundos...' });
});

client.login(config.token);
