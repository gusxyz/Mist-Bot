const Discord = require('discord.js');
const config = require("../../config.json");
module.exports.variables = {
    command: "Help",
    file: "help.js",
    enabled: true,
    locked: false, //makes only owner use it 
};

module.exports.run = (message, args) => {
    message.reply(":white_check_mark: I have sent a list of commands to you check your DM's :white_check_mark:")
    message.author.send()
    var embed = new Discord.RichEmbed()
      .setColor(0x4BF92E)
      .setFooter("More Commands Coming Send me Ideas at Dawn#7610")
      .setTitle("Commands")
      .addField("Prefix", config.Prefix, true)
      .addField("Commands", "noticeme, 8ball, info, dice, embed, lmgtfy [string], joke, gif, chuckjoke", true)
      .addField("Mod Commands", "Kick,(kick) Ban", true)
      .addField("Notes", "None")
    message.author.sendEmbed(embed);
}
