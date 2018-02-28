const Discord = require("discord.js")
const request = require("request")
exports.run = (client, message, args) => {
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
    });
}