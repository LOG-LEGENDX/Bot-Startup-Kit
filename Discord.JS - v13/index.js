// Bot Required Modules
const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const bconfig = require("./config.json");
const glob = require('glob');

// Bot Command Handler
client.commands = new Collection();
const cmdFiles = glob.sync('./commands/**/*.js');
for (const file of cmdFiles) {
  const command = require(file);
  client.commands.set(command.name, command);
}

// Bot Event Handler
fs.readdir('./events', (err, files) => {
  if (err) return console.log(err);
  files.forEach((file) => {
    if (!file.endsWith('.js')) return;
    const event = require(`./events/${file}`);
    const eventName = file.split('.')[0];
    client.on(eventName, event.bind(null, client));
    delete require.cache[require.resolve(`./events/${file}`)];
  });
});

client.login(bconfig.bottoken);