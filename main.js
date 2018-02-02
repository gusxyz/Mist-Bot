// FILE 1 : Core

const Discord = require('discord.js');
const Client = new Discord.Client();
var prefix = ",";
var fs = require('fs');
var request = require("request")
var Trello = require("trello");
var trello = new Trello("4ab69a6f55784a8a21e6f2f154c6fc75", "5dfea0e2aa20920451e23eb5ac95fca81a2cc8019d02bd7c683b0937b35622d5");
const client = new Discord.Client();
var owner = "82173389657079808"
const config = require("./config.json")
const package = require("./package.json")
const token = config.token //retrives token
const Prefix = config.Prefix

client.on("ready", function () { // Tells Console that it is ready to be ran
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
  client.on('guildMemberAdd', member => {
    let guild = member.guild;
  });

// Load Commands
let commands = {};
try { commands['help'] = commands['h'] = commands['?'] = require('./commands/util/help.js');/*change path for command*/ } catch(err) { console.log("Failed to Add Command: help" + " : " + err.message);/*change for each command*/ }




//dev commands
Client.on("message", (message) => {
	if(!message.content.startsWith(prefix) || message.author.bot) { return; }
    const args = message.content.split(" ").slice(1);
	const command = message.content.split(" ")[0].slice(prefix.length);
  
  	let executor = commands[command];
  	
    // Options in variables
  	if(executor) {
    	if(executor.variables.enabled == false) { return; }
        if(executor.variables.locked) {
            if(message.author.id == owner) { }
            else { return; } 
        }
    }
  
  	if(executor) { try { executor.run(message, args); } catch(err) {
    	console.log("Error in Command: " + command);
		console.error(err);
    }}
    
});

Client.login(token);
