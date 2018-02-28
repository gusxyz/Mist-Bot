const Discord = require("discord.js")
exports.run = (client, message, args) => {
  var user = message.mentions.users.first();
  if (!message.member.roles.some(r => ["Moderator"].includes(r.name))) message.channel.send(":x: You are not a moderator :hammer:"); return;
  if (!user) return message.reply("Mention someone to ban them!");
  message.guild.fetchMember(user).then(m => m.ban());
  var embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .addField("User", args.join(" ")[1])
    .addField("Moderator", message.author.tag)
    .addField("Reason", arg[2])
    .setFooter(`Lockebot Mute As Of [TEST]`)
    message.channel.send({embed});;
}