const Discord = require('discord.js');
const bconfig = require('../../config.json')
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("report")
        .setDescription("Report Your Issue To My Dev")
        .addStringOption((option) =>
            option
                .setName("issue")
                .setDescription("Write The Issue You Are Facing")
                .setRequired(true)
        ),
    async execute(interaction) {
        
        // bot-perm
        if (!interaction.guild.me.permissionsIn(interaction.channel).has(Discord.Permissions.FLAGS.EMBED_LINKS)) {

            interaction.reply({

                content: "Please Give Me **EMBED_LINKS** permission in this channel .",
                ephemeral: true,

            });
        }
        if (!interaction.guild.me.permissions.has(Discord.Permissions.FLAGS.CREATE_INSTANT_INVITE)) {

            interaction.reply({

                content: "Please Give Me **CREATE_INVITE** permission in this server .",
                ephemeral: true,

            });
        }

        let InvLink = await interaction.channel.createInvite({ maxAge: 0, maxUses: 0 })

        let InvLinkUrl = "https://discord.gg/"

        let InvLinkCode = InvLink.code

        let ReportInvLink = `${InvLinkUrl}` + `${InvLinkCode}`

        let embedmemreport = new Discord.MessageEmbed()
        embedmemreport.setTitle(interaction.client.user.username)
        embedmemreport.setURL(bconfig.websitelink)
        embedmemreport.setDescription(`• You're issue have been succesfully sent to the developers!`)
        embedmemreport.setThumbnail(interaction.client.user.displayAvatarURL({ format: "png", size: 128, dynamic: true }))
        embedmemreport.setColor('GREEN')
        embedmemreport.setFooter({ text: `${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() });
        embedmemreport.setTimestamp()

        let embedmemtodevreport = new Discord.MessageEmbed()
        embedmemtodevreport.setTitle(interaction.client.user.username)
        embedmemtodevreport.setURL(bconfig.websitelink)
        embedmemtodevreport.setDescription("Report Panel Here :-")
        embedmemtodevreport.addFields([
            {
                "name": "Reporter Name",
                "value": "```" + `${interaction.user.tag}` + "```",
                "inline": true
            },
            {
                "name": "Reporter ID",
                "value": "```" + `${interaction.user.id}` + "```",
                "inline": true
            },
            {
                "name": "Reported Guild Name",
                "value": "```" + `${interaction.guild.name}` + "```",
                "inline": true
            },
            {
                "name": "Reported Guild ID",
                "value": "```" + `${interaction.guild.id}` + "```",
                "inline": true
            },
            {
                "name": "Reported Guild Invite Link",
                "value": "```" + `${ReportInvLink}` + "```",
                "inline": true
            },
            {
                "name": "Reported Issue",
                "value": "```" + `${interaction.options.getString("issue")}` + "```"
            }
        ])
        embedmemtodevreport.setColor('YELLOW');
        embedmemtodevreport.setThumbnail(interaction.client.user.displayAvatarURL({ format: "png", size: 128, dynamic: true }))
        embedmemtodevreport.setFooter({ text: `${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() });
        embedmemtodevreport.setTimestamp();

        interaction.client.channels.cache.get(bconfig.botreportchannel).send({

            embeds: [embedmemtodevreport]

        });

        interaction.reply({
            embeds: [embedmemreport],
            ephemeral: true,
        });
    }
}
