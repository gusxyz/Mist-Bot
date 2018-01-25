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
// client.on('','' => { });

var Mball = [ //8Ball options
  "It is certain",
  "It is decidedly so",
  "Without a doubt",
  "Yes definitely",
  "You may rely on it",
  "As I see it, yes",
  "Most Likely",
  "Outlook Good",
  "Yes",
  "Signs Point to yes",
  "Try Again Later",
  "Dont Count on it",
  "My Reply is no",
  "My sources say no",
  "Outlook not so good",
  "Cannot Predict now",
  "Very Doubtful",
  "Concentrate and Ask Again"
]

client.on("ready", function () { // Tells Console that it is ready to be ran!
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
client.on("message", function (message) {
  if (message.author.equals(client.user)) return;
  if (message.channel.type === 'dm') return message.reply("You cant use me in PM."); // prevent commands via dm
  if (message.author.equals("82173389657079808")) return;
  const arg = message.content.split(" ").slice(1);
  const argz = arg.join(" ")
  const args = message.content.slice(Prefix.length).trim().split(/ +/g);
  const lgtmfy = arg.join("+")
  const pref = arg.join("")
  const clean = text => {
    if (typeof (text) === "string")
      return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
      return text;
  } //Auto Reaction to these word k
  if (message.content.toLowerCase().match("lol")) {
    message.react("😂")
  } else
  if (message.content.toLowerCase().match("lmao")) {
    message.react("😂")
  } else
    //Commands Beyond this Point
    if (message.content.toLowerCase().startsWith(Prefix + "suggest")) {
      trello.addCard(`${message.author.tag}'s Suggestion`, argz, "5a5153d415d94b0c4ee89ebe",
        function (error, trelloCard) {
          if (error) {
            console.log('Could not add card:', error);
          } else {
            console.log('Added card:', trelloCard);
          }
        });
    } else
  if (message.content.toLowerCase().startsWith(Prefix + "poll")) {
    if (!message.member.roles.some(r => ["Moderator"].includes(r.name))) return;
    message.guild.channels.find("name", "announcements").send(`Poll by Dawn:\n${argz}\n@everyone`)
      .then(function (message) {
        message.react("✅")
        message.react("❌")
      })
  } else
  if (message.content.toLowerCase().startsWith(Prefix + "steal")) {
    message.channel.send("YOU WANNA STEAL MY CLOUT? :b: :regional_indicator_e: :regional_indicator_g: :regional_indicator_o: :regional_indicator_n: :regional_indicator_e:  :regional_indicator_t: :regional_indicator_h: :regional_indicator_o: :regional_indicator_t:")
  } else
  if (message.content.toLowerCase().startsWith(Prefix + "gif")) {
    request(config.api_key2, function (error, response, body) {
      var data = JSON.parse(body).data
      var image = data["image_url"]
      message.channel.send(image)
    });
  } else
    /*  if (message.content.toLowerCase().startsWith(Prefix + "joke")) {
        const options = {
        method: 'GET',
        uri: 'https://webknox-jokes.p.mashape.com/jokes/random?maxLength=100',
        'X-Mashape-Key': config.ap
    request(options)
      .then(function (response) {
        var data = JSON.parse(response)
        var joke = data["joke"]
        var type = data["category"]
        var embed = new Discord.RichEmbed()
          .setColor("RANDOM")
          .setTitle(`${type} joke`)
          .setDescription(joke)
          .setFooter(`Joke from webknox.com`)
        message.channel.sendEmbed(embed)  })
      } else
    */
    if (message.content.toLowerCase().startsWith(Prefix + "roblox")) {
      request(`https://api.roblox.com/users/get-by-username?username=${argz}`, function (error, response, body) {
        var data = JSON.parse(body)
        var username = data["Username"]
        var iD = data["Id"]
        request(`https://roadblok.pw/api/get-collectibles?userId=${iD}`, function (error, response, body) {
          var rapster = JSON.parse(body)
          var rap
          rap = rapster["total_rap"]
          request(`https://rprxy.xyz/proxy/api/usernames/${iD}`, function (error, response, body) {
            var pastnames = JSON.parse(body)
            var embed = new Discord.RichEmbed()
              .setColor("RANDOM")
              .setThumbnail(`https://www.roblox.com/Thumbs/Avatar.ashx?x=250&y=250&userId=${iD}`)
              .setTitle(`${username}'s ROBLOX info`)
              .addField("Username:", username)
              .addField("UserId", iD)
              .addField("Past Usernames", pastnames)
              .addField("RAP", rap)
              .addField("Profile Link", `https://www.roblox.com/users/${iD}/profile`)
            message.channel.sendEmbed(embed)
          });
        });
      });
    } else
  if (message.content.toLowerCase().startsWith(Prefix + "groups")) {
    request(`https://api.roblox.com/users/get-by-username?username=${argz}`, function (error, response, body) {
      var data = JSON.parse(body)
      var username = data["Username"]
      var iD = data["Id"]
      request(`http://api.roblox.com/users/${iD}/groups`, function (error, response, body) {
        var groups = JSON.parse(body)
        var groupamount = groups.length
        var i = 0
        var embed = new Discord.RichEmbed()
          .setColor("RANDOM")
          .setTitle(`${username}'s ROBLOX Groups`)
        while (i < groupamount) {
          embed.addField(groups[i]["Name"], groups[i]["Role"])
          i++;
        }
        message.channel.sendEmbed(embed)
      });
    });
  } else
  if (message.content.toLowerCase().startsWith(Prefix + "chuckjoke")) {
    request(config.api_key3, function (error, response, body) {
      var data = JSON.parse(body).value
      var chucknorris = data["joke"]
      var embed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setTitle(`Chuck Norris joke`)
        .setDescription(chucknorris)
        .setFooter(`ID #${data["id"]}`)
      message.channel.sendEmbed(embed)
    });
  } else
  if (message.content.toLowerCase().startsWith(Prefix + "serverinfo")) {
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
  if (message.content.toLowerCase().startsWith(Prefix + "eval")) {
    if (message.author.id !== "82173389657079808") message.channel.send(":x: Requires bot developer permissions");
    return;
    try {
      const code = arg.join(" ");
      let evaled = eval(code);

      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);

      message.channel.send(clean(evaled), {
        code: "xl"
      });
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
  } else
  if (message.content.toLowerCase().startsWith(Prefix + "giverole")) {
    if (message.author.id !== "82173389657079808") return;
    var mtarget = message.guild.member(message.mentions.users.first())
    mtarget.addRole(message.guild.roles.find("name", `${args[1]}`));
  } else
  if (message.content.toLowerCase().startsWith(Prefix + "userinfo")) {
    var mtarget = message.guild.member(message.mentions.users.first())
    var target = message.mentions.users.first()
    if (target) {
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
  if (message.content.toLowerCase().startsWith(Prefix + "lmgtfy")) {
    message.channel.send(`http://lmgtfy.com/?q=${lgtmfy}`)
  } else
  if (message.content.toLowerCase().startsWith(Prefix + "info")) {
    var embed = new Discord.RichEmbed()
      .setColor(0x4BF92E)
      .setTitle("Information")
      .setThumbnail("https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Gadsden_flag.svg/1200px-Gadsden_flag.svg.png")
      .addField("Author", "Dawn", true)
      .addField("Version", package.version, true)
      .addField("Server Count", client.guilds.size, true)
      .addField("Purpose", "Locke Bot is a multi purpose bot that includes fun, moderation and other commands to make a complete useful and working bot")
      .addField("Status", "Private")
      .addField("Notes", "No Development Notes Currently")
    message.channel.send("", {
      embed: embed
    });
  } else
  if (message.content.toLowerCase().startsWith(Prefix + "dice")) {
    var random = Math.ceil(Math.random() * 20);
    var embed = new Discord.RichEmbed()
      .setDescription(`You rolled a ${random}`)
    message.channel.send("", {
      embed: embed
    });
  } else
  if (message.content.toLowerCase().startsWith(Prefix + "8ball")) {
    var xd = argz
    var imp = xd.length - 1
    if (args[1]) {
      if (xd.substring(imp, xd.length) === "?") {
        var embed = new Discord.RichEmbed()
          .setColor("RANDOM")
          .setDescription(Mball[Math.floor(Math.random() * Mball.length)])
        message.channel.sendEmbed(embed);
      } else {
        message.reply("Make sure its a question Hint: Use a question mark dumbo")
      }
    } else {
      message.channel.send("Can't read that");
    }
  } else
  if (message.content.toLowerCase().startsWith(Prefix + "noticeme")) {
    message.reply("You have been noticed by the almighty Locke Bot")
  } else
  if (message.content.toLowerCase().startsWith(Prefix + "ban")) {
    var user = message.mentions.users.first();
    if (!message.member.roles.some(r => ["Moderator"].includes(r.name))) message.channel.send(":x: You are not a moderator :hammer:");
    return;
    if (!user) return message.reply("Mention someone to ban them!");
    message.guild.fetchMember(user).then(m => m.ban());
    var embed = new Discord.RichEmbed()
      .setColor("RANDOM")
      .addField("User", args[1])
      .addField("Moderator", message.author.tag)
      .addField("Reason", arg[2])
      .setFooter(`Lockebot Mute As Of [TEST]`)
    message.channel.sendEmbed(embed);
  } else

  if (message.content.toLowerCase().startsWith(Prefix + "purge")) {
    if (!message.member.roles.some(r => ["Moderator"].includes(r.name))) message.channel.send(":x: You are not a moderator :hammer:");
    return;
    var messagecount = parseInt(args);
    message.channel.fetchMessages({
      limit: messagecount
    }).then(messages => message.channel.bulkDelete(messages));
  } else
  if (message.content.toLowerCase().startsWith(Prefix + "mute")) {
    var mtarget = message.guild.member(message.mentions.users.first())
    var target = message.mentions.users.first()
    if (!message.member.roles.some(r => ["Moderator"].includes(r.name))) message.channel.send(":x: You are not a moderator :hammer:");
    return;
    mtarget.addRole(message.guild.roles.find("name", "Muted"));
    var embed = new Discord.RichEmbed()
      .setColor("RANDOM")
      .addField("User", `${target.tag}`)
      .addField("Moderator", `${message.author.tag}`)
      .addField("Reason", args[2])
      .setFooter(`Lockebot Mute`)
    message.channel.sendEmbed(embed);
  } else
  if (message.content.toLowerCase().startsWith(Prefix + "kick")) {
    var user = message.mentions.users.first();
    if (!message.member.roles.some(r => ["Moderator"].includes(r.name))) message.channel.send(":x: You are not a moderator :hammer:");
    return;
    if (!user) return message.reply("Mention someone to kick them!");
    message.guild.fetchMember(user).then(m => m.kick());
    var embed = new Discord.RichEmbed()
      .setColor("RANDOM")
      .addField("User", args[1])
      .addField("Moderator", message.author.tag)
      .addField("Reason", arg[2])
      .setFooter(`Lockebot Mute As Of [TEST]`)
    message.channel.sendEmbed(embed);
  } else
  if (message.content.toLowerCase().startsWith(Prefix + "okick")) {
    var target = message.mentions.users.first()
    if (message.author.id !== "82173389657079808") return;
    message.guild.fetchMember(target).then(m => m.kick());
  } else
  if (message.content.toLowerCase().startsWith(Prefix + "help")) {
    message.reply(":white_check_mark: I have sent a list of commands to you check your DM's :white_check_mark:")
    message.author.send()
    var embed = new Discord.RichEmbed()
      .setColor(0x4BF92E)
      .setFooter("More Commands Coming Send me Ideas at Dawn#7610")
      .setTitle("Commands")
      .addField("Prefix", Prefix, true)
      .addField("Commands", "noticeme, 8ball, info, dice, embed, lmgtfy [string], joke, gif, chuckjoke", true)
      .addField("Mod Commands", "Kick,(kick) Ban", true)
      .addField("Notes", "None")
    message.author.sendEmbed(embed);
  }
});
client.login(token);