const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const bconfig = require('../config.json')
const rest = new REST({
   version: "9",
}).setToken(bconfig.bottoken);

module.exports = {
   name: "ready",
   async execute(client, commands) {

      // Bot Status , Activity and Login Text
      const ontext = ` 
   ______________________________
   Logged in as: ${client.user.tag}
   Servers: ${client.guilds.cache.size}
   Users: ${client.guilds.cache.reduce((total, guild) => total + guild.memberCount, 0)}
   ______________________________
   `
      console.log(ontext);

      (async () => {

         let status = `/help | ${bconfig.websitelink}`

         client.user.setActivity(status, { type: "PLAYING" })

         try {

            await rest.put(Routes.applicationCommands(client.user.id), {

               body: commands,

            });

            console.log("Successfully registered commands globally.");

         } catch (err) {

            if (err) console.error(err);
         }
      })();
   },
};