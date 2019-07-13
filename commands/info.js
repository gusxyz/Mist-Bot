const discord = require('discord.js');
const package = require('../package.json')

module.exports.run = async (bot, message, args) => {
    let info = new discord.RichEmbed()
    .setColor(0x4BF92E)
    .setTitle('Information')
    .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Gadsden_flag.svg/1200px-Gadsden_flag.svg.png')
    .addField('Author', 'Dawn', true)
    .addField('Version', package.version, true)
    .addField('Server Count', 1, true)
    .addField('Purpose', 'Locke Bot is a multi purpose bot that includes fun, moderation and other commands to make a complete useful and working bot')
    .addField('Status', 'Private')
    .addField('Notes', 'No Development Notes Currently');
    message.channel.send(info);
}

module.exports.help = {
    name: 'info',
    usage: '>info',
    description: 'Info about the bot!'
}