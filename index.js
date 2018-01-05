const Discord = require("discord.js");
var ownerID = "82173389657079808"
const config = require("./config.json")
const token = config.token //retrives token
const client = new Discord.Client();
const Prefix = config.Prefix
// client.on('','' => { });

client.on("ready", function(){ // Tells Console that it is ready to be ran!
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

var guilds = {};
client.on("message", function(message) {
    if (message.author.equals(client.user)) return;
  if(message.channel.type === 'dm') return message.reply("You cant use me in PM."); // prevent commands via dm
  let arg = message.content.split(" ").slice(1);
  let args = arg.join(" ")
  let lgtmfy = arg.join("+")
  let pref = arg.join("")
let embedText = arg.join(" ")
const clean = text => {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}

//Commands Beyond this Point
    if(message.content.match("lol")) {
    message.react("🍆")
    } else
    if(message.content.startsWith(Prefix + "steal")) {
      message.channel.send("YOU WANNA STEAL MY CLOUT? :b: :regional_indicator_e: :regional_indicator_g: :regional_indicator_o: :regional_indicator_n: :regional_indicator_e:  :regional_indicator_t: :regional_indicator_h: :regional_indicator_o: :regional_indicator_t:")
    } else
  if (message.content.startsWith(Prefix + "serverinfo")) {
        var embed = new Discord.RichEmbed()
        .setAuthor(message.guild.name, message.guild.iconURL)
        .setColor("RANDOM")
        .setThumbnail(message.guild.iconURL)
        .setDescription(`Owner: ${message.guild.owner}`)
        .addField("Member Count", message.guild.memberCount, true)
        .addField("Roles", message.guild.roles.size, true)
        .addField("Channels", message.guild.channels.size, true)
        .addField("Emojis", message.guild.emojis.size, true)
        .addField("Region", message.guild.region, true)
        .addField('Created', message.guild.createdAt.toLocaleString(), true)
        .setFooter(client.user.username, client.user.avatarURL)

        message.channel.sendEmbed(embed)
  } else

 if (message.content.startsWith(Prefix + "eval")) {
    if(message.author.id !== "82173389657079808") return;
    try {
      const code = arg.join(" ");
      let evaled = eval(code);

      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);

      message.channel.send(clean(evaled), {code:"xl"});
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
 } else
if (message.content.startsWith(Prefix + "giverole")) {
        var mtarget = message.guild.member(message.mentions.users.first())
        mtarget.addRole(message.guild.roles.find("name", `${args[2]} ${args[3]}`));
} else

  if (message.content.startsWith(Prefix + "userinfo")) {
    var mtarget = message.guild.member(message.mentions.users.first())
    var target = message.mentions.users.first()
    if(target) {
          var embed = new Discord.RichEmbed()
        .setAuthor(target.username, target.avatarURL)
        .setColor("RANDOM")
        .setThumbnail(target.avatarURL)
        .addField("Tag", target.tag, true)
        .addField("ID", target.id, true)
        .addField("Highest role", mtarget.highestRole, true)
        .addField("Created", target.createdAt, true)
        .addField("Status", target.presence.status, true)
        .setFooter(client.user.username, client.user.avatarURL)
        message.channel.sendEmbed(embed)
      } else {
        message.reply("Cant get that user try again.")
      }

  } else
 if (message.content.startsWith(Prefix + "lmgtfy")) {
message.channel.send(`http://lmgtfy.com/?q=${lgtmfy}`)
} else
      if (message.content.startsWith(Prefix + "info")) {
             var embed = new Discord.RichEmbed()
                .setColor(0x4BF92E)
                .setTitle("Information")
                .setThumbnail("https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Gadsden_flag.svg/1200px-Gadsden_flag.svg.png")
                .addField("Author", "Dawn", true)
                .addField("Version", "0.5.5", true)
                .addField("Server Count", client.guilds.size, true)
                .addField("Purpose", "Locke Bot is a multi purpose bot that includes fun, moderation and other commands to make a complete useful and working bot")
                .addField("Stage", "Alpha")
                .addField("Status", "Private")
                .addField("Notes", "No Development Notes Currently")
                message.channel.send("", {embed: embed});
      } else
        if (message.content.startsWith(Prefix + "embed")) {
             var embed = new Discord.RichEmbed()
                 .setColor("RANDOM")
                .setDescription(embedText.join(" "))
            message.channel.send("", {embed: embed});
        } else
        if (message.content.startsWith(Prefix + "dice")) {
        var random = Math.ceil(Math.random() * 20);
        var embed = new Discord.RichEmbed()
           .setDescription(`You rolled a ${random}`)
           message.channel.send("", {embed: embed});
        } else
        if(message.content.startsWith(Prefix + "say")) {
message.channel.send(args)
} else
if (message.content.startsWith(Prefix + "8ball")) {
            if(args[1]) {
            var embed = new Discord.RichEmbed()
                  .setColor("RANDOM")
                  .setDescription(Mball[Math.floor(Math.random() * Mball.length)])
                  message.channel.sendEmbed(embed);
                } else {
                 message.channel.send("Can't read that");
             }
} else

  if (message.content.startsWith(Prefix + "noticeme")) {
            message.reply("You have been noticed by the almighty Locke Bot")
  } else
    if (message.content.startsWith(Prefix + "ban")) {
            var user = message.mentions.users.first();
            if(!user) return message.reply("Mention someone to ban them!");
            message.guild.fetchMember(user).then(m => m.ban());
            var embed = new Discord.RichEmbed()
                  .setColor("RANDOM")
                  .addField("User", args[1])
                  .addField("Moderator", message.author.tag)
                  .addField("Reason", arg[2])
                  .setFooter(`Lockebot Mute As Of [TEST]`)
                  message.channel.sendEmbed(embed);
    } else

      if (message.content.startsWith(Prefix + "purge")) {
        if(message.author.id !== "82173389657079808") return;
        var messagecount = parseInt(args);
        message.channel.fetchMessages({limit: messagecount}).then(messages => message.channel.bulkDelete(messages));
      } else
        if (message.content.startsWith(Prefix + "mute")) {
      var mtarget = message.guild.member(message.mentions.users.first())
      var target = message.mentions.users.first()
      if(!message.member.roles.some(r=>["Moderator"].includes(r.name)) )   return;
      mtarget.addRole(message.guild.roles.find("name", "Muted"));
      var embed = new Discord.RichEmbed()
              .setColor("RANDOM")
              .addField("User", `${target.tag}`)
              .addField("Moderator", `${message.author.tag}`)
              .addField("Reason", args[3])
              .setFooter(`Lockebot Mute`)
              message.channel.sendEmbed(embed);
      } else
           if (message.content.startsWith(Prefix + "kick")) {

      var target = message.mentions.users.first()
      if(!message.member.roles.some(r=>["Moderator"].includes(r.name)) )   return;
      var embed = new Discord.RichEmbed()
              .setColor("RANDOM")
              .addField("User", `${target.tag}`)
              .addField("Moderator", `${message.author.tag}`)
              .addField("Reason", args[2])
              .setFooter(`Lockebot Kick`)
              message.channel.sendEmbed(embed);
            message.guild.fetchMember(target).then(m => m.kick());


           } else
           if (message.content.startsWith(Prefix + "die")) {
               message.author.kick()
           } else
      /*case "giverole":
        var mtarget = message.guild.member(message.mentions.users.first())
        if(args[3] !== "") {
        mtarget.addRole(message.guild.roles.find("name", `${args[2]} ${args[3]}`));
        console.log(`${args[2]} ${args[3]}`)
        `
        } else
      console.log(args[3])
      mtarget.addRole(message.guild.roles.find("name", `${args[2]}`));
      console.log(args[2])
      break;
*/
        if (message.content.startsWith(Prefix + "help")) {
        message.reply(":white_check_mark: I have sent a list of commands to you check your DM's :white_check_mark:")
        message.author.send()
        var embed = new Discord.RichEmbed()
                .setColor(0x4BF92E)
                .setFooter("More Commands Coming Send me Ideas at Dawn#7610")
                .setTitle("Commands")
                .addField("Prefix", Prefix, true)
                .addField("Commands", "noticeme, 8ball, info, dice, embed, lmgtfy [string],", true)
                .addField("Mod Commands", "Kick,(kick) Ban", true)
                .addField("Notes", "Kick is mediocore and could use some work ")
                message.author.sendEmbed(embed);
        }

})

client.login(token);
