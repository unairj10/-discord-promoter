require('dotenv').config({ path: '.env.new' });
const { Client, GatewayIntentBits, EmbedBuilder, ChannelType, PermissionFlagsBits } = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once('ready', async () => {
  const guild = client.guilds.cache.get(process.env.GUILD_ID);
  if (!guild) { process.exit(1); }

  // Create channel in MARKETING category
  let channel = guild.channels.cache.find(c => c.name.includes('automatizaciones'));
  if (!channel) {
    channel = await guild.channels.create({
      name: '🤖-automatizaciones',
      type: ChannelType.GuildText,
      parent: guild.channels.cache.find(c => c.type === ChannelType.GuildCategory && c.name.includes('MARKETING'))?.id,
      permissionOverwrites: [
        { id: guild.id, allow: [PermissionFlagsBits.ViewChannel], deny: [PermissionFlagsBits.SendMessages] }
      ]
    });
  }

  const embed = new EmbedBuilder()
    .setColor('#5865F2')
    .setTitle('🤖 AUTOMATIZACIONES DIGITALES')
    .setDescription('Ofrecemos soluciones de automatización y desarrollo digital para empresas y negocios que buscan optimizar sus procesos, ahorrar tiempo y escalar sin aumentar la carga de trabajo.\n\n━━━━━━━━━━━━━━━━━━━━━')
    .addFields(
      { name: '🤖 **AUTOMATIZACIONES PARA EMPRESAS**', value: '▸ Automatización de tareas repetitivas\n▸ Procesos internos automáticos\n▸ Flujos entre plataformas\n▸ Integraciones con APIs y Webhooks\n▸ Procesamiento automático de datos', inline: false },
      { name: '💬 **WHATSAPP BUSINESS**', value: '▸ Respuestas automáticas\n▸ Mensajes a clientes\n▸ Confirmaciones y recordatorios\n▸ Gestión de consultas frecuentes\n▸ Notificaciones de pedidos y reservas\n▸ Seguimiento automático', inline: false },
      { name: '📧 **EMAILS AUTOMÁTICOS**', value: '▸ Emails transaccionales y de bienvenida\n▸ Confirmaciones y recordatorios\n▸ Seguimiento de clientes\n▸ Campañas y secuencias automatizadas', inline: false },
      { name: '📅 **RESERVAS Y CITAS**', value: '▸ Gestión automática de reservas\n▸ Control de disponibilidad\n▸ Confirmaciones y recordatorios\n▸ Integración con calendarios', inline: false },
      { name: '💰 **FINANCE MANAGER**', value: '▸ Creación de facturas y presupuestos\n▸ Registro de ingresos y gastos\n▸ Gestión de clientes\n▸ Control de facturación\n▸ Informes financieros', inline: false },
      { name: '🎮 **FIVEM & DISCORD**', value: '▸ Bots personalizados\n▸ Sistemas de tickets y soporte\n▸ Whitelist y gestión de roles\n▸ Sistemas de economía y tiendas\n▸ Integraciones FiveM y Discord', inline: false },
      { name: '🤖 **BOTS PERSONALIZADOS**', value: '▸ Discord, Telegram, WhatsApp Business\n▸ Atención automática\n▸ Gestión de pedidos y soporte\n▸ Bots internos para empresas', inline: false },
      { name: '🔗 **INTEGRACIONES**', value: '▸ APIs, Webhooks, Google Sheets\n▸ Google Calendar, Discord, Email\n▸ CRMs, bases de datos\n▸ Plataformas de pago', inline: false }
    )
    .setFooter({ text: 'Bot programado por Unai' });

  const embed2 = new EmbedBuilder()
    .setColor('#57F287')
    .setTitle('🚀 ¿QUÉ PODEMOS AUTOMATIZAR?')
    .setDescription('"¿Sigues haciendo manualmente lo que una automatización puede hacer por ti?"\n\nAhorra tiempo, reduce errores, mejora la organización y haz que tus herramientas trabajen solas.\n\n━━━━━━━━━━━━━━━━━━━━━\n\n⚙️ **NUESTRO PROCESO**\n\n01 — ANALIZAMOS → Entendemos tu negocio\n02 — DISEÑAMOS → Creamos la solución\n03 — DESARROLLAMOS → Integramos la automatización\n04 — PROBAMOS → Comprobamos que funcione\n05 — LANZAMOS → Ponemos en marcha y damos soporte\n\n━━━━━━━━━━━━━━━━━━━━━\n\n🛠️ **SOLUCIONES A MEDIDA**\n\nCada automatización se adapta a tu negocio, herramientas y necesidades específicas.\n\n━━━━━━━━━━━━━━━━━━━━━\n\n📩 **¿TIENES UNA IDEA O PROCESO QUE QUIERES AUTOMATIZAR?**\n\n🎫 Abre un ticket y cuéntanos qué necesitas.\n▸ Tú explicas → Nosotros creamos → La automatización trabaja\n\n📌 **Presupuesto personalizado — Sin compromiso**')
    .setFooter({ text: 'Bot programado por Unai' });

  await channel.send({ embeds: [embed, embed2] });
  console.log('✅ Canal de automatizaciones creado y publicado');
  process.exit(0);
});

client.login(process.env.DISCORD_TOKEN);
