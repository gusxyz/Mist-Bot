const Discord = require("discord.js")
exports.run = (client, message, args) => {
  var embed = new Discord.RichEmbed()
  .setAuthor(message.guild.name, message.guild.iconURL)
  .setColor("RANDOM")
  .setThumbnail(message.guild.iconURL)
  .setDescription(`Owner: ${message.guild.owner}`)
  .addField("Member Count", message.guild.memberCount, true)
  .addField("Roles", message.guild.roles.size, true)
  .addField("Channels", message.guild.channels.size, true)
  .addField("Emojis", message.guild.emojis.size, true)
  .addField("Region", message.guild.region, true)
  .addField('Created', message.guild.createdAt.toLocaleString(), true)
  .setFooter(client.user.username, client.user.avatarURL)

  message.channel.send({embed})
}