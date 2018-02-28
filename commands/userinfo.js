const Discord = require("discord.js")
exports.run = (client, message, args) => {
  var mtarget = message.guild.member(message.mentions.users.first())
    var target = message.mentions.users.first()
    if (target) {
      var embed = new Discord.RichEmbed()
        .setAuthor(target.username, target.avatarURL)
        .setColor("RANDOM")
        .setThumbnail(target.avatarURL)
        .addField("Tag", target.tag, true)
        .addField("ID", target.id, true)
        .addField("Highest role", mtarget.highestRole, true)
        .addField("Created", target.createdAt, true)
        .addField("Status", target.presence.status, true)
        .setFooter(client.user.username, client.user.avatarURL)
        message.channel.send({embed});
    } else {
      message.reply("Cant get that user try again.")
    }
}