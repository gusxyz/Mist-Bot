const request = require("request")
const Discord = require("discord.js")
exports.run = (client, message, args) => {
    var options = {
        method: 'POST',
        uri: 'https://e621.net/post/index.json',
        body: {
            "limit": 1000
        },
        headers: {
            "User-Agent": "node-e621/1.0 "
        },
        json: true // Automatically stringifies the body to JSON 
    };
    request(options, function (error, response, body) {
    var object = body[Math.floor(Math.random() * body.length)]
    var image = object["file_url"]
    var embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setImage(image)
    message.channel.send({embed});
    });
}