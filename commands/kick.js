const Discord = require("discord.js")
exports.run = (client, message, args) => {
  var user = message.mentions.users.first();
  if (!message.member.roles.some(r => ["Moderator"].includes(r.name))) message.channel.send(":x: You are not a moderator :hammer:"); return;
  if (!user) return message.reply("Mention someone to kick them!");
  message.guild.fetchMember(user).then(m => m.kick());
  var embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .addField("User", args.join(" ")[0])
    .addField("Moderator", message.author.tag)
    .addField("Reason", args.join(" ")[1])
    .setFooter(`Lockebot Mute As Of [TEST]`)
    message.channel.send({embed});;
}