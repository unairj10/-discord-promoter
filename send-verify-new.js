require('dotenv').config({ path: '.env.new' });
const { Client, GatewayIntentBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once('ready', async () => {
  const guild = client.guilds.cache.get(process.env.GUILD_ID);
  if (!guild) { process.exit(1); }

  console.log('Canales:');
  guild.channels.cache.forEach(c => console.log(`  ${c.id} - ${c.name}`));

  const channel = guild.channels.cache.get('1540330625947406436');
  if (!channel) { console.log('Canal no encontrado'); process.exit(1); }

  const messages = await channel.messages.fetch({ limit: 50 });
  const botMessages = messages.filter(m => m.author.id === client.user.id);
  for (const [, msg] of botMessages) {
    await msg.delete();
  }

  const verifyEmbed = new EmbedBuilder()
    .setColor('#5865F2')
    .setTitle('🔐 Verificación Requerida')
    .setDescription(
      'Para acceder a todo el servidor, debes verificarte.\n\n' +
      '**¿Cómo verificarlo?**\n' +
      'Haz clic en el botón de abajo.\n\n' +
      'Una vez verificado podrás ver todos los canales y participar en la comunidad.'
    )
    .addFields(
      { name: '📋 Pasos', value: '1. Lee las reglas\n2. Haz clic en "Verificarme"\n3. Disfruta del servidor', inline: false }
    )
    .setFooter({ text: 'Bot programado por Unai' });

  const verifyButton = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId('verify_user')
      .setLabel('Verificarme')
      .setStyle(ButtonStyle.Success)
      .setEmoji('✅')
  );

  await channel.send({ embeds: [verifyEmbed], components: [verifyButton] });
  console.log('✅ Mensaje de verificación enviado en', channel.name);
  process.exit(0);
});

client.login(process.env.DISCORD_TOKEN);
