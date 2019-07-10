const config = require('./config.json');
const package = require('./package.json')
const discord = require('discord.js');

const bot = new discord.Client({disableEveryone: true});

bot.on('ready', async () => {
    console.log(`${bot.user.username} has been activated!`);
    bot.user.setActivity('Bot is being Recoded!');
});

bot.on('message', async message => {
    let prefix = config.prefix;
    let array = message.content.split(' ');
    let cmd = array[0];
    let args = array.slice(1);

    if (cmd === `${prefix}ping`) {
        message.channel.send('Pong!');
    } else if (cmd === `${prefix}info`) {
        let info = new discord.RichEmbed()
        .setColor(0x4BF92E)
        .setTitle('Information')
        .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Gadsden_flag.svg/1200px-Gadsden_flag.svg.png')
        .addField('Author', 'Dawn', true)
        .addField('Version', package.version, true)
        .addField('Server Count', bot.guilds.size, true)
        .addField('Purpose', 'Locke Bot is a multi purpose bot that includes fun, moderation and other commands to make a complete useful and working bot')
        .addField('Status', 'Private')
        .addField('Notes', 'No Development Notes Currently');
        message.channel.send(info);
    } else if (cmd === `${prefix}guild`) {
        let guild = new discord.RichEmbed()
        .setAuthor(message.guild.name, message.guild.iconURL)
        .setColor('RANDOM')
        .setThumbnail(message.guild.displayAvatarURL)
        .setDescription(`Owner: ${message.guild.owner}`)
        .addField('Member Count', message.guild.memberCount, true)
        .addField('Roles', message.guild.roles.size, true)
        .addField('Channels', message.guild.channels.size, true)
        .addField('Emojis', message.guild.emojis.size, true)
        .addField('Region', message.guild.region, true)
        .addField('Created', message.guild.createdAt.toLocaleString(), true)
        .setFooter(bot.user.username, bot.user.avatarURL)
      
        return message.channel.send(guild);
    }
});

bot.login(config.token);