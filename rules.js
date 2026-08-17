require('dotenv').config();
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const config = require('./config');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
});

client.once('ready', async () => {
  const guild = client.guilds.cache.get(config.guildId);
  if (!guild) { process.exit(1); }

  const channel = guild.channels.cache.get('1538760756533657663');
  if (!channel) { process.exit(1); }

  const embed = new EmbedBuilder()
    .setColor('#1a1a2e')
    .setTitle('Normativa Oficial del Servidor')
    .setDescription('El presente documento establece las normas de convivencia y uso de este servidor. Todos los miembros están obligados a leerlas y cumplirlas. El desconocimiento de las mismas no exime de su responsabilidad.')
    .addFields(
      { name: '\u200b', value: '**ARTÍCULO I — CONDUCTA Y TRATO**', inline: false },
      { name: 'Art. 1.1', value: 'Se prohíbe expresamente cualquier forma de acoso, discriminación, insulto, amenaza o trato denigrante hacia cualquier miembro del servidor.', inline: false },
      { name: 'Art. 1.2', value: 'Se exigirá un trato respetuoso y profesional en todas las interacciones, independientemente del rango o rol del usuario.', inline: false },

      { name: '\u200b', value: '**ARTÍCULO II — CONTENIDO**', inline: false },
      { name: 'Art. 2.1', value: 'Queda estrictamente prohibido publicar contenido que incite al odio, la violencia, la discriminación o cualquier actividad ilícita.', inline: false },
      { name: 'Art. 2.2', value: 'No se permite la publicación de contenido sexual, gore, gráfico o de naturaleza NSFW bajo ninguna circunstancia.', inline: false },

      { name: '\u200b', value: '**ARTÍCULO III — CANALES Y ORDEN**', inline: false },
      { name: 'Art. 3.1', value: 'Cada publicación deberá dirigirse al canal correspondiente. El uso inadecuado de canales será sancionado.', inline: false },
      { name: 'Art. 3.2', value: 'Queda prohibido el spam, flood, menciones masivas y cualquier forma de publicidad no autorizada.', inline: false },

      { name: '\u200b', value: '**ARTÍCULO IV — PROPIEDAD INTELECTUAL**', inline: false },
      { name: 'Art. 4.1', value: 'Cada autor es responsable de sus publicaciones. El servidor no se hace responsable por el contenido compartido por los miembros.', inline: false },
      { name: 'Art. 4.2', value: 'Está prohibido apropiarse del trabajo ajeno sin atribución adecuada.', inline: false },

      { name: '\u200b', value: '**ARTÍCULO V — SOPORTE Y COMUNICACIÓN**', inline: false },
      { name: 'Art. 5.1', value: 'Para consultas, solicitudes o incidencias, utilice el sistema de tickets mediante el comando `/ticket`.', inline: false },
      { name: 'Art. 5.2', value: 'Las decisiones del equipo de moderación son inapelables. Cualquier reclamación deberá canalizarse a través de los mecanismos oficiales.', inline: false },

      { name: '\u200b', value: '**ARTÍCULO VI — SANCIONES**', inline: false },
      { name: 'Art. 6.1', value: 'Las infracciones serán sancionadas según su gravedad: advertencia, silencio temporal, expulsión o baneo permanente.', inline: false },
      { name: 'Art. 6.2', value: 'El uso de cuentas alternativas para evadir sanciones resultará en el baneo permanente de ambas cuentas.', inline: false },

      { name: '\u200b', value: '**ARTÍCULO VII — DISPOSICIONES GENERALES**', inline: false },
      { name: 'Art. 7.1', value: 'La permanencia en este servidor implica la aceptación íntegra de estas normas.', inline: false },
      { name: 'Art. 7.2', value: 'El equipo de administración se reserva el derecho de modificar estas normas en cualquier momento, notificando a los miembros.', inline: false }
    )
    .setTimestamp()
    .setFooter({ text: '© 2026 — Todos los derechos reservados' });

  await channel.send({ embeds: [embed] });
  console.log('✅ Reglas publicadas');
  process.exit(0);
});

client.login(config.token);
