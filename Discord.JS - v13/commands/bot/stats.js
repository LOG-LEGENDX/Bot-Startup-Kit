const Discord = require('discord.js');
const bconfig = require("../../config.json");

module.exports = {
    name: 'stats',
    cooldown: 5,
    execute(message, _args, client) {
        
        // bot-perm
        if (!message.guild.me.permissions.has('EMBED_LINKS')) return message.channel.send('Please Give Me **EMBED_LINKS** permission in this channel .')

        let botservers = client.guilds.cache.size;
        let botusers = client.guilds.cache.reduce((total, guild) => total + guild.memberCount, 0);
        let botchannels = client.channels.cache.size;
        let botemojis = client.emojis.cache.size;
        let botping = Math.round(client.ws.ping);
        let totalSeconds = (client.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400;
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let memusage = Math.round((process.memoryUsage().heapUsed / 1024 / 1024) * 100) / 100
        let botcreate = client.user.createdAt;
        let now = Date.now() - botcreate;
        let ago = Math.floor(now / bconfig.botago)

        let embedBotstats = new Discord.MessageEmbed();
        embedBotstats.setTitle(client.user.username)
        embedBotstats.setURL(bconfig.websitelink)
        embedBotstats.setDescription("My Stats Panel Here :-")
        embedBotstats.addFields([
            {
                "name": "Name",
                "value": "```" + `${client.user.tag}` + "```",
                "inline": true
            },
            {
                "name": "Id",
                "value": "```" + `${client.user.id}` + "```",
                "inline": true
            },
            {
                "name": "Default-Prefix",
                "value": "```" + `${bconfig.defaultprefix}` + "```",
                "inline": true
            },
            {
                "name": "Servers",
                "value": "```" + `${botservers}` + "```",
                "inline": true
            },
            {
                "name": "Users",
                "value": "```" + `${botusers}` + "```",
                "inline": true
            },
            {
                "name": "Channels",
                "value": "```" + `${botchannels}` + "```",
                "inline": true
            },
            {
                "name": "Emojis",
                "value": "```" + `${botemojis}` + "```",
                "inline": true
            },
            {
                "name": "Ping",
                "value": "```" + `${botping} ms` + "```",
                "inline": true
            },
            {
                "name": "Memory Usage",
                "value": "```" + `${memusage} mb` + "```",
                "inline": true
            },
            {
                "name": "Uptime Days",
                "value": "```" + `${days} days` + "```",
                "inline": true
            },
            {
                "name": "Uptime Hours",
                "value": "```" + `${hours} hours` + "```",
                "inline": true
            },
            {
                "name": "Uptime Minutes",
                "value": "```" + `${minutes} minutes` + "```",
                "inline": true
            },
            {
                "name": "Creation",
                "value": "```" + `${botcreate}` + "```",
                "inline": true
            },
            {
                "name": "Creation Days",
                "value": "```" + `${ago}` + "```",
                "inline": true
            }
        ])
        embedBotstats.setColor("BLUE");
        embedBotstats.setThumbnail(client.user.displayAvatarURL({ format: "png", size: 128, dynamic: true }))
        embedBotstats.setFooter({ text: `${message.author.tag}`, iconURL: message.author.displayAvatarURL() });
        embedBotstats.setTimestamp();
        message.channel.send({ embeds: [embedBotstats] });

    }
}