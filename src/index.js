// src/index.js
const tmi = require('tmi.js');
const { CONFIG } = require('./config.js');
const { initCooldowns } = require('./utils/cooldowns.js');
const { buildRouter } = require('./router.js');
const commands = require('./commands.js');

initCooldowns(CONFIG.cooldowns.defaults);

const client = new tmi.Client({
  options: { debug: CONFIG.debug },
  connection: { reconnect: true, secure: true },
  identity: { username: CONFIG.botName, password: CONFIG.oauth },
  channels: [CONFIG.channel]
});

client.connect().catch(err => console.error('Connection error:', err));

client.on('connected', () => {
  console.log(`✅ Connected to #${CONFIG.channel} as ${CONFIG.botName}`);
});

// one clean line to handle everything:
client.on('message', buildRouter(CONFIG, commands)(client));
