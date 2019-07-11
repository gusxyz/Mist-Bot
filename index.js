const discord = require('discord.js');
const fs = require('fs');

const config = require('./config.json');
const package = require('./package.json')

const bot = new discord.Client({disableEveryone: true});
bot.commands = new discord.Collection();

fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log(`Couldn't find commands.`);
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });
});

bot.on('ready', async () => {
    console.log(`${bot.user.username} has been activated!`);
    bot.user.setActivity('Bot is being Recoded!');
});

bot.on('message', async message => {
    let prefix = config.prefix;
    let array = message.content.split(' ');
    let cmd = array[0];
    let args = array.slice(1);

    let cmdFile = bot.commands.get(cmd.slice(prefix.length));
    if (cmdFile) cmdFile.run(bot,message,args);
});

bot.login(config.token);