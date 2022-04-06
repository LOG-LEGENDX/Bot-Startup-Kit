const Discord = require('discord.js');
const predb = require('quick.db')
const bconfig = require('../../config.json')

module.exports = {
    name: 'reset-prefix',
    cooldown: 5,
    async execute(message, _args, client) {

        // user-perm
        if (!message.member.permissions.has('MANAGE_GUILD')) return message.channel.send('Make Sure You Have **MANAGE_SERVER** permission to use this command .')

        // bot-perm
        if (!message.guild.me.permissions.has('EMBED_LINKS')) return message.channel.send('Please Give Me **EMBED_LINKS** permission in this channel .')

        let embednop = new Discord.MessageEmbed()
        embednop.setDescription(`• Your Server Doesn't Have Any Custom Prefix`)
        embednop.setColor('RED')
        embednop.setFooter({ text: `${message.author.tag}`, iconURL: message.author.displayAvatarURL() })
        embednop.setTimestamp()

        if (!predb.has(`guild_${message.guild.id}_prefix`, message.guild.id)) return message.channel.send({ embeds: [embednop] })

        await predb.delete(`guild_${message.guild.id}_prefix`)

        let embedp = new Discord.MessageEmbed()
        embedp.setTitle(client.user.username)
        embedp.setURL(bconfig.websitelink)
        embedp.setDescription(`• Successfully Resets Your Server Custom Prefix`)
        embedp.addFields([
            {
                "name": "Current-Prefix",
                "value": "```" + `${bconfig.defaultprefix}` + "```"
            }
        ])
        embedp.setColor('GREEN')
        embedp.setFooter({ text: `${message.author.tag}`, iconURL: message.author.displayAvatarURL() })
        embedp.setThumbnail(client.user.displayAvatarURL({ format: "png", size: 128, dynamic: true }))
        embedp.setTimestamp()

        return message.channel.send({ embeds: [embedp] })
    }
}