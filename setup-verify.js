require('dotenv').config();
const { Client, GatewayIntentBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits, ChannelType } = require('discord.js');
const config = require('./config');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions
  ]
});

client.once('ready', async () => {
  const guild = client.guilds.cache.get(config.guildId);
  if (!guild) { console.error('❌ Servidor no encontrado'); process.exit(1); }

  console.log(`📡 Configurando verificación en: ${guild.name}`);

  // 1. Create "Miembro" role
  let miembroRole = guild.roles.cache.get('1485405932728090749') || guild.roles.cache.find(r => r.name === 'Miembro');
  if (!miembroRole) {
    miembroRole = await guild.roles.create({
      name: 'Miembro',
      color: '#57F287',
      mentionable: false,
      reason: 'Rol de verificación - desbloquea el servidor'
    });
    console.log('✅ Rol "Miembro" creado');
  } else {
    console.log('✅ Rol "Miembro" ya existe');
  }

  // 2. Deny @everyone view on all channels except bienvenida and reglas
  const channels = guild.channels.cache;
  for (const [, channel] of channels) {
    if (channel.type === ChannelType.GuildCategory) continue;
    if (channel.name === 'bienvenida' || channel.name === 'reglas' || channel.name === 'verificacion') continue;

    const currentPerms = channel.permissionOverwrites.cache.get(guild.id);
    if (currentPerms && currentPerms.deny.has(PermissionFlagsBits.ViewChannel)) continue;

    try {
      await channel.permissionOverwrites.edit(guild.id, {
        ViewChannel: false
      });
    } catch (e) {}
  }
  console.log('✅ Canales bloqueados para @everyone');

  // 3. Allow Miembro role to view all channels
  for (const [, channel] of channels) {
    if (channel.type === ChannelType.GuildCategory) continue;

    try {
      const currentPerms = channel.permissionOverwrites.cache.get(miembroRole.id);
      if (!currentPerms || !currentPerms.allow.has(PermissionFlagsBits.ViewChannel)) {
        await channel.permissionOverwrites.edit(miembroRole, {
          ViewChannel: true,
          SendMessages: true,
          ReadMessageHistory: true
        });
      }
    } catch (e) {}
  }
  console.log('✅ Rol "Miembro" tiene acceso a todos los canales');

  // 4. Ensure bienvenida and reglas are visible to @everyone
  const bienvenidaChannel = channels.find(c => c.name === 'bienvenida');
  const reglasChannel = channels.find(c => c.name === 'reglas');

  if (bienvenidaChannel) {
    await bienvenidaChannel.permissionOverwrites.edit(guild.id, {
      ViewChannel: true,
      SendMessages: false
    });
  }
  if (reglasChannel) {
    await reglasChannel.permissionOverwrites.edit(guild.id, {
      ViewChannel: true,
      SendMessages: false
    });
  }
  console.log('✅ Canales bienvenida y reglas visibles para todos');

  // 5. Send verification message in #bienvenida
  if (bienvenidaChannel) {
    const verifyEmbed = new EmbedBuilder()
      .setColor('#5865F2')
      .setTitle('🔐 Verificación Requerida')
      .setDescription(
        'Para acceder a todo el servidor, debes verificarte.\n\n' +
        '**¿Cómo verificarlo?**\n' +
        'Haz clic en el botón de abajo y se te asignará el rol **Miembro**.\n\n' +
        'Una vez verificado podrás ver todos los canales, participar en la comunidad y usar los comandos del bot.'
      )
      .addFields(
        { name: '📋 Pasos', value: '1. Lee las reglas en #reglas\n2. Haz clic en "Verificarme"\n3. Disfruta del servidor', inline: false }
      )
      .setTimestamp()
      .setFooter({ text: 'Sistema de verificación automática' });

    const verifyButton = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('verify_user')
        .setLabel('Verificarme')
        .setStyle(ButtonStyle.Success)
        .setEmoji('✅')
    );

    await bienvenidaChannel.send({ embeds: [verifyEmbed], components: [verifyButton] });
    console.log('✅ Mensaje de verificación enviado');
  }

  console.log('\n🎉 ¡Sistema de verificación configurado!');
  process.exit(0);
});

// Handle verify button
client.on('interactionCreate', async interaction => {
  if (!interaction.isButton()) return;
  if (interaction.customId !== 'verify_user') return;

  const guild = interaction.guild;
  const member = interaction.member;

  const miembroRole = guild.roles.cache.find(r => r.name === 'Miembro');
  if (!miembroRole) {
    return interaction.reply({ content: '❌ Error: Rol de verificación no encontrado', ephemeral: true });
  }

  if (member.roles.cache.has(miembroRole.id)) {
    return interaction.reply({ content: '✅ Ya estás verificado. Puedes ver todos los canales.', ephemeral: true });
  }

  await member.roles.add(miembroRole);
  await interaction.reply({
    content: '✅ **Verificado correctamente.** Ya puedes ver todos los canales del servidor. ¡Bienvenido!',
    ephemeral: true
  });

  console.log(`✅ ${member.user.tag} verificado`);
});

client.login(config.token);
