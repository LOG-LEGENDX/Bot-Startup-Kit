// Bot Required Modules
const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const bconfig = require("./config.json");
const glob = require('glob');

// Bot Command Handler
const commands = [];
client.commands = new Collection();
const cmdFiles = glob.sync('./commands/**/*.js');
for (const file of cmdFiles) {
  const command = require(file);
  commands.push(command.data.toJSON());
  client.commands.set(command.data.name, command);
}

// Bot Events Handler
fs.readdir('./events', (err, files) => {
  if (err) return console.log(err);
  files.forEach((file) => {
    if (!file.endsWith('.js')) return;
    const event = require(`./events/${file}`);
    client.on(event.name, (...args) => event.execute(...args, commands));
  });
});

client.login(bconfig.bottoken);