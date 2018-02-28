exports.run = (client, message, args) => {
  if (!message.member.roles.some(r => ["Moderator"].includes(r.name))) message.channel.send(":x: You are not a moderator :hammer:"); return;
  message.guild.channels.find("name", "announcements").send(`Poll by ${message.author.username}:\n${args.join(" ")}\n@everyone`)
    .then(function (message) {
      message.react("✅")
      message.react("❌")
    })
}