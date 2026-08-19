require('dotenv').config();
const { Client, GatewayIntentBits, EmbedBuilder, ChannelType, PermissionFlagsBits } = require('discord.js');
const config = require('./config');

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once('ready', async () => {
  const guild = client.guilds.cache.get(config.guildId);
  if (!guild) { process.exit(1); }

  // Create channel
  let channel = guild.channels.cache.find(c => c.name === 'terminos-y-condiciones');
  if (!channel) {
    channel = await guild.channels.create({
      name: 'terminos-y-condiciones',
      type: ChannelType.GuildText,
      parent: guild.channels.cache.find(c => c.type === ChannelType.GuildCategory && c.name === 'MARKETING')?.id,
      permissionOverwrites: [
        { id: guild.id, allow: [PermissionFlagsBits.ViewChannel], deny: [PermissionFlagsBits.SendMessages] }
      ]
    });
  }

  const embed = new EmbedBuilder()
    .setColor('#5865F2')
    .setTitle('📜 Términos y Condiciones')
    .setDescription('Lee atentamente los términos y condiciones antes de contratar cualquier servicio.')
    .addFields(
      { name: '━━━━━━━━━━━━━━━━━━━━━', value: '**🔹 1. Servicios**\nLos servicios ofrecidos incluyen diseño web, edición de vídeo y diseño gráfico/branding. Cada proyecto se presupuesta de forma individual según las necesidades del cliente.', inline: false },
      { name: '━━━━━━━━━━━━━━━━━━━━━', value: '**🔹 2. Presupuesto**\nEl presupuesto inicial es orientativo y gratuito. El precio final se acuerda antes de iniciar el proyecto y se formaliza con un pago por adelantado del **50%**.', inline: false },
      { name: '━━━━━━━━━━━━━━━━━━━━━', value: '**💳 Forma de pago: PayPal**\nEl pago se realiza antes de comenzar el proyecto (50%) y el resto al entregarlo.', inline: false },
      { name: '━━━━━━━━━━━━━━━━━━━━━', value: '**🔹 3. Plazos de entrega**\nLos plazos de entrega dependen de la complejidad del proyecto. Se acordarán antes de iniciar y se comunicarán por escrito.', inline: false },
      { name: '━━━━━━━━━━━━━━━━━━━━━', value: '**🔹 4. Modificaciones**\nSe incluyen hasta **2 rondas de cambios gratuitos**. Cambios adicionales se cobrarán aparte según su complejidad.', inline: false },
      { name: '━━━━━━━━━━━━━━━━━━━━━', value: '**🔹 5. Propiedad intelectual**\nUna vez pagado el proyecto completo, el cliente recibe todos los derechos de uso. El autor se reserva el derecho de mostrar el trabajo en su portfolio.', inline: false },
      { name: '━━━━━━━━━━━━━━━━━━━━━', value: '**🔹 6. Cancelaciones**\nSi el cliente cancela después de iniciar el proyecto, se cobrará el trabajo realizado hasta la fecha.', inline: false },
      { name: '━━━━━━━━━━━━━━━━━━━━━', value: '**🔹 7. Soporte post-entrega**\nSe ofrece soporte gratuito durante **15 días** después de la entrega para corrección de errores menores.', inline: false }
    )
    .setFooter({ text: 'Bot programado por Unai' });

  await channel.send({ embeds: [embed] });
  console.log('Canal de términos y condiciones creado');
  process.exit(0);
});

client.login(config.token);
