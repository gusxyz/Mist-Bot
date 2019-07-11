const discord = require('discord.js');
const unirest = require('unirest');

module.exports.run = async (bot, message, args) => {
    unirest.get("https://steppschuh-json-porn-v1.p.rapidapi.com/image/5817567562170368/400.jpg")
        .header("X-RapidAPI-Host", "steppschuh-json-porn-v1.p.rapidapi.com")
        .header("X-RapidAPI-Key", "oQwqWMGzNVmshDQrH7R3BY8j4DRJp1ubjhUjsnMIjQOrRc0qbC")
        .end(function (result) {
        console.log(result.body);
    });
}

module.exports.help = {
    name: 'nsfw'
}