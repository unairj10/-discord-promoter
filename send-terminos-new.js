require('dotenv').config({ path: '.env.new' });
const { Client, GatewayIntentBits, EmbedBuilder, ChannelType, PermissionFlagsBits } = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once('ready', async () => {
  const guild = client.guilds.cache.get(process.env.GUILD_ID);
  if (!guild) { process.exit(1); }

  let channel = guild.channels.cache.find(c => c.name.includes('terminos'));
  if (!channel) {
    channel = await guild.channels.create({
      name: '📜-terminos-y-condiciones',
      type: ChannelType.GuildText,
      parent: guild.channels.cache.find(c => c.type === ChannelType.GuildCategory && c.name.includes('MARKETING'))?.id,
      permissionOverwrites: [
        { id: guild.id, allow: [PermissionFlagsBits.ViewChannel], deny: [PermissionFlagsBits.SendMessages] }
      ]
    });
  }

  const embed = new EmbedBuilder()
    .setColor('#5865F2')
    .setTitle('📜 Términos y Condiciones')
    .setDescription('Lee atentamente los términos y condiciones antes de contratar cualquier servicio.\n\n━━━━━━━━━━━━━━━━━━━━━')
    .addFields(
      { name: '🔹 **1. Servicios**', value: '> Los servicios ofrecidos incluyen diseño web, edición de vídeo y diseño gráfico/branding. Cada proyecto se presupuesta de forma individual según las necesidades del cliente.', inline: false },
      { name: '🔹 **2. Presupuesto**', value: '> El presupuesto inicial es orientativo y gratuito. El precio final se acuerda antes de iniciar el proyecto y se formaliza con un pago por adelantado del **50%**.', inline: false },
      { name: '💳 **Forma de pago: PayPal**', value: '> El pago se realiza antes de comenzar el proyecto (50%) y el resto al entregarlo.', inline: false },
      { name: '🔹 **3. Plazos de entrega**', value: '> Los plazos de entrega dependen de la complejidad del proyecto. Se acordarán antes de iniciar y se comunicarán por escrito.', inline: false },
      { name: '🔹 **4. Modificaciones**', value: '> Se incluyen hasta **2 rondas de cambios gratuitos**. Cambios adicionales se cobrarán aparte según su complejidad.', inline: false },
      { name: '🔹 **5. Propiedad intelectual**', value: '> Una vez pagado el proyecto completo, el cliente recibe todos los derechos de uso. El autor se reserva el derecho de mostrar el trabajo en su portfolio.', inline: false },
      { name: '🔹 **6. Cancelaciones**', value: '> Si el cliente cancela después de iniciar el proyecto, se cobrará el trabajo realizado hasta la fecha.', inline: false },
      { name: '🔹 **7. Soporte post-entrega**', value: '> Se ofrece soporte gratuito durante **15 días** después de la entrega para corrección de errores menores.', inline: false }
    )
    .setFooter({ text: 'Bot programado por Unai' });

  await channel.send({ embeds: [embed] });
  console.log('✅ Términos enviados');
  process.exit(0);
});

client.login(process.env.DISCORD_TOKEN);
