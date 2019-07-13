const discord = require('discord.js');
const config = require('../config.json')
module.exports.run = async (bot, message, args) => {
    if(args[0]) {
        let command = args[0]
        if (bot.commands.has(command)) {
            command = bot.commands.get(command);
            var embed = new discord.RichEmbed()
                .setColor('RANDOM')
                .setAuthor('LockeBot Help', message.guild.iconURL)
                .setDescription(`**Prefix**: **${config.prefix}**\n\n**Command:** ${command.help.name}\n**Description:** ${command.help.description}\n**Usage:** ${command.help.usage}`)
            message.channel.send(embed);
        }
    } else {
        var embed = new discord.RichEmbed()
        .setColor('RANDOM')
        .setAuthor('LockeBot Help', message.guild.iconURL)
        .setThumbnail(bot.user.avatarURL)
        .setDescription(`**Prefix**: **${config.prefix}**\n\n**Commands:** help,guild,info,nsfw `)
        message.channel.send(embed);
    }
}

module.exports.help = {
    name: 'help',
    usage: '>help',
    description: 'Gives you help!'
} 