const Discord = require("discord.js");
const fs = require("fs");
var request = require("request")
var Trello = require("trello");
var trello = new Trello("4ab69a6f55784a8a21e6f2f154c6fc75", "5dfea0e2aa20920451e23eb5ac95fca81a2cc8019d02bd7c683b0937b35622d5");
const client = new Discord.Client();
var owner = "82173389657079808"
const config = require("./config.json")
const package = require("./package.json")
const token = config.token //retrives token
const Prefix = config.Prefix
const moment = require("moment")
// client.on('','' => { });


client.on("ready", function () {
  console.log("ready")
});
client.on('guildDelete', guild => {
  console.log(`I have left ${guild.name} at ${new Date()}`);
});

client.on('guildCreate', guild => {
  console.log(`I have Joined ${guild.name} at ${new Date()}`);
  guild.createRole({
      name: 'Moderator',
    })
    .then(role => console.log(`Created role ${role}`))
    .catch(console.error)

  guild.createRole({
      name: 'Muted',
    })
    .then(role => console.log(`Created role ${role}`))
    .catch(console.error)
});


client.on("message", function (message) {
  if (message.author.equals(client.user)) return;
  if (message.channel.type === 'dm') return message.reply("You cant use me in PM."); // prevent commands via dm
  if (message.author.equals("82173389657079808")) return;
  const args = message.content.slice(Prefix.length).trim().split(/ +/g).slice(1)
  const command = message.content.slice(Prefix.length).trim().split(/ +/g).shift().toLowerCase();


  //Auto Reaction to these word k
  if (message.content.toLowerCase().match("lol")) {
    message.react("😂")
  } else
  if (message.content.toLowerCase().match("lmao")) {
    message.react("😂")
  }
  if (message.content.match("/")) {
    try {
      let commandFile = require(`./commands/${command}.js`);
      commandFile.run(client, message, args);
    } catch (err) {
      console.error(err);
    }
  }
});
client.login(token);