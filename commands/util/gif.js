const Discord = require('discord.js');
var request = require("request")
const config = require("../../config.json")
module.exports.variables = {
    command: "Help",
    file: "help.js",
    enabled: true,
    locked: false, //makes only owner use it 
};

module.exports.run = (message, args) => {
    request(config.api_key2, function (error, response, body) {
        var data = JSON.parse(body).data
        var image = data["image_url"]
        message.channel.send(image)
      });
}
