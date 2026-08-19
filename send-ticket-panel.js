require('dotenv').config();
const { Client, GatewayIntentBits, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
const config = require('./config');

const ticketTypes = [
  { id: 'soporte', name: 'Soporte Tecnico', emoji: '🛠️', description: 'Problemas tecnicos con mis servicios', color: '#FF4500' },
  { id: 'compras', name: 'Compras', emoji: '💰', description: 'Quiero comprar un servicio', color: '#FFD700' },
  { id: 'colaboracion', name: 'Colaboracion', emoji: '🤝', description: 'Propuestas de trabajo conjunto', color: '#32CD32' },
  { id: 'feedback', name: 'Feedback', emoji: '📝', description: 'Sugerencias y opiniones', color: '#1E90FF' },
  { id: 'bug', name: 'Reportar Bug', emoji: '🐛', description: 'Reportar errores', color: '#FF69B4' },
  { id: 'otro', name: 'Otro', emoji: '❓', description: 'Cualquier otra consulta', color: '#9370DB' }
];

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

client.once('ready', async () => {
  const guild = client.guilds.cache.get(config.guildId);
  if (!guild) { process.exit(1); }

  const channel = guild.channels.cache.get('1538923207166271549');
  if (!channel) { console.log('Canal no encontrado'); process.exit(1); }

  // Delete old messages from bot
  const messages = await channel.messages.fetch({ limit: 50 });
  const botMessages = messages.filter(m => m.author.id === client.user.id);
  for (const [, msg] of botMessages) {
    await msg.delete();
    console.log('🗑️ Mensaje viejo eliminado');
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

client.login(config.token);
