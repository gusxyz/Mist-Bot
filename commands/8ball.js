const Discord = require("discord.js")

var Mball = [ //8Ball options
  "It is certain",
  "It is decidedly so",
  "Without a doubt",
  "Yes definitely",
  "You may rely on it",
  "As I see it, yes",
  "Most Likely",
  "Outlook Good",
  "Yes",
  "Signs Point to yes",
  "Try Again Later",
  "Dont Count on it",
  "My Reply is no",
  "My sources say no",
  "Outlook not so good",
  "Cannot Predict now",
  "Very Doubtful",
  "Concentrate and Ask Again"
]
exports.run = (client, message, args) => {
  var xd = args.join(" ")
  var imp = xd.length - 1
  if (args.join(" ")[1]) {
    if (xd.substring(imp, xd.length) === "?") {
      var embed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setDescription(Mball[Math.floor(Math.random() * Mball.length)])
        message.channel.send({embed});
    } else {
      message.reply("Make sure its a question Hint: Use a question mark dumbo")
    }
  } else {
    message.channel.send("Can't read that");
  }
}