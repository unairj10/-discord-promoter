require('dotenv').config();
const { Client, GatewayIntentBits, ChannelType, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const config = require('./config');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
  ]
});

client.once('ready', async () => {
  console.log(`✅ Conectado como ${client.user.tag}`);

  const guild = client.guilds.cache.get(config.guildId);
  if (!guild) {
    console.error('❌ No se encontró el servidor');
    process.exit(1);
  }

  console.log(`📡 Configurando servidor: ${guild.name}`);

  // 1. Create categories and channels
  const categories = {
    'INFORMACIÓN': ['bienvenida', 'reglas', 'anuncios', 'proyectos'],
    'PORTFOLIO': ['portfolio-web', 'branding', 'galeria-fotografica'],
    'HERRAMIENTAS': ['asistente-comunidad', 'app-tareas', 'calculadora-presupuestos', 'editor-imagenes'],
    'CONTENIDO': ['ediciones-montajes', 'juego-memoria', 'web-recetas', 'blog-personal'],
    'MARKETING': ['landing-negocio', 'videos-marca'],
    'COMUNIDAD': ['chat-general', 'chat-proyectos', 'sugerencias'],
    'ROLES': ['seleccionar-roles']
  };

  for (const [categoryName, channels] of Object.entries(categories)) {
    console.log(`📁 Creando categoría: ${categoryName}`);

    // Create or find category
    let category = guild.channels.cache.find(
      c => c.type === ChannelType.GuildCategory && c.name === categoryName
    );

    if (!category) {
      category = await guild.channels.create({
        name: categoryName,
        type: ChannelType.GuildCategory,
        permissionOverwrites: [
          {
            id: guild.id,
            allow: [PermissionFlagsBits.ViewChannel]
          }
        ]
      });
    }

    // Create channels in category
    for (const channelName of channels) {
      const existingChannel = guild.channels.cache.find(c => c.name === channelName);
      if (existingChannel) {
        console.log(`  ✅ Canal ${channelName} ya existe`);
        continue;
      }

      try {
        await guild.channels.create({
          name: channelName,
          type: ChannelType.GuildText,
          parent: category.id,
          permissionOverwrites: [
            {
              id: guild.id,
              allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages]
            }
          ]
        });
        console.log(`  ✅ Canal ${channelName} creado`);
      } catch (error) {
        console.error(`  ❌ Error creando ${channelName}:`, error.message);
      }
    }
  }

  // 2. Create roles
  console.log('\n🎭 Creando roles...');

  for (const roleConfig of config.roles) {
    const existingRole = guild.roles.cache.find(r => r.name === roleConfig.name);
    if (existingRole) {
      console.log(`  ✅ Rol ${roleConfig.name} ya existe`);
      continue;
    }

    try {
      await guild.roles.create({
        name: roleConfig.name,
        color: roleConfig.color,
        mentionable: true,
        reason: `Rol de interés: ${roleConfig.name}`
      });
      console.log(`  ✅ Rol ${roleConfig.name} creado`);
    } catch (error) {
      console.error(`  ❌ Error creando rol ${roleConfig.name}:`, error.message);
    }
  }

  // 3. Send welcome message
  console.log('\n📨 Enviando mensaje de bienvenida...');

  const welcomeChannel = guild.channels.cache.find(c => c.name === 'bienvenida');
  if (welcomeChannel) {
    const embed = new EmbedBuilder()
      .setColor('#5865F2')
      .setTitle('🚀 ¡Bienvenido al Portfolio Web!')
      .setDescription('Este servidor es tu puerta de entrada a todos mis proyectos web.')
      .addFields(
        { name: '📋 Comandos disponibles', value: '`/portfolio` - Ver portfolio completo\n`/proyecto` - Ver proyecto específico\n`/proyectos` - Lista de todos los proyectos\n`/roles` - Seleccionar tus intereses', inline: false },
        { name: '🎯 Categorías', value: '• **Portfolio** - Mis proyectos principales\n• **Herramientas** - Apps y utilidades\n• **Contenido** - Blogs, recetas, juegos\n• **Marketing** - Landing pages y branding', inline: false },
        { name: '🔔 No olvides', value: '¡Selecciona tus roles en #seleccionar-roles para recibir notificaciones personalizadas!', inline: false }
      )
      .setTimestamp()
      .setFooter({ text: 'Portfolio Web - Promoción de Proyectos' });

    await welcomeChannel.send({ embeds: [embed] });
    console.log('✅ Mensaje de bienvenida enviado');
  }

  // 4. Send roles message
  console.log('\n🎭 Enviando mensaje de roles...');

  const rolesChannel = guild.channels.cache.find(c => c.name === 'seleccionar-roles');
  if (rolesChannel) {
    const embed = new EmbedBuilder()
      .setColor('#EB459E')
      .setTitle('🎯 Selecciona tus Intereses')
      .setDescription('Haz clic en los botones para obtener roles personalizados. Estos roles te ayudarán a recibir contenido relevante.')
      .setTimestamp();

    const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
    const row = new ActionRowBuilder();

    config.roles.forEach(role => {
      row.addComponents(
        new ButtonBuilder()
          .setCustomId(`role_${role.name.toLowerCase()}`)
          .setLabel(role.name)
          .setStyle(ButtonStyle.Secondary)
          .setEmoji(role.emoji)
      );
    });

    await rolesChannel.send({ embeds: [embed], components: [row] });
    console.log('✅ Mensaje de roles enviado');
  }

  console.log('\n🎉 ¡Configuración completada!');
  console.log('Reinicia el bot para activar los comandos slash.');

  process.exit(0);
});

client.login(config.token);
