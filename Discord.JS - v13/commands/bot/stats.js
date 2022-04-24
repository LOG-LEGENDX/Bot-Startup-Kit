const Discord = require('discord.js');
const bconfig = require('../../config.json')
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("stats")
        .setDescription("Gives My Stats"),
    async execute(interaction) {

        // bot-perm
        if (!interaction.guild.me.permissionsIn(interaction.channel).has(Discord.Permissions.FLAGS.EMBED_LINKS)) {

            interaction.reply({

                content: "Please Give Me **EMBED_LINKS** permission in this channel .",
                ephemeral: true,

            });
        }

        let botservers = interaction.client.guilds.cache.size;
        let botusers = interaction.client.guilds.cache.reduce((total, guild) => total + guild.memberCount, 0);
        let botchannels = interaction.client.channels.cache.size;
        let botemojis = interaction.client.emojis.cache.size;
        let botping = Math.round(interaction.client.ws.ping);
        let totalSeconds = (interaction.client.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400;
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let memusage = Math.round((process.memoryUsage().heapUsed / 1024 / 1024) * 100) / 100
        let botcreate = interaction.client.user.createdAt;
        let now = Date.now() - botcreate;
        let ago = Math.floor(now / bconfig.botago)

        let embedBotstats = new Discord.MessageEmbed();
        embedBotstats.setTitle(interaction.client.user.username)
        embedBotstats.setURL(bconfig.websitelink)
        embedBotstats.setDescription("My Stats Panel Here :-")
        embedBotstats.addFields([
            {
                "name": "Name",
                "value": "```" + `${interaction.client.user.tag}` + "```",
                "inline": true
            },
            {
                "name": "Id",
                "value": "```" + `${interaction.client.user.id}` + "```",
                "inline": true
            },
            {
                "name": "Prefix",
                "value": "```" + `/` + "```",
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
        embedBotstats.setThumbnail(interaction.client.user.displayAvatarURL({ format: "png", size: 128, dynamic: true }))
        embedBotstats.setFooter({ text: `${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() });
        embedBotstats.setTimestamp();

        interaction.reply({
            embeds: [embedBotstats]
        });
    }
}
