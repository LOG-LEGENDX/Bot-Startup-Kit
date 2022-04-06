const Discord = require('discord.js');
const bconfig = require('../../config.json')

module.exports = {
    name: 'invite',
    cooldown: 5,
    execute(message, _args, client) {

        // bot-perm
        if (!message.guild.me.permissions.has('EMBED_LINKS')) return message.channel.send('Please Give Me **EMBED_LINKS** permission in this channel .')

        let invlink = `[Here](${bconfig.botinvitelink})`

        let embedInvite = new Discord.MessageEmbed();
        embedInvite.setTitle(client.user.username)
        embedInvite.setURL(bconfig.websitelink)
        embedInvite.setDescription("Invite Link Panel Here :-")
        embedInvite.addField("Invite", invlink)
        embedInvite.setColor("BLUE");
        embedInvite.setThumbnail(client.user.displayAvatarURL({ format: "png", size: 128, dynamic: true }))
        embedInvite.setFooter({ text: `${message.author.tag}`, iconURL: message.author.displayAvatarURL() });
        embedInvite.setTimestamp();
        message.channel.send({ embeds: [embedInvite] });

    }
}