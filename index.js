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
// https://icanhazdadjoke.com/
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
        if (message.content.toLowerCase().startsWith(Prefix + "e621")) {
          var options = {
            method: 'POST',
            uri: 'https://e621.net/post/index.json',
            body: {
                "limit": 1000
            },
            headers: {
                "User-Agent": "node-e621/1.0 "
            },
            json: true // Automatically stringifies the body to JSON 
        };
        request(options, function (error, response, body) {
        var object = body[Math.floor(Math.random() * body.length)]
        var image = object["file_url"]
        var embed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setImage(image)
          message.channel.send({embed});
        });
        } else 
    if (message.content.toLowerCase().startsWith(Prefix + "suggest")) {
      trello.addCard(`${message.author.tag}'s Suggestion`, args.join(" "), "5a5153d415d94b0c4ee89ebe",
        function (error, trelloCard) {
          if (error) {
            console.log('Could not add card:', error);
          } else {
            console.log('Added card:', trelloCard);
          }
        });
    } else
    if(message.content.toLowerCase().startsWith(Prefix + "penis")) {
    var i = 0;
    var pen = "8";
    var length = Math.floor(Math.random() * 25)
    if(message.author.id === "82173389657079808") {
    
    message.reply("This is your penis " + "8=================================================D")
  } else {
    while(i != length) {
      pen = pen + "="
      i = i + 1;
      }
      pen = pen + "D"
    message.reply("This is your penis " + pen)
  }
    } else
    if(message.content.toLowerCase().startsWith(Prefix + "gay")) {
  var gayPerecent = Math.floor(Math.random() * 100)
  if(message.mentions.users.first()) {
    var user = message.mentions.users.first()
    var embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor("Lockebot")
    .setFooter(`${message.author.username} requested this command`)
    if(gayPerecent > 50) {
    embed.setDescription(`${user.username} is ${gayPerecent}% gay :rainbow:`)
    } else {
    embed.setDescription(`${user.username} is ${gayPerecent}% gay 👍`)
    }
      message.channel.send({embed});
  } else {
    var embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor("Lockebot")
    .setFooter(`${message.author.username} requested this command`)
    if(gayPerecent > 50) {
    embed.setDescription(`${message.author.username} is ${gayPerecent}% gay :rainbow:`)
    } else {
    embed.setDescription(`${message.author.username} is ${gayPerecent}% gay 👍`)
    }
      message.channel.send({embed});
  }
  } else
  if(message.content.toLowerCase().startsWith(Prefix + "ship")) {
    if(message.mentions.users.array()[0]) {
    var user = message.mentions.users.array()[0]["username"];
    if (message.mentions.users.array()[1]) {
    var user1 = message.mentions.users.array()[1]["username"];
    var leng = user.length
    var leng1 = user1.length
    if(user && user1) {
    var take = user.substring(0,leng * 0.5)
    var take1 = user1.substring(leng1 * 0.5,leng1)
    var shipname = (take + take1)
    var embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor("Lockebot")
    .setFooter(`${message.author.username} requested this command`)
    .setDescription(`❤ Aww the shipname is ${shipname} ❤`)
      message.channel.send({embed});
    } else {
      message.reply("Hey bud, looks like you forgot to mention somebody")
    }
    } else {
      message.reply("Hey bud, looks like you forgot to mention somebody")
    }
    }
  } else  
    if (message.content.toLowerCase().startsWith(Prefix + "poll")) {
    if (!message.member.roles.some(r => ["Moderator"].includes(r.name))) message.channel.send(":x: You are not a moderator :hammer:"); return;
    message.guild.channels.find("name", "announcements").send(`Poll by ${message.author.username}:\n${args.join(" ")}\n@everyone`)
      .then(function (message) {
        message.react("✅")
        message.react("❌")
      })
  } else
  if (message.content.toLowerCase().startsWith(Prefix + "nytimes")) {
    request({url: "https://api.nytimes.com/svc/search/v2/articlesearch.json",qs: {'api-key': "103bcbbc35c6467791de7991b6a90e6b",'q': args.join(" ")},}, function (error, response, body) {
    var body = JSON.parse(body)
    var articles = body["response"].docs
    var number = Math.floor(Math.random() * articles.length)
    var article = articles[number]
    var embed = new Discord.RichEmbed()
    .setAuthor("The New York Times","http://images.genius.com/b2a54275b0619d84fe7a1abf5fb4d9cb.1000x1000x1.png")
    .setColor("RANDOM")
    .setTitle(article["headline"]["main"])
    .setURL(article["web_url"])
    .setDescription(article["snippet"])
    embed.setThumbnail(`https://nytimes.com/${article.multimedia[0]["url"]}`)
    embed.setFooter(body["copyright"])
      message.channel.send({embed});
    });//
  }else
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
  if (message.content.toLowerCase().startsWith(Prefix + "testin")) {
    request(`https://groups.roblox.com/v1/groups/860594/roles/5673271/users?limit=100`, function (error, response, body) {
      var jsonbod = JSON.parse(body)
      var data = jsonbod["data"]
      console.log(data)
      var i = 0
      while(i != data.length) {
        message.channel.send(data[i]["username"])
        i++
      }
    });
  } else
   if (message.content.toLowerCase().startsWith(Prefix + "joke")) {
        const options = {
        method: 'GET',
        url: 'https://icanhazdadjoke.com/',
        json: true
        }
  request(options, function (error, response, body) {
    var embed = new Discord.RichEmbed()
    .setColor("RANDOM")   
    .setDescription(body.joke)
    .setAuthor("Lockebot")
    .setFooter(`${message.author.username} requested this command`)
      message.channel.send({embed});
    })
  } else 
    if (message.content.toLowerCase().startsWith(Prefix + "roblox")) {
     
      var options = {
      method: "GET",
      url: `https://api.roblox.com/users/get-by-username?username=${args.join(" ")}`,
    }
      request(options, function (error, response, body) {
        var data = JSON.parse(body)
        var username = data["Username"]
        var iD = data["Id"]
          request(`https://rprxy.xyz/proxy/api/usernames/${iD}`, function (error, response, body) {
            var pastnames = JSON.parse(body)
            var embed = new Discord.RichEmbed()
              .setColor("RANDOM")
              .setThumbnail(`https://www.roblox.com/Thumbs/Avatar.ashx?x=250&y=250&userId=${iD}`)
              .setTitle(`${username}'s ROBLOX info`)
              .addField("Username:", username)
              .addField("UserId", iD)
              .addField("Past Usernames", pastnames)
              .setURL("Profile Link", `https://www.roblox.com/users/${iD}/profile`)
            message.author.sendEmbed(embed)
          });
        });
    } else
  if (message.content.toLowerCase().startsWith(Prefix + "groups")) {
    request(`https://api.roblox.com/users/get-by-username?username=${args.join(" ")}`, function (error, response, body) {
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
          message.channel.send({embed});
      });
    });
  } else
  if (message.content.toLowerCase().startsWith(Prefix + "meme")) {
    request("https://reddit.com/r/meme/random.json", function (error, response, body) {
       body = JSON.parse(body)
       var bod = body[0]
       var data = bod["data"]
       var children = data["children"]
       var childre = children[0]
       var data2 = childre["data"]
       if(data2["url"].match(".jpg") || data2["url"].match(".png")) {
       var embed = new Discord.RichEmbed()
       .setColor("RANDOM")
       .setAuthor("Lockebot")
       .setTitle("r/meme")
       .setURL(`https://reddit.com${data2["permalink"]}`)
       .setFooter(`Meme by ${data2["author"]}`)
       .setImage(data2["url"])
       message.channel.send({embed});
       } else {
        var embed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor("Lockebot")
        .setTitle("r/meme")
        .setURL(`https://reddit.com${data2["permalink"]}`)
        .setFooter(`Meme by ${data2["author"]}`)
        .setImage(data2["url"]+".jpg")
        message.channel.send({embed});
       }
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
        message.channel.send({embed});
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

      message.channel.send({embed});
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
        message.channel.send({embed});
    } else {
      message.reply("Cant get that user try again.")
    }

  } else
  if (message.content.toLowerCase().startsWith(Prefix + "lmgtfy")) {
    message.channel.send(`http://lmgtfy.com/?q=${args.join("+")}`)
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
    var xd = args.join(" ")
    var imp = xd.length - 1
    if (args.join(" ")[1]) {
      if (xd.substring(imp, xd.length) === "?") {
        var embed = new Discord.RichEmbed()
          .setColor("RANDOM")
          .setDescription(Mball[Math.floor(Math.random() * Mball.length)])
          message.channel.send({embed});;
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
      .addField("User", args.join(" ")[1])
      .addField("Moderator", message.author.tag)
      .addField("Reason", arg[2])
      .setFooter(`Lockebot Mute As Of [TEST]`)
      message.channel.send({embed});;
  } else

  if (message.content.toLowerCase().startsWith(Prefix + "purge")) {
    if (!message.member.roles.some(r => ["Moderator"].includes(r.name))) message.channel.send(":x: You are not a moderator :hammer:");
    return;
    var messagecount = parseInt(args.join(" "));
    message.channel.fetchMessages({
      limit: messagecount
    }).then(messages => message.channel.bulkDelete(messages));
  } else
  if (message.content.toLowerCase().startsWith(Prefix + "mute")) {
    var mtarget = message.guild.member(message.mentions.users.first())
    var target = message.mentions.users.first()
    if (!message.member.roles.some(r => ["Moderator"].includes(r.name))) message.channel.send(":x: You are not a moderator :hammer:"); return;
    mtarget.addRole(message.guild.roles.find("name", "Muted"));
    var embed = new Discord.RichEmbed()
      .setColor("RANDOM")
      .addField("User", `${target.tag}`)
      .addField("Moderator", `${message.author.tag}`)
      .addField("Reason", args.join(" ")[2])
      .setFooter(`Lockebot Mute`)
      message.channel.send({embed});;
  } else
  if (message.content.toLowerCase().startsWith(Prefix + "kick")) {
    var user = message.mentions.users.first();
    if (!message.member.roles.some(r => ["Moderator"].includes(r.name))) message.channel.send(":x: You are not a moderator :hammer:"); return;
    if (!user) return message.reply("Mention someone to kick them!");
    message.guild.fetchMember(user).then(m => m.kick());
    var embed = new Discord.RichEmbed()
      .setColor("RANDOM")
      .addField("User", args.join(" ")[0])
      .addField("Moderator", message.author.tag)
      .addField("Reason", args.join(" ")[1])
      .setFooter(`Lockebot Mute As Of [TEST]`)
      message.channel.send({embed});;
  } else
  if (message.content.toLowerCase().startsWith(Prefix + "okick")) {
    var target = message.mentions.users.first()
    if (message.author.id !== "82173389657079808") return;
    message.guild.fetchMember(target).then(m => m.kick());
  } else
  if (message.content.toLowerCase().startsWith(Prefix + "help")) {
    message.reply(":white_check_mark: I have sent a list of commands to you check your DM's :white_check_mark:")
    message.author.send("```md\n\n# Commands\n\n# noticeme\n# 8ball (question)?\n# dice\n# lmgtfy (search)\n# serverinfo\n# userinfo (tag user)\n# info\n# chuckjoke\n# gif\n# roblox (roblox username)\n# groups (roblox username\n# suggest (send me a suggestion for the bot)\n# nytimes (article)```")
  }
});
client.login(token);