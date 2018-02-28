const Discord = require("discord.js")
const request = require("request")
exports.run = (client, message, args) => {
  request(`https://api.roblox.com/users/get-by-username?username=${args.join(" ")}`, function (error, response, body) {
    var data = JSON.parse(body)
    var username = data["Username"]
    var iD = data["Id"]
    request(`http://api.roblox.com/users/${iD}/groups`, function (error, response, body) {
      var groups = JSON.parse(body)
      var groupamount = groups.length
      var i = 0
      var embed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setTitle(`${username}'s ROBLOX Groups`)
      while (i < groupamount) {
        embed.addField(groups[i]["Name"], groups[i]["Role"])
        i++;
      }
        message.channel.send({embed});
    });
  });
}