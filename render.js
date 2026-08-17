const { spawn } = require('child_process');
const http = require('http');

// Keep-alive server
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Bot is running!');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🌐 Server running on port ${PORT}`);
});

// Start bot
const bot = spawn('node', ['index.js'], { stdio: 'inherit' });

bot.on('close', (code) => {
  console.log(`Bot exited with code ${code}`);
  process.exit(code);
});

process.on('SIGTERM', () => {
  bot.kill();
  process.exit(0);
});
