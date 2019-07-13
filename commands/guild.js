
const discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    let guild = new discord.RichEmbed()
    .setAuthor(message.guild.name, message.guild.iconURL)
    .setColor('RANDOM')
    .setThumbnail(message.guild.iconURL)
    .setDescription(`Owner: ${message.guild.owner}`)
    .addField('Member Count', message.guild.memberCount, true)
    .addField('Roles', message.guild.roles.size, true)
    .addField('Channels', message.guild.channels.size, true)
    .addField('Emojis', message.guild.emojis.size, true)
    .addField('Region', message.guild.region, true)
    .addField('Created', message.guild.createdAt.toLocaleString(), true)
    .setFooter(bot.user.username, bot.user.avatarURL)
  
    message.channel.send(guild);
}

module.exports.help = {
    name: 'guild',
    usage: '>guild',
    description: 'Returns info about the server!'
}