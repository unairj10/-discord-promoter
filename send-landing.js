require('dotenv').config();
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
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
    .setTitle('Landing para Negocio Local')
    .setDescription('Pagina de presentacion para un pequeno comercio con todo lo necesario para atraer clientes.')
    .addFields(
      { name: 'Que incluye', value: '• Diseno moderno y profesional\n• Seccion de servicios\n• Horarios y ubicacion\n• Formulario de contacto\n• Enlaces a redes sociales\n• Optimizada para movil', inline: false },
      { name: 'Ideal para', value: 'Negocios locales como tiendas, restaurantes, peluquerias, gimnasios y cualquier comercio que quiera presencia online.', inline: false },
      { name: 'Por que es importante', value: 'Una landing page profesional genera confianza y facilita que los clientes te encuentren y contacten.', inline: false }
    )
    .setTimestamp()
    .setFooter({ text: 'Landing para Negocio Local' });

  await channel.send({ embeds: [embed] });
  console.log('Publicado en canal de landing');
  process.exit(0);
});

client.login(config.token);
