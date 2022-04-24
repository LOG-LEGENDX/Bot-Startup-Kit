const Discord = require('discord.js');
const bconfig = require('../../config.json')
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
   data: new SlashCommandBuilder()
      .setName("help")
      .setDescription("Shows This Panel"),
   async execute(interaction) {

      // bot-perm
      if (!interaction.guild.me.permissionsIn(interaction.channel).has(Discord.Permissions.FLAGS.EMBED_LINKS)) {

         interaction.reply({

            content: "Please Give Me **EMBED_LINKS** permission in this channel .",
            ephemeral: true,

         });
      }

      let embedHelp = new Discord.MessageEmbed();
      embedHelp.setTitle(interaction.client.user.username)
      embedHelp.setURL(bconfig.websitelink)
      embedHelp.setDescription("Helping Panel Here :-")
      embedHelp.addFields([
         {
            "name": "Commands",
            "value": `
                  --------------------------
                  help - Shows This Panel
                  invite - Gives My Invite Link
                  report - Report Your Issue To My Dev
                  stats - Gives My Stats
                  --------------------------
                  `
         }
      ])
      embedHelp.addField("Help & Updates", `• For Any Help & Updates [Join My Discord Server](${bconfig.discordinvitelink})`)
      embedHelp.setColor("BLUE");
      embedHelp.setThumbnail(interaction.client.user.displayAvatarURL({ format: "png", size: 128, dynamic: true }))
      embedHelp.setFooter({ text: `${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() });
      embedHelp.setTimestamp();

      interaction.reply({
         embeds: [embedHelp]
      });
   }
}
