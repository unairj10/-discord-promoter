require('dotenv').config();
const { Client, GatewayIntentBits, EmbedBuilder, ChannelType, PermissionFlagsBits } = require('discord.js');
const config = require('./config');

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once('ready', async () => {
  const guild = client.guilds.cache.get(config.guildId);
  if (!guild) { process.exit(1); }

  let channel = guild.channels.cache.find(c => c.name === 'guia-staff');
  if (!channel) {
    channel = await guild.channels.create({
      name: 'guia-staff',
      type: ChannelType.GuildText,
      parent: guild.channels.cache.find(c => c.type === ChannelType.GuildCategory && c.name.includes('ADMINISTRACIÓN'))?.id,
      permissionOverwrites: [
        { id: guild.id, deny: [PermissionFlagsBits.ViewChannel] },
        { id: guild.roles.cache.find(r => r.name.includes('Owner'))?.id, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages] },
        { id: guild.roles.cache.find(r => r.name.includes('Admin'))?.id, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages] },
        { id: guild.roles.cache.find(r => r.name.includes('Moderador'))?.id, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages] },
        { id: guild.roles.cache.find(r => r.name.includes('Staff'))?.id, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages] }
      ]
    });
  }

  // 1. Bienvenida
  const e1 = new EmbedBuilder()
    .setColor('#5865F2')
    .setTitle('📜 Guía del Staff')
    .setDescription('Todo lo que necesitas saber para gestionar el servidor.\n\n━━━━━━━━━━━━━━━━━━━━━')
    .addFields(
      { name: '🔹 **1. Verificación**', value: '> Cuando un usuario nuevo entre, debe dar clic en el botón **"Verificar"** en #bienvenida para obtener el rol **Miembro** y acceder a los canales.\n\n> Si no se verifica, solo ve #bienvenida.', inline: false },
      { name: '🔹 **2. Tickets**', value: '> Los usuarios abren tickets desde #🎫-abrir-ticket con `/ticket` o desde el menú desplegable.\n\n> **Tipos de tickets:**\n> 🛠️ Soporte Técnico\n> 💰 Compras (abre formulario)\n> 🤝 Colaboración\n> 📝 Feedback\n> 🐛 Reportar Bug\n> ❓ Otro\n\n> Para **cerrar** un ticket, haz clic en el botón 🔒 dentro del canal del ticket.', inline: false },
      { name: '🔹 **3. Transcripciones**', value: '> Al cerrar un ticket, se genera una transcripción automática en #transcripts para que el equipo la revise.', inline: false }
    )
    .setFooter({ text: 'Bot programado por Unai' });

  await channel.send({ embeds: [e1] });

  // 2. Comandos
  const e2 = new EmbedBuilder()
    .setColor('#57F287')
    .setTitle('⚙️ Comandos Disponibles')
    .setDescription('━━━━━━━━━━━━━━━━━━━━━')
    .addFields(
      { name: '💼 `/portfolio`', value: '> Muestra el portfolio completo de proyectos.', inline: false },
      { name: '🔍 `/proyecto <nombre>`', value: '> Muestra info de un proyecto específico.', inline: false },
      { name: '📋 `/proyectos`', value: '> Lista todos los proyectos disponibles.', inline: false },
      { name: '🎭 `/roles`', value: '> Panel para elegir roles de interés.', inline: false },
      { name: '🎫 `/ticket`', value: '> Panel para abrir un ticket de soporte.', inline: false },
      { name: '💡 `/suggest <texto>`', value: '> Enviar una sugerencia con votación.', inline: false }
    )
    .setFooter({ text: 'Bot programado por Unai' });

  await channel.send({ embeds: [e2] });

  // 3. Canales
  const e3 = new EmbedBuilder()
    .setColor('#FEE75C')
    .setTitle('📂 Estructura del Servidor')
    .setDescription('━━━━━━━━━━━━━━━━━━━━━')
    .addFields(
      { name: '📋 **INFORMACIÓN**', value: '> 📜 Reglas\n> 📢 Anuncios\n> 🔔 Notificaciones', inline: false },
      { name: '💼 **PORTFOLIO**', value: '> 💼 Portfolio Web\n> 🎨 Branding\n> 📸 Galería Fotográfica', inline: false },
      { name: '🛠️ **HERRAMIENTAS**', value: '> 👥 Asistente de Comunidad\n> 📊 Calculadora de Presupuestos', inline: false },
      { name: '📝 **CONTENIDO**', value: '> 📝 Blog Personal\n> 🍳 Web de Recetas\n> 🧠 Juego de Memoria\n> 📱 App de Tareas', inline: false },
      { name: '📈 **MARKETING**', value: '> 🏪 Landing Negocio\n> 🎬 Vídeos de Marca\n> 💰 Precios\n> 🖼️ Imágenes Promocionales\n> 📜 Términos y Condiciones', inline: false },
      { name: '👥 **COMUNIDAD**', value: '> 💬 Chat General\n> 💡 Sugerencias\n> 🗳️ Votaciones', inline: false },
      { name: '🎭 **ROLES**', value: '> Panel para elegir roles de interés.', inline: false },
      { name: '🎫 **TICKETS**', value: '> 🎫 Abrir Ticket', inline: false }
    )
    .setFooter({ text: 'Bot programado por Unai' });

  await channel.send({ embeds: [e3] });

  // 4. Roles
  const e4 = new EmbedBuilder()
    .setColor('#EB459E')
    .setTitle('🎭 Roles del Staff')
    .setDescription('━━━━━━━━━━━━━━━━━━━━━')
    .addFields(
      { name: '**Roles de administración:**', value: '> 👑 Owner — Dueño del servidor\n> 🔧 Admin — Administrador\n> 🛡️ Moderador — Moderador\n> ⭐ Staff — Equipo de soporte\n> 📋 Gestor de Comunidad\n> 📣 Community Manager\n> 🎨 Diseñador\n> 💻 Desarrollador\n> 🎬 Editor\n> 🤝 Colaborador', inline: false },
      { name: '**Roles de interés (usuarios):**', value: '> 💻 Desarrollo\n> 🎨 Diseño\n> 📈 Marketing\n> ✍️ Contenido\n> 🔔 Notificaciones', inline: false },
      { name: '**Regla importante:**', value: '> El rol **Colaborador** solo puede escribir en la categoría **COMUNIDAD**.', inline: false }
    )
    .setFooter({ text: 'Bot programado por Unai' });

  await channel.send({ embeds: [e4] });

  // 5. Consejos
  const e5 = new EmbedBuilder()
    .setColor('#ED4245')
    .setTitle('⚠️ Consejos Importantes')
    .setDescription('━━━━━━━━━━━━━━━━━━━━━')
    .addFields(
      { name: '🔹 **Al atender un ticket:**', value: '> 1. Lee la info del usuario\n> 2. Responde con paciencia\n> 3. Si es compra, confirma precio y plazo\n> 4. Cierra el ticket cuando termine', inline: false },
      { name: '🔹 **Moderación:**', value: '> • Advertencia primero\n> • Mute si insiste\n> • Kick si continua\n> • Ban como último recurso\n> • Siempre documenta las acciones', inline: false },
      { name: '🔹 **Soporte post-entrega:**', value: '> • 15 días de soporte gratuito\n> • Solo errores menores\n> • Cambios extras se cobran', inline: false },
      { name: '🔹 **Pagos:**', value: '> • 50% por adelantado\n> • 50% al entregar\n> • Método: PayPal', inline: false }
    )
    .setFooter({ text: 'Bot programado por Unai' });

  await channel.send({ embeds: [e5] });

  console.log('✅ Guía del staff creada');
  process.exit(0);
});

client.login(config.token);
