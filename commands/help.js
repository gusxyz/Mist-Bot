
exports.run = (client, message, args) => {
  message.reply(":white_check_mark: I have sent a list of commands to you check your DM's :white_check_mark:")
  message.author.send("```md\n\n# Commands\n\n# noticeme\n# 8ball (question)?\n# dice\n# lmgtfy (search)\n# serverinfo\n# userinfo (tag user)\n# info\n# chuckjoke\n# gif\n# roblox (roblox username)\n# groups (roblox username\n# suggest (send me a suggestion for the bot)\n# nytimes (article)```")
}