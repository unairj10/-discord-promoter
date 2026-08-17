const { Client, GatewayIntentBits, Collection, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, PermissionFlagsBits, StringSelectMenuBuilder } = require('discord.js');
const { REST, Routes } = require('discord.js');
const config = require('./config');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
  ]
});

client.commands = new Collection();

// Ticket types
const ticketTypes = [
  { id: 'soporte', name: '🛠️ Soporte Técnico', emoji: '🛠️', description: 'Problemas técnicos con mis servicios', color: '#FF4500' },
  { id: 'ventas', name: '💰 Ventas', emoji: '💰', description: 'Información sobre precios y presupuestos', color: '#FFD700' },
  { id: 'colaboracion', name: '🤝 Colaboración', emoji: '🤝', description: 'Propuestas de trabajo conjunto', color: '#32CD32' },
  { id: 'feedback', name: '📝 Feedback', emoji: '📝', description: 'Sugerencias y opiniones sobre mis proyectos', color: '#1E90FF' },
  { id: 'bug', name: '🐛 Reportar Bug', emoji: '🐛', description: 'Reportar errores en mis aplicaciones', color: '#FF69B4' },
  { id: 'otro', name: '❓ Otro', emoji: '❓', description: 'Cualquier otra consulta', color: '#9370DB' }
];

// Register slash commands
const commands = [
  {
    name: 'portfolio',
    description: 'Muestra mi portfolio completo de proyectos',
  },
  {
    name: 'proyecto',
    description: 'Muestra información de un proyecto específico',
    options: [
      {
        name: 'nombre',
        type: 3,
        description: 'Nombre del proyecto',
        required: true,
        choices: config.projects.map(p => ({
          name: `${p.emoji} ${p.name}`,
          value: p.id
        }))
      }
    ]
  },
  {
    name: 'proyectos',
    description: 'Lista todos mis proyectos disponibles',
  },
  {
    name: 'roles',
    description: 'Sistema de roles por intereses',
  },
  {
    name: 'ticket',
    description: 'Abrir un ticket de soporte',
  }
];

// Helper: Create project embed
function createProjectEmbed(project) {
  return new EmbedBuilder()
    .setColor(project.color)
    .setTitle(`${project.emoji} ${project.name}`)
    .setDescription(project.description)
    .setURL(project.url)
    .addFields(
      { name: '🔗 Enlace', value: `[Visitar ${project.name}](${project.url})`, inline: true },
      { name: '📂 Categoría', value: project.category, inline: true }
    )
    .setFooter({ text: 'Haz clic en el título para visitar el sitio web' })
    .setTimestamp();
}

// Helper: Create portfolio embed
function createPortfolioEmbed() {
  const categories = {};
  config.projects.forEach(p => {
    if (!categories[p.category]) categories[p.category] = [];
    categories[p.category].push(p);
  });

  const embed = new EmbedBuilder()
    .setColor('#5865F2')
    .setTitle('💼 Mi Portfolio de Proyectos')
    .setDescription('Aquí tienes todos mis proyectos organizados por categoría.')
    .setTimestamp()
    .setFooter({ text: 'Portfolio de Proyectos Web' });

  Object.entries(categories).forEach(([cat, projects]) => {
    const projectList = projects.map(p => `${p.emoji} ${p.name}`).join('\n');
    embed.addFields({ name: `📁 ${cat}`, value: projectList, inline: false });
  });

  return embed;
}

// Helper: Create role selection embed
function createRoleEmbed() {
  const embed = new EmbedBuilder()
    .setColor('#5865F2')
    .setTitle('🎯 Selecciona tus Intereses')
    .setDescription('Haz clic en los botones para obtener roles personalizados.')
    .setTimestamp();

  const roleDescriptions = config.roles.map(r => `${r.emoji} ${r.name}`).join('\n');
  embed.addFields({ name: 'Roles disponibles', value: roleDescriptions });

  return embed;
}

// Helper: Create ticket panel embed
function createTicketPanelEmbed() {
  return new EmbedBuilder()
    .setColor('#5865F2')
    .setTitle('🎫 Sistema de Tickets')
    .setDescription('Selecciona el tipo de ticket que deseas abrir en el menú de abajo.')
    .addFields(
      ticketTypes.map(t => ({
        name: t.name,
        value: t.description,
        inline: true
      }))
    )
    .setTimestamp()
    .setFooter({ text: 'Selecciona una opción del menú' });
}

// Bot ready
client.once('ready', async () => {
  console.log(`✅ Bot conectado como ${client.user.tag}`);
  console.log(`📡 Servidor(es): ${client.guilds.cache.map(g => g.name).join(', ')}`);

  // Register commands
  const rest = new REST({ version: '10' }).setToken(config.token);
  try {
    console.log('🔄 Registrando comandos slash...');
    await rest.put(
      Routes.applicationGuildCommands(config.clientId, config.guildId),
      { body: commands }
    );
    console.log('✅ Comandos registrados correctamente');
  } catch (error) {
    console.error('❌ Error registrando comandos:', error);
  }
});

// Handle slash commands
client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName } = interaction;

  if (commandName === 'portfolio') {
    const embed = createPortfolioEmbed();
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('view_all_projects')
        .setLabel('Ver Todos los Proyectos')
        .setStyle(ButtonStyle.Primary)
        .setEmoji('📋'),
      new ButtonBuilder()
        .setLabel('Visitar Portfolio')
        .setURL(config.projects[0].url)
        .setStyle(ButtonStyle.Link)
        .setEmoji('🌐')
    );
    await interaction.reply({ embeds: [embed], components: [row] });
  }

  if (commandName === 'proyecto') {
    const projectId = interaction.options.getString('nombre');
    const project = config.projects.find(p => p.id === projectId);
    if (!project) return interaction.reply({ content: '❌ Proyecto no encontrado', ephemeral: true });
    const embed = createProjectEmbed(project);
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setLabel(`Visitar ${project.name}`).setURL(project.url).setStyle(ButtonStyle.Link).setEmoji('🌐')
    );
    await interaction.reply({ embeds: [embed], components: [row] });
  }

  if (commandName === 'proyectos') {
    const embeds = config.projects.map(p => createProjectEmbed(p));
    await interaction.reply({ content: '📋 **Todos mis proyectos:**', embeds: embeds.slice(0, 10), ephemeral: true });
  }

  if (commandName === 'roles') {
    const embed = createRoleEmbed();
    const row = new ActionRowBuilder();
    config.roles.forEach(role => {
      row.addComponents(
        new ButtonBuilder().setCustomId(`role_${role.name.toLowerCase()}`).setLabel(role.name).setStyle(ButtonStyle.Secondary).setEmoji(role.emoji)
      );
    });
    await interaction.reply({ embeds: [embed], components: [row] });
  }

  if (commandName === 'ticket') {
    const embed = createTicketPanelEmbed();
    const selectMenu = new StringSelectMenuBuilder()
      .setCustomId('ticket_select')
      .setPlaceholder('🎯 Selecciona tipo de ticket...')
      .addOptions(ticketTypes.map(t => ({
        label: t.name,
        value: t.id,
        description: t.description.substring(0, 100),
        emoji: t.emoji
      })));
    const row = new ActionRowBuilder().addComponents(selectMenu);
    await interaction.reply({ embeds: [embed], components: [row] });
  }
});

// Handle ticket selection
client.on('interactionCreate', async interaction => {
  if (!interaction.isStringSelectMenu()) return;
  if (interaction.customId !== 'ticket_select') return;

  const ticketType = ticketTypes.find(t => t.id === interaction.values[0]);
  if (!ticketType) return;

  const guild = interaction.guild;
  const member = interaction.member;

  const existingTicket = guild.channels.cache.find(c => c.name === `ticket-${member.user.username.toLowerCase()}`);
  if (existingTicket) return interaction.reply({ content: `❌ Ya tienes un ticket abierto: ${existingTicket}`, ephemeral: true });

  await interaction.deferReply({ ephemeral: true });

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

  const ticketEmbed = new EmbedBuilder()
    .setColor(ticketType.color)
    .setTitle(`${ticketType.emoji} Ticket: ${ticketType.name}`)
    .setDescription(`Hola ${member}, bienvenido a tu ticket.\n\n**Tipo:** ${ticketType.name}\n**Motivo:** ${ticketType.description}\n\nUn miembro del equipo te atenderá pronto.\n\n**Para cerrar el ticket**, haz clic en el botón de abajo.`)
    .setThumbnail(member.user.displayAvatarURL())
    .setTimestamp();

  const closeButton = new ActionRowBuilder().addComponents(
    new ButtonBuilder().setCustomId('close_ticket').setLabel('Cerrar Ticket').setStyle(ButtonStyle.Danger).setEmoji('🔒')
  );

  await ticketChannel.send({ embeds: [ticketEmbed], components: [closeButton] });
  await ticketChannel.send(`${member}`);
  await interaction.editReply({ content: `✅ Ticket creado: ${ticketChannel}` });
});

// Handle role buttons
client.on('interactionCreate', async interaction => {
  if (!interaction.isButton()) return;

  if (interaction.customId.startsWith('role_')) {
    const roleName = interaction.customId.replace('role_', '');
    const roleConfig = config.roles.find(r => r.name.toLowerCase() === roleName);
    if (!roleConfig) return;
    const role = interaction.guild.roles.cache.find(r => r.name === roleConfig.name);
    if (!role) return interaction.reply({ content: `❌ Rol "${roleConfig.name}" no encontrado`, ephemeral: true });
    const member = interaction.member;
    if (member.roles.cache.has(role.id)) {
      await member.roles.remove(role);
      await interaction.reply({ content: `✅ Rol ${roleConfig.emoji} **${roleConfig.name}** eliminado`, ephemeral: true });
    } else {
      await member.roles.add(role);
      await interaction.reply({ content: `✅ Rol ${roleConfig.emoji} **${roleConfig.name}** añadido`, ephemeral: true });
    }
  }

  if (interaction.customId === 'view_all_projects') {
    const embeds = config.projects.map(p => createProjectEmbed(p));
    await interaction.reply({ embeds: embeds.slice(0, 10), ephemeral: true });
  }

  if (interaction.customId === 'close_ticket') {
    const channel = interaction.channel;
    if (!channel.name.startsWith('ticket-')) return;

    await interaction.reply({ content: '🔒 Cerrando ticket y guardando transcript...' });

    // Fetch all messages from the ticket
    let allMessages = [];
    let lastMessageId;
    while (true) {
      const options = { limit: 100 };
      if (lastMessageId) options.before = lastMessageId;
      const messages = await channel.messages.fetch(options);
      if (messages.size === 0) break;
      allMessages = allMessages.concat(messages.array());
      lastMessageId = messages.last().id;
    }

    allMessages.sort((a, b) => a.createdTimestamp - b.createdTimestamp);

    // Build transcript
    const username = channel.name.replace('ticket-', '');
    let transcript = `# Transcript: ${channel.name}\n`;
    transcript += `**Cerrado por:** ${interaction.user.tag}\n`;
    transcript += `**Fecha:** ${new Date().toLocaleString('es-ES')}\n`;
    transcript += `**Mensajes totales:** ${allMessages.length}\n\n---\n\n`;

    for (const msg of allMessages) {
      const time = new Date(msg.createdTimestamp).toLocaleString('es-ES');
      transcript += `**[${time}] ${msg.author.tag}:**\n${msg.content}\n\n`;
    }

    // Find transcripts channel
    const transcriptsChannel = interaction.guild.channels.cache.find(
      ch => ch.name === 'transcripts'
    );

    if (transcriptsChannel) {
      const ticketUser = channel.name.replace('ticket-', '');
      const transcriptEmbed = new EmbedBuilder()
        .setColor('#5865F2')
        .setTitle(`📋 Transcript: ${ticketUser}`)
        .setDescription(`Ticket cerrado por ${interaction.user}\nMensajes: ${allMessages.length}`)
        .addFields(
          { name: 'Usuario', value: ticketUser, inline: true },
          { name: 'Cerrado por', value: interaction.user.tag, inline: true },
          { name: 'Fecha', value: new Date().toLocaleString('es-ES'), inline: true }
        )
        .setTimestamp();

      // Split transcript into chunks if too long for a file
      const buffer = Buffer.from(transcript, 'utf-8');
      const attachment = require('discord.js').AttachmentBuilder.from(buffer, { name: `${channel.name}.md` });

      await transcriptsChannel.send({ embeds: [transcriptEmbed], files: [attachment] });
    }

    // Close and delete
    const closeEmbed = new EmbedBuilder().setColor('#FF0000').setTitle('🔒 Ticket Cerrado').setDescription(`Ticket cerrado por ${interaction.user}\n\nTranscript guardado en #transcripts`).setTimestamp();
    await channel.send({ embeds: [closeEmbed] });
    setTimeout(async () => { try { await channel.delete('Ticket cerrado'); } catch(e) {} }, 5000);
  }
});

// Welcome message
client.on('guildMemberAdd', async member => {
  const channel = member.guild.channels.cache.find(ch => ch.name === 'bienvenida');
  if (!channel) return;
  const embed = new EmbedBuilder()
    .setColor('#57F287')
    .setTitle(`¡Bienvenido/a ${member.user.username}! 🎉`)
    .setDescription('¡Gracias por unirte a nuestra comunidad!')
    .addFields(
      { name: '💼 Portfolio', value: 'Usa `/portfolio` para ver todos los proyectos', inline: false },
      { name: '🎯 Roles', value: 'Usa `/roles` para personalizar tu experiencia', inline: false },
      { name: '📋 Proyectos', value: 'Usa `/proyectos` para ver la lista completa', inline: false },
      { name: '🎫 Tickets', value: 'Usa `/ticket` para abrir un ticket de soporte', inline: false }
    )
    .setThumbnail(member.user.displayAvatarURL())
    .setTimestamp();
  channel.send({ embeds: [embed] });
});

// Auto-post disabled

client.login(config.token);
