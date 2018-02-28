const request = require("request")
exports.run = (client, message, args) => {
  const options = {
    method: 'GET',
    url: 'https://icanhazdadjoke.com/',
    json: true
    }
request(options, function (error, response, body) {
var embed = new Discord.RichEmbed()
.setColor("RANDOM")   
.setDescription(body.joke)
.setAuthor("Lockebot")
.setFooter(`${message.author.username} requested this command`)
  message.channel.send({embed});
})
}