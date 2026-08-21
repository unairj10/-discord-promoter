require('dotenv').config({ path: '.env.new' });
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once('ready', async () => {
  const guild = client.guilds.cache.get(process.env.GUILD_ID);
  if (!guild) { process.exit(1); }

  const channel = guild.channels.cache.get('1540330627616997387');
  if (!channel) { console.log('Canal no encontrado'); process.exit(1); }

  const embed = new EmbedBuilder()
    .setColor('#ED4245')
    .setTitle('📜 Reglas del Servidor')
    .setDescription('Por favor, lee y respeta las siguientes normas para garantizar un ambiente cordial y profesional.\n\n━━━━━━━━━━━━━━━━━━━━━')
    .addFields(
      { name: '🔹 **Artículo 1 — Conducta**', value: '> Se espera un trato respetuoso entre todos los miembros. Queda prohibido el acoso, las amenazas, los insultos y cualquier forma de discriminación.', inline: false },
      { name: '🔹 **Artículo 2 — Contenido**', value: '> No se permite la publicación de contenido ofensivo, ilegal, sexual o que atente contra la dignidad de terceros.', inline: false },
      { name: '🔹 **Artículo 3 — Publicidad**', value: '> Queda prohibido el envío de publicidad no solicitada, enlaces a otros servidores o cualquier actividad de spam.', inline: false },
      { name: '🔹 **Artículo 4 — Uso de canales**', value: '> Cada canal tiene un propósito específico. Utiliza cada canal según su función indicada.', inline: false },
      { name: '🔹 **Artículo 5 — Idioma**', value: '> Se recomienda el uso del español como lengua principal de comunicación dentro del servidor.', inline: false },
      { name: '🔹 **Artículo 6 — Tickets**', value: '> Los tickets están diseñados para consultas privadas. Se ruega no abrir tickets sin un motivo justificado.', inline: false },
      { name: '🔹 **Artículo 7 — Autoridad**', value: '> Las decisiones del equipo de moderación son finales. Cualquier queja puede canalizarse a través de un ticket.', inline: false },
      { name: '🔹 **Artículo 8 — Cuentas**', value: '> No está permitido el uso de cuentas alternativas para eludir sanciones o normas del servidor.', inline: false },
      { name: '🔹 **Artículo 9 — Privacidad**', value: '> Está prohibido compartir información personal de otros miembros sin su consentimiento expreso.', inline: false },
      { name: '🔹 **Artículo 10 — Criterio general**', value: '> Se aplicará el sentido común en todo momento. Ante cualquier duda, consulte al equipo de moderación.', inline: false }
    )
    .addFields(
      { name: '━━━━━━━━━━━━━━━━━━━━━', value: '**⚠️ El incumplimiento de estas normas podrá dar lugar a amonestaciones, silenciamientos, expulsiones o baneos temporales o permanentes.**', inline: false }
    )
    .setFooter({ text: 'Bot programado por Unai' });

  await channel.send({ embeds: [embed] });
  console.log('✅ Reglas formales enviadas');
  process.exit(0);
});

client.login(process.env.DISCORD_TOKEN);
