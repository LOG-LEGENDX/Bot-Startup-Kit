const bconfig = require('../config.json')

module.exports = async (client) => {

   // Bot Status , Activity and Login Text
   const ontext = ` 
    ______________________________
    Logged in as: ${client.user.tag}
    Servers: ${client.guilds.cache.size}
    Users: ${client.guilds.cache.reduce((total, guild) => total + guild.memberCount, 0)}
    ______________________________
    `
   console.log(ontext);

   client.user.setStatus("online")

   let status = `${bconfig.defaultprefix}help | ${bconfig.websitelink}`

   client.user.setActivity(status, { type: "PLAYING" })

};