const Discord = require("discord.js")
const request = require("request")
exports.run = (client, message, args) => {

  request(`https://api.roblox.com/users/get-by-username?username=${args.join(" ")}`, function (error, response, body) {
    var data = JSON.parse(body)
    var username = data["Username"]
    var iD = data["Id"]
      //request(`https://rprxy.xyz/proxy/api/usernames/${iD}`, function (error, response, body) {
       // var pastnames = JSON.parse(body)
        var embed = new Discord.RichEmbed()
          .setColor("RANDOM")
          .setThumbnail(`https://www.roblox.com/Thumbs/Avatar.ashx?x=250&y=250&userId=${iD}`)
          .setTitle(`${username}'s ROBLOX info`)
          .addField("Username:", username)
          .addField("UserId", iD)
          //.addField("Past Usernames", pastnames)
          .setURL("Profile Link", `https://www.roblox.com/users/${iD}/profile`)
          message.channel.send({embed});
      });
}