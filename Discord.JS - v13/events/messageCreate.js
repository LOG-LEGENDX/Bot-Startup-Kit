const Discord = require('discord.js')
const predb = require('quick.db')
const bconfig = require("../config.json");

// Command Cooldown Map
const cooldowns = new Map();

module.exports = async (client, message) => {

   let logschannel = client.channels.cache.find(ch => ch.id === bconfig.botlogschannel);
   let prefix = predb.get(`guild_${message.guild.id}_prefix`) || bconfig.defaultprefix

   //Bot Args
   const args = message.content.slice(prefix.length).trim().split(/ +/);

   //Bot Answer Setup
   if (!message.content.startsWith(prefix) || message.author.bot || message.channel.type === "dm") return;

   const command =
      client.commands.get(args[0].toLowerCase()) ||
      client.commands.find(
         (cmd) => cmd.aliases && cmd.aliases.includes(args[0].toLowerCase())
      );

   if (!command) return;

   if (!cooldowns.has(command.name)) {
      cooldowns.set(command.name, new Discord.Collection());
   }

   const current_time = Date.now();
   const time_stamps = cooldowns.get(command.name);
   const cooldown_amount = (command.cooldown) * 1000;

   if (time_stamps.has(message.guild.id)) {
      const expiration_time = time_stamps.get(message.guild.id) + cooldown_amount;

      if (current_time < expiration_time) {
         const time_left = (expiration_time - current_time) / 1000;

         return message.reply("Someone On Your Server Already Used " + "**" + `${command.name}` + "**" + " Command , " + "Wait For " + "**" + `${time_left.toFixed(1)}` + "**" + " Seconds .");
      }
   }

   time_stamps.set(message.guild.id, current_time);

   setTimeout(() => time_stamps.delete(message.guild.id), cooldown_amount);

   try {

      command.execute(message, args, client);

   } catch (error) {

      logschannel.send("```" + error + "```")

   }

};