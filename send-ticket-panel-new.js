require('dotenv').config({ path: '.env.new' });
const { Client, GatewayIntentBits, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, ChannelType, PermissionFlagsBits } = require('discord.js');

const ticketTypes = [
  { id: 'soporte', name: 'Soporte Tecnico', emoji: '🛠️', description: 'Problemas tecnicos con mis servicios', color: '#FF4500' },
  { id: 'compras', name: 'Compras', emoji: '💰', description: 'Quiero comprar un servicio', color: '#FFD700' },
  { id: 'colaboracion', name: 'Colaboracion', emoji: '🤝', description: 'Propuestas de trabajo conjunto', color: '#32CD32' },
  { id: 'feedback', name: 'Feedback', emoji: '📝', description: 'Sugerencias y opiniones', color: '#1E90FF' },
  { id: 'bug', name: 'Reportar Bug', emoji: '🐛', description: 'Reportar errores', color: '#FF69B4' },
  { id: 'otro', name: 'Otro', emoji: '❓', description: 'Cualquier otra consulta', color: '#9370DB' }
];

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once('ready', async () => {
  const guild = client.guilds.cache.get(process.env.GUILD_ID);
  if (!guild) { console.log('Servidor no encontrado'); process.exit(1); }

  // Find or create ticket channel
  let channel = guild.channels.cache.find(c => c.name.includes('abrir-ticket'));
  if (!channel) {
    channel = await guild.channels.create({
      name: '🎫-abrir-ticket',
      type: ChannelType.GuildText,
      parent: guild.channels.cache.find(c => c.type === ChannelType.GuildCategory && c.name.includes('TICKETS'))?.id,
      permissionOverwrites: [
        { id: guild.id, allow: [PermissionFlagsBits.ViewChannel], deny: [PermissionFlagsBits.SendMessages] }
      ]
    });
  }

  const embed = new EmbedBuilder()
    .setColor('#5865F2')
    .setTitle('🎫 Sistema de Tickets')
    .setDescription('¿Necesitas ayuda? Selecciona el tipo de ticket que necesitas en el menú de abajo.\n\n━━━━━━━━━━━━━━━━━━━━━')
    .addFields(
      { name: '\u200b', value: '🛠️ **Soporte Técnico** — Problemas técnicos con mis servicios\n\n💰 **Compras** — Quiero comprar un servicio\n\n🤝 **Colaboración** — Propuestas de trabajo conjunto\n\n📝 **Feedback** — Sugerencias y opiniones\n\n🐛 **Reportar Bug** — Reportar errores\n\n❓ **Otro** — Cualquier otra consulta', inline: false }
    )
    .addFields(
      { name: '━━━━━━━━━━━━━━━━━━━━━', value: '**Abre un ticket y te atenderemos lo antes posible.**', inline: false }
    )
    .setFooter({ text: 'Bot programado por Unai' });

  const selectMenu = new StringSelectMenuBuilder()
    .setCustomId('ticket_select')
    .setPlaceholder('Selecciona tipo de ticket...')
    .addOptions(ticketTypes.map(t => ({ label: t.name, value: t.id, description: t.description.substring(0, 100), emoji: t.emoji })));

  const row = new ActionRowBuilder().addComponents(selectMenu);

  await channel.send({ embeds: [embed], components: [row] });
  console.log('✅ Panel de tickets enviado');
  process.exit(0);
});

client.login(process.env.DISCORD_TOKEN);
