const Discord = require('discord.js');
const predb = require('quick.db')
const bconfig = require('../../config.json')

module.exports = {
    name: 'setup-prefix',
    cooldown: 5,
    async execute(message, args, client) {

        // user-perm
        if (!message.member.permissions.has('MANAGE_GUILD')) return message.channel.send('Make Sure You Have **MANAGE_SERVER** permission to use this command .')

        // bot-perm
        if (!message.guild.me.permissions.has('EMBED_LINKS')) return message.channel.send('Please Give Me **EMBED_LINKS** permission in this channel .')

        let embedargs = new Discord.MessageEmbed()
        embedargs.setDescription(`• Please Use This Command Like **${bconfig.defaultprefix}setup-prefix <your-server-custom-prefix>**`)
        embedargs.setColor('RED')
        embedargs.setFooter({ text: `${message.author.tag}`, iconURL: message.author.displayAvatarURL() })
        embedargs.setTimestamp()

        if (!args[1]) return message.channel.send({ embeds: [embedargs] })

        let embedlargs = new Discord.MessageEmbed()
        embedlargs.setDescription(`• Make Sure The Custom Prefix You Are Entering Is Not More Than 3 Characters`)
        embedlargs.setColor('YELLOW')
        embedlargs.setFooter({ text: `${message.author.tag}`, iconURL: message.author.displayAvatarURL() })
        embedlargs.setTimestamp()

        if (args[1].length > 3) return message.channel.send({ embeds: [embedlargs] })
        
        let embedalp = new Discord.MessageEmbed()
        embedalp.setDescription(`• Custom Prefix For Your Server Is Already Setuped , Please Reset It First`)
        embedalp.setColor('YELLOW')
        embedalp.setFooter({ text: `${message.author.tag}`, iconURL: message.author.displayAvatarURL() })
        embedalp.setTimestamp()

        if (predb.has(`guild_${message.guild.id}_prefix`, message.guild.id)) return message.channel.send({ embeds: [embedalp] })

        await predb.set(`guild_${message.guild.id}_prefix`, args[1])

        let embeds = new Discord.MessageEmbed()
        embeds.setTitle(client.user.username)
        embeds.setURL(bconfig.websitelink)
        embeds.setDescription(`• Custom Prefix For Your Server Is Successfully Setuped`)
        embeds.addFields([
            {
                "name": "Custom Prefix",
                "value": "```" + `${args[1]}` + "```"
            }
        ])
        embeds.setColor('GREEN')
        embeds.setFooter({ text: `${message.author.tag}`, iconURL: message.author.displayAvatarURL() })
        embeds.setThumbnail(client.user.displayAvatarURL({ format: "png", size: 128, dynamic: true }))
        embeds.setTimestamp()

        message.channel.send({ embeds: [embeds] })
    }
}