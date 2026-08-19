require('dotenv').config();
const { Client, GatewayIntentBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const config = require('./config');

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once('ready', async () => {
  const guild = client.guilds.cache.get(config.guildId);
  if (!guild) { process.exit(1); }

  const channel = guild.channels.cache.get('1538760781053829280');
  if (!channel) { console.log('Canal no encontrado'); process.exit(1); }

  const embed = new EmbedBuilder()
    .setColor('#57F287')
    .setTitle('🏪 Landing para Negocio Local')
    .setDescription('Página de presentación para un pequeño comercio con todo lo necesario para atraer clientes.\n\n━━━━━━━━━━━━━━━━━━━━━')
    .addFields(
      { name: '📋 **Qué incluye**', value: '> Diseño moderno y profesional\n> Sección de servicios\n> Horarios y ubicación\n> Formulario de contacto\n> Enlaces a redes sociales\n> Optimizada para móvil', inline: false },
      { name: '🎯 **Ideal para**', value: '> Negocios locales como tiendas, restaurantes, peluquerías, gimnasios y cualquier comercio que quiera presencia online.', inline: false },
      { name: '💡 **Por qué es importante**', value: '> Una landing page profesional genera confianza y facilita que los clientes te encuentren y contacten.\n\n━━━━━━━━━━━━━━━━━━━━━\n\n🎫 **¿Más información?** Abre un ticket con `/ticket` y te atendemos.', inline: false }
    )
    .setFooter({ text: 'Bot programado por Unai' });

  await channel.send({ embeds: [embed] });
  console.log('✅ Landing actualizado');
  process.exit(0);
});

client.login(config.token);
