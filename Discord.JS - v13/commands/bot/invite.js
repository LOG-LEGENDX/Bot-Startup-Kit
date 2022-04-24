const Discord = require('discord.js');
const bconfig = require('../../config.json')
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
   data: new SlashCommandBuilder()
      .setName("invite")
      .setDescription("Gives My Invite Link"),
   async execute(interaction) {

      // bot-perm
      if (!interaction.guild.me.permissionsIn(interaction.channel).has(Discord.Permissions.FLAGS.EMBED_LINKS)) {

         interaction.reply({

            content: "Please Give Me **EMBED_LINKS** permission in this channel .",
            ephemeral: true,

         });
      }

      const row = new Discord.MessageActionRow()
         .addComponents(
            new Discord.MessageButton()
               .setLabel("Invite")
               .setStyle('LINK')
               .setURL(bconfig.botinvitelink),
         )

      let embedInvite = new Discord.MessageEmbed();
      embedInvite.setTitle(interaction.client.user.username)
      embedInvite.setURL(bconfig.websitelink)
      embedInvite.setDescription("Click On The Button Below")
      embedInvite.setColor("BLUE");
      embedInvite.setThumbnail(interaction.client.user.displayAvatarURL({ format: "png", size: 128, dynamic: true }))
      embedInvite.setFooter({ text: `${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() });
      embedInvite.setTimestamp();

      interaction.reply({
         embeds: [embedInvite],
         components: [row]
      });
   }
}
