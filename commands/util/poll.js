const Discord = require('discord.js');
module.exports.variables = {
    command: "Help",
    file: "help.js",
    enabled: true,
    locked: false, //makes only owner use it 
};

module.exports.run = (message, args) => {
    if (!message.member.roles.some(r => ["Moderator"].includes(r.name))) message.channel.send(":x: You are not a moderator :hammer:"); return;
    message.guild.channels.find("name", "announcements").send(`Poll by ${message.author.username}:\n${argz}\n@everyone`)
      .then(function (message) {
        message.react("✅")
        message.react("❌")
      })
}
