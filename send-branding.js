require('dotenv').config();
const { Client, GatewayIntentBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const config = require('./config');

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once('ready', async () => {
  const guild = client.guilds.cache.get(config.guildId);
  if (!guild) { process.exit(1); }

  const channel = guild.channels.cache.get('1538760764251181076');
  if (!channel) { console.log('Canal no encontrado'); process.exit(1); }

  const embed = new EmbedBuilder()
    .setColor('#5865F2')
    .setTitle('🎨 Branding de Marca')
    .setDescription('Identidad visual y branding profesional para tu negocio o proyecto.\n\n━━━━━━━━━━━━━━━━━━━━━')
    .addFields(
      { name: '📋 **Qué incluye**', value: '> Diseño de logo y logotipos\n> Paleta de colores corporativa\n> Selección tipográfica\n> Manual de marca completo\n> Aplicaciones en redes sociales\n> Plantillas de diseño', inline: false },
      { name: '🎯 **Ideal para**', value: '> Emprendedores, empresas y profesionales que necesitan una identidad visual coherente y profesional.', inline: false },
      { name: '💡 **Por qué es importante**', value: '> Un buen branding genera confianza, profesionalismo y reconocimiento. Tu marca es la primera impresión que dejas.\n\n━━━━━━━━━━━━━━━━━━━━━\n\n🎫 **¿Más información?** Abre un ticket con `/ticket` y te atendemos.', inline: false }
    )
    .setFooter({ text: 'Bot programado por Unai' });

  await channel.send({ embeds: [embed] });
  console.log('✅ Branding actualizado');
  process.exit(0);
});

client.login(config.token);
