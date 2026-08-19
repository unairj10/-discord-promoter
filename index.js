const { Client, GatewayIntentBits, Collection, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, PermissionFlagsBits, StringSelectMenuBuilder, AttachmentBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
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

const ticketTypes = [
  { id: 'soporte', name: 'Soporte Tecnico', emoji: '🛠️', description: 'Problemas tecnicos con mis servicios', color: '#FF4500' },
  { id: 'compras', name: 'Compras', emoji: '💰', description: 'Quiero comprar un servicio', color: '#FFD700' },
  { id: 'colaboracion', name: 'Colaboracion', emoji: '🤝', description: 'Propuestas de trabajo conjunto', color: '#32CD32' },
  { id: 'feedback', name: 'Feedback', emoji: '📝', description: 'Sugerencias y opiniones', color: '#1E90FF' },
  { id: 'bug', name: 'Reportar Bug', emoji: '🐛', description: 'Reportar errores', color: '#FF69B4' },
  { id: 'otro', name: 'Otro', emoji: '❓', description: 'Cualquier otra consulta', color: '#9370DB' }
];

const commands = [
  { name: 'portfolio', description: 'Muestra mi portfolio completo de proyectos' },
  {
    name: 'proyecto', description: 'Muestra informacion de un proyecto especifico',
    options: [{
      name: 'nombre', type: 3, description: 'Nombre del proyecto', required: true,
      choices: config.projects.map(p => ({ name: `${p.emoji} ${p.name}`, value: p.id }))
    }]
  },
  { name: 'proyectos', description: 'Lista todos mis proyectos disponibles' },
  { name: 'roles', description: 'Sistema de roles por intereses' },
  { name: 'ticket', description: 'Abrir un ticket de soporte' },
  {
    name: 'suggest', description: 'Enviar una sugerencia al servidor',
    options: [{ name: 'texto', type: 3, description: 'Tu sugerencia', required: true }]
  }
];

function createProjectEmbed(project) {
  return new EmbedBuilder()
    .setColor(project.color)
    .setTitle(`${project.emoji} ${project.name}`)
    .setDescription(project.description)
    .setURL(project.url)
    .addFields(
      { name: 'Enlace', value: `[Visitar ${project.name}](${project.url})`, inline: true },
      { name: 'Categoria', value: project.category, inline: true }
    )
    .setFooter({ text: 'Haz clic en el titulo para visitar el sitio web' })
    .setFooter({ text: 'Bot programado por Unai' });
}

function createPortfolioEmbed() {
  const categories = {};
  config.projects.forEach(p => {
    if (!categories[p.category]) categories[p.category] = [];
    categories[p.category].push(p);
  });
  const embed = new EmbedBuilder()
    .setColor('#5865F2')
    .setTitle('Mi Portfolio de Proyectos')
    .setDescription('Todos mis proyectos organizados por categoria.')
    .setFooter({ text: 'Bot programado por Unai' });
  Object.entries(categories).forEach(([cat, projects]) => {
    embed.addFields({ name: cat, value: projects.map(p => `${p.emoji} ${p.name}`).join('\n'), inline: false });
  });
  return embed;
}

function createRoleEmbed() {
  const embed = new EmbedBuilder()
    .setColor('#5865F2')
    .setTitle('Selecciona tus Intereses')
    .setDescription('Haz clic en los botones para obtener roles personalizados.')
    .setFooter({ text: 'Bot programado por Unai' });
  embed.addFields({ name: 'Roles disponibles', value: config.roles.map(r => `${r.emoji} ${r.name}`).join('\n') });
  return embed;
}

function createTicketPanelEmbed() {
  return new EmbedBuilder()
    .setColor('#5865F2')
    .setTitle('Sistema de Tickets')
    .setDescription('Selecciona el tipo de ticket en el menu de abajo.')
    .addFields(ticketTypes.map(t => ({ name: t.name, value: t.description, inline: true })))
    .setFooter({ text: 'Bot programado por Unai' });
}

client.once('ready', async () => {
  console.log(`Bot conectado como ${client.user.tag}`);
  const rest = new REST({ version: '10' }).setToken(config.token);
  try {
    await rest.put(Routes.applicationGuildCommands(config.clientId, config.guildId), { body: commands });
    console.log('Comandos registrados');
  } catch (error) {
    console.error('Error registrando comandos:', error);
  }
});

// Single interaction handler
client.on('interactionCreate', async interaction => {

  // --- SLASH COMMANDS ---
  if (interaction.isChatInputCommand()) {
    const { commandName } = interaction;

    if (commandName === 'portfolio') {
      const embed = createPortfolioEmbed();
      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId('view_all_projects').setLabel('Ver Todos').setStyle(ButtonStyle.Primary).setEmoji('📋'),
        new ButtonBuilder().setLabel('Visitar Portfolio').setURL(config.projects[0].url).setStyle(ButtonStyle.Link).setEmoji('🌐')
      );
      return interaction.reply({ embeds: [embed], components: [row] });
    }

    if (commandName === 'proyecto') {
      const project = config.projects.find(p => p.id === interaction.options.getString('nombre'));
      if (!project) return interaction.reply({ content: 'Proyecto no encontrado', ephemeral: true });
      const embed = createProjectEmbed(project);
      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setLabel(`Visitar ${project.name}`).setURL(project.url).setStyle(ButtonStyle.Link).setEmoji('🌐')
      );
      return interaction.reply({ embeds: [embed], components: [row] });
    }

    if (commandName === 'proyectos') {
      const embeds = config.projects.map(p => createProjectEmbed(p));
      return interaction.reply({ content: 'Todos mis proyectos:', embeds: embeds.slice(0, 10), ephemeral: true });
    }

    if (commandName === 'roles') {
      const embed = createRoleEmbed();
      const row = new ActionRowBuilder();
      config.roles.forEach(role => {
        row.addComponents(new ButtonBuilder().setCustomId(`role_${role.name.toLowerCase()}`).setLabel(role.name).setStyle(ButtonStyle.Secondary).setEmoji(role.emoji));
      });
      return interaction.reply({ embeds: [embed], components: [row] });
    }

    if (commandName === 'ticket') {
      const embed = createTicketPanelEmbed();
      const selectMenu = new StringSelectMenuBuilder()
        .setCustomId('ticket_select')
        .setPlaceholder('Selecciona tipo de ticket...')
        .addOptions(ticketTypes.map(t => ({ label: t.name, value: t.id, description: t.description.substring(0, 100), emoji: t.emoji })));
      const row = new ActionRowBuilder().addComponents(selectMenu);
      return interaction.reply({ embeds: [embed], components: [row] });
    }

    if (commandName === 'suggest') {
      const texto = interaction.options.getString('texto');
      const channel = interaction.guild.channels.cache.get('1538760787345014884');
      if (!channel) return interaction.reply({ content: 'Canal de sugerencias no encontrado', ephemeral: true });

      const embed = new EmbedBuilder()
        .setColor('#5865F2')
        .setTitle('Nueva Sugerencia')
        .setDescription(texto)
        .addFields(
          { name: 'Autor', value: interaction.user.tag, inline: true },
          { name: '👍 A favor', value: '0', inline: true },
          { name: '👎 En contra', value: '0', inline: true }
        )
        .setFooter({ text: 'Bot programado por Unai' });

      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId('suggest_yes_0').setLabel('0').setStyle(ButtonStyle.Success).setEmoji('👍'),
        new ButtonBuilder().setCustomId('suggest_no_0').setLabel('0').setStyle(ButtonStyle.Danger).setEmoji('👎')
      );

      await channel.send({ embeds: [embed], components: [row] });
      return interaction.reply({ content: 'Sugerencia publicada en ' + channel, ephemeral: true });
    }
  }

  // --- SELECT MENUS ---
  if (interaction.isStringSelectMenu()) {
    if (interaction.customId === 'ticket_select') {
      const ticketType = ticketTypes.find(t => t.id === interaction.values[0]);
      if (!ticketType) return;

      // Si es Compras, mostrar modal
      if (ticketType.id === 'compras') {
        const modal = new ModalBuilder()
          .setCustomId('compras_modal')
          .setTitle('📝 Cuéntame sobre tu proyecto');

        const nombreInput = new TextInputBuilder()
          .setCustomId('proyecto_nombre')
          .setLabel('Nombre del proyecto')
          .setPlaceholder('Ej: Web para mi negocio')
          .setStyle(TextInputStyle.Short)
          .setRequired(true);

        const descripcionInput = new TextInputBuilder()
          .setCustomId('proyecto_descripcion')
          .setLabel('Descripción del proyecto')
          .setPlaceholder('¿Qué necesitas? Describe tu idea...')
          .setStyle(TextInputStyle.Paragraph)
          .setRequired(true);

        const presupuestoInput = new TextInputBuilder()
          .setCustomId('proyecto_presupuesto')
          .setLabel('Presupuesto aproximado')
          .setPlaceholder('Ej: 50-100€, 100-200€, 200€+')
          .setStyle(TextInputStyle.Short)
          .setRequired(true);

        const plazoInput = new TextInputBuilder()
          .setCustomId('proyecto_plazo')
          .setLabel('Plazo de entrega')
          .setPlaceholder('Ej: 1 semana, 2 semanas, 1 mes')
          .setStyle(TextInputStyle.Short)
          .setRequired(true);

        const referenciasInput = new TextInputBuilder()
          .setCustomId('proyecto_referencias')
          .setLabel('Referencias o enlaces (opcional)')
          .setPlaceholder('URLs de ejemplos que te gusten')
          .setStyle(TextInputStyle.Short)
          .setRequired(false);

        modal.addComponents(
          new ActionRowBuilder().addComponents(nombreInput),
          new ActionRowBuilder().addComponents(descripcionInput),
          new ActionRowBuilder().addComponents(presupuestoInput),
          new ActionRowBuilder().addComponents(plazoInput),
          new ActionRowBuilder().addComponents(referenciasInput)
        );

        return interaction.showModal(modal);
      }

      // Para otros tipos de ticket, crear directamente
      const guild = interaction.guild;
      const member = interaction.member;

      const existingTicket = guild.channels.cache.find(c => c.name === `ticket-${member.user.username.toLowerCase()}`);
      if (existingTicket) return interaction.reply({ content: `Ya tienes un ticket abierto: ${existingTicket}`, ephemeral: true });

      await interaction.deferReply({ ephemeral: true });

      const ticketChannel = await guild.channels.create({
        name: `ticket-${member.user.username.toLowerCase()}`,
        type: ChannelType.GuildText,
        parent: guild.channels.cache.find(c => c.type === ChannelType.GuildCategory && c.name === 'TICKETS')?.id,
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
        .setTitle(`${ticketType.emoji} Ticket: ${ticketType.name}`)
        .setDescription(`Hola ${member}, bienvenido a tu ticket.\n\n**Tipo:** ${ticketType.name}\n**Motivo:** ${ticketType.description}\n\nUn miembro del equipo te atendera pronto.\n\nPara cerrar el ticket, haz clic en el boton de abajo.`)
        .setThumbnail(member.user.displayAvatarURL())
        .setFooter({ text: 'Bot programado por Unai' });

      const closeButton = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId('close_ticket').setLabel('Cerrar Ticket').setStyle(ButtonStyle.Danger).setEmoji('🔒')
      );

      await ticketChannel.send({ embeds: [ticketEmbed], components: [closeButton] });
      await ticketChannel.send({ content: member.toString() });
      return interaction.editReply({ content: `Ticket creado: ${ticketChannel}` });
    }
  }

  // --- MODALS ---
  if (interaction.isModalSubmit()) {
    if (interaction.customId === 'compras_modal') {
      const guild = interaction.guild;
      const member = interaction.member;

      const existingTicket = guild.channels.cache.find(c => c.name === `ticket-${member.user.username.toLowerCase()}`);
      if (existingTicket) return interaction.reply({ content: `Ya tienes un ticket abierto: ${existingTicket}`, ephemeral: true });

      await interaction.deferReply({ ephemeral: true });

      const ticketChannel = await guild.channels.create({
        name: `ticket-${member.user.username.toLowerCase()}`,
        type: ChannelType.GuildText,
        parent: guild.channels.cache.find(c => c.type === ChannelType.GuildCategory && c.name === 'TICKETS')?.id,
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

      const nombre = interaction.fields.getTextInputValue('proyecto_nombre');
      const descripcion = interaction.fields.getTextInputValue('proyecto_descripcion');
      const presupuesto = interaction.fields.getTextInputValue('proyecto_presupuesto');
      const plazo = interaction.fields.getTextInputValue('proyecto_plazo');
      const referencias = interaction.fields.getTextInputValue('proyecto_referencias') || 'No proporcionadas';

      const ticketEmbed = new EmbedBuilder()
        .setColor('#FFD700')
        .setTitle('💰 Ticket: Compras')
        .setDescription(`Hola ${member}, bienvenido a tu ticket.\n\n**Tipo:** Compras\n\n📋 **Detalles del proyecto:**\n\n**Nombre:** ${nombre}\n\n**Descripción:** ${descripcion}\n\n**Presupuesto:** ${presupuesto}\n\n**Plazo:** ${plazo}\n\n**Referencias:** ${referencias}\n\nUn miembro del equipo te atenderá pronto.\n\nPara cerrar el ticket, haz clic en el botón de abajo.`)
        .setThumbnail(member.user.displayAvatarURL())
        .setFooter({ text: 'Bot programado por Unai' });

      const closeButton = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId('close_ticket').setLabel('Cerrar Ticket').setStyle(ButtonStyle.Danger).setEmoji('🔒')
      );

      await ticketChannel.send({ embeds: [ticketEmbed], components: [closeButton] });
      await ticketChannel.send({ content: member.toString() });
      return interaction.editReply({ content: `Ticket creado con tu formulario: ${ticketChannel}` });
    }
  }

  // --- BUTTONS ---
  if (interaction.isButton()) {

    // Verify
    if (interaction.customId === 'verify_user') {
      const miembroRole = interaction.guild.roles.cache.find(r => r.name === 'Miembro');
      if (!miembroRole) return interaction.reply({ content: 'Error: Rol no encontrado', ephemeral: true });
      if (interaction.member.roles.cache.has(miembroRole.id)) {
        return interaction.reply({ content: 'Ya estas verificado.', ephemeral: true });
      }
      await interaction.member.roles.add(miembroRole);
      return interaction.reply({ content: 'Verificado correctamente. Ya puedes ver todos los canales.', ephemeral: true });
    }

    // Roles
    if (interaction.customId.startsWith('role_')) {
      const roleName = interaction.customId.replace('role_', '');
      const roleConfig = config.roles.find(r => r.name.toLowerCase() === roleName);
      if (!roleConfig) return;
      const role = interaction.guild.roles.cache.find(r => r.name === roleConfig.name);
      if (!role) return interaction.reply({ content: `Rol "${roleConfig.name}" no encontrado`, ephemeral: true });
      if (interaction.member.roles.cache.has(role.id)) {
        await interaction.member.roles.remove(role);
        return interaction.reply({ content: `Rol ${roleConfig.emoji} ${roleConfig.name} eliminado`, ephemeral: true });
      } else {
        await interaction.member.roles.add(role);
        return interaction.reply({ content: `Rol ${roleConfig.emoji} ${roleConfig.name} anadido`, ephemeral: true });
      }
    }

    // View all projects
    if (interaction.customId === 'view_all_projects') {
      const embeds = config.projects.map(p => createProjectEmbed(p));
      return interaction.reply({ embeds: embeds.slice(0, 10), ephemeral: true });
    }

    // Suggest votes
    if (interaction.customId.startsWith('suggest_yes_') || interaction.customId.startsWith('suggest_no_')) {
      const isYes = interaction.customId.startsWith('suggest_yes_');
      const currentVotes = parseInt(interaction.customId.split('_')[2]);
      const newVotes = currentVotes + 1;

      const msg = interaction.message;
      const embed = EmbedBuilder.from(msg.embeds[0]);
      const fields = embed.data.fields;

      const yesVotes = isYes ? newVotes : parseInt(fields[1].value);
      const noVotes = isYes ? parseInt(fields[2].value) : newVotes;

      fields[1].value = String(yesVotes);
      fields[2].value = String(noVotes);

      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId(`suggest_yes_${yesVotes}`).setLabel(String(yesVotes)).setStyle(ButtonStyle.Success).setEmoji('👍'),
        new ButtonBuilder().setCustomId(`suggest_no_${noVotes}`).setLabel(String(noVotes)).setStyle(ButtonStyle.Danger).setEmoji('👎')
      );
      return interaction.update({ embeds: [embed], components: [row] });
    }

    // Close ticket
    if (interaction.customId === 'close_ticket') {
      const channel = interaction.channel;
      if (!channel.name.startsWith('ticket-')) return;

      try {
        const username = channel.name.replace('ticket-', '');
        const transcriptsChannel = interaction.guild.channels.cache.find(ch => ch.name === 'transcripts');
        if (transcriptsChannel) {
          const embed = new EmbedBuilder()
            .setColor('#5865F2')
            .setTitle('Ticket Cerrado')
            .addFields(
              { name: 'Usuario', value: username, inline: true },
              { name: 'Cerrado por', value: interaction.user.tag, inline: true },
              { name: 'Fecha', value: new Date().toLocaleString('es-ES'), inline: true }
            )
            .setFooter({ text: 'Bot programado por Unai' });
          await transcriptsChannel.send({ embeds: [embed] });
        }
        await interaction.reply({ content: 'Cerrando ticket...' });
      } catch (e) {
        console.error('Error:', e);
      }

      setTimeout(async () => {
        try { await channel.delete('Ticket cerrado'); } catch(e) {}
      }, 3000);
    }
  }
});

// Welcome
client.on('guildMemberAdd', async member => {
  const channel = member.guild.channels.cache.find(ch => ch.name === 'bienvenida');
  if (!channel) return;
  const embed = new EmbedBuilder()
    .setColor('#57F287')
    .setTitle(`Bienvenido/a ${member.user.username}!`)
    .setDescription('Gracias por unirte a nuestra comunidad!')
    .addFields(
      { name: 'Portfolio', value: 'Usa `/portfolio` para ver todos los proyectos', inline: false },
      { name: 'Roles', value: 'Usa `/roles` para personalizar tu experiencia', inline: false },
      { name: 'Proyectos', value: 'Usa `/proyectos` para ver la lista completa', inline: false },
      { name: 'Tickets', value: 'Usa `/ticket` para abrir un ticket de soporte', inline: false }
    )
    .setThumbnail(member.user.displayAvatarURL())
    .setFooter({ text: 'Bot programado por Unai' });
  channel.send({ embeds: [embed] });
});

client.login(config.token);
