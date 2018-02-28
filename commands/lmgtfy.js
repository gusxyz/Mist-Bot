const Discord = require("discord.js")
exports.run = (client, message, args) => {
  message.channel.send(`http://lmgtfy.com/?q=${args.join("+")}`)
}