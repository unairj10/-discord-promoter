require('dotenv').config({ path: '.env.new' });
const { execSync } = require('child_process');

console.log('Configurando nuevo servidor...');

const scripts = [
  'setup.js',
  'setup-admin.js',
  'setup-verify.js',
  'setup-transcripts.js',
  'send-all.js',
  'send-ticket-panel.js',
  'send-terminos.js',
  'send-staff-guide.js',
  'change-nickname.js'
];

for (const script of scripts) {
  try {
    console.log(`\nEjecutando ${script}...`);
    execSync(`node ${script}`, { stdio: 'inherit' });
  } catch (error) {
    console.log(`Error en ${script}: ${error.message}`);
  }
}

console.log('\nConfiguración del nuevo servidor completada');
