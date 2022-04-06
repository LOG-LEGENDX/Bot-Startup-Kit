const Discord = require('discord.js');
const bconfig = require('../../config.json')

module.exports = {
    name: 'report',
    cooldown: 5,
    async execute(message, args, client) {

        // bot-perm
        if (!message.guild.me.permissions.has('EMBED_LINKS')) return message.channel.send('Please Give Me **EMBED_LINKS** permission in this channel .')
        if (!message.guild.me.permissions.has('CREATE_INSTANT_INVITE')) return message.channel.send('Please Give Me **CREATE_INVITE** permission in this guild .')

        const ReportMessage = args[1]

        let embednomsg = new Discord.MessageEmbed()
        embednomsg.setDescription(`• Please Use **${bconfig.defaultprefix}report** command like : **${bconfig.defaultprefix}report your-issue**`)
        embednomsg.setColor('RED')
        embednomsg.setFooter({ text:`${message.author.tag}`, iconURL: message.author.displayAvatarURL() });
        embednomsg.setTimestamp()

        if (!ReportMessage) return message.channel.send({ embeds: [embednomsg] })

        let InvLink = await message.channel.createInvite({ maxAge: 0, maxUses: 0 })

        let InvLinkUrl = "https://discord.gg/"
        
        let InvLinkCode = InvLink.code

        let ReportInvLink = `${InvLinkUrl}` + `${InvLinkCode}`

        let embedmemreport = new Discord.MessageEmbed()
        embedmemreport.setTitle(client.user.username)
        embedmemreport.setURL(bconfig.websitelink)
        embedmemreport.setDescription(`• You're issue have been succesfully sent to the developers!`)
        embedmemreport.setThumbnail(client.user.displayAvatarURL({ format: "png", size: 128, dynamic: true }))
        embedmemreport.setColor('GREEN')
        embedmemreport.setFooter({ text: `${message.author.tag}`, iconURL: message.author.displayAvatarURL() });
        embedmemreport.setTimestamp()

        message.channel.send({ embeds: [embedmemreport] })

        let embedmemtodevreport = new Discord.MessageEmbed()
        embedmemtodevreport.setTitle(client.user.username)
        embedmemtodevreport.setURL(bconfig.websitelink)
        embedmemtodevreport.setDescription("Report Panel Here :-")
        embedmemtodevreport.addFields([
            {
                "name": "Reporter Name",
                "value": "```" + `${message.author.tag}` + "```",
                "inline": true
            },
            {
                "name": "Reporter ID",
                "value": "```" + `${message.author.id}` + "```",
                "inline": true
            },
            {
                "name": "Reported Guild Name",
                "value": "```" + `${message.guild.name}` + "```",
                "inline": true
            },
            {
                "name": "Reported Guild ID",
                "value": "```" + `${message.guild.id}` + "```",
                "inline": true
            },
            {
                "name": "Reported Guild Invite Link",
                "value": `[Here](${ReportInvLink})`,
                "inline": true
            },
            {
                "name": "Reported Issue",
                "value": "```" + `${ReportMessage}` + "```"
            }
        ])
        embedmemtodevreport.setColor('YELLOW');
        embedmemtodevreport.setThumbnail(client.user.displayAvatarURL({ format: "png", size: 128, dynamic: true }))
        embedmemtodevreport.setFooter({ text: `${message.author.tag}`, iconURL: message.author.displayAvatarURL() });
        embedmemtodevreport.setTimestamp();

        client.channels.cache.get(bconfig.botreportchannel).send({ embeds: [embedmemtodevreport] })

    }
}