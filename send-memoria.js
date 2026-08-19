require('dotenv').config();
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const config = require('./config');

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once('ready', async () => {
  const guild = client.guilds.cache.get(config.guildId);
  if (!guild) { process.exit(1); }

  const channel = guild.channels.cache.get('1538760775991173170');
  if (!channel) { console.log('Canal no encontrado'); process.exit(1); }

  const embed = new EmbedBuilder()
    .setColor('#5865F2')
    .setTitle('🧠 Juego de Memoria')
    .setDescription('Juego interactivo de memoria para entrenar el cerebro.\n\n━━━━━━━━━━━━━━━━━━━━━')
    .addFields(
      { name: '📋 **Qué incluye**', value: '> Tablero con cartas boca abajo\n> Voltear dos cartas por turno\n> Si coinciden, desaparecen\n> Cronómetro para medir tiempo\n> Contador de intentos\n> Diferentes niveles de dificultad', inline: false },
      { name: '🎯 **Ideal para**', value: '> Niños, adultos y mayores que quieran entrenar su memoria de forma divertida.', inline: false },
      { name: '💡 **Por qué es importante**', value: '> Los juegos de memoria mejoran la concentración, la atención y la capacidad de recordar. ¡Además son adictivos!\n\n━━━━━━━━━━━━━━━━━━━━━\n\n🎫 **¿Más información?** Abre un ticket con `/ticket` y te atendemos.', inline: false }
    )
    .setFooter({ text: 'Bot programado por Unai' });

  await channel.send({ embeds: [embed] });
  console.log('✅ Memoria actualizado');
  process.exit(0);
});

client.login(config.token);
