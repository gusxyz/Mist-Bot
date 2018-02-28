exports.run = (client, message, args) => {
  if (!message.member.roles.some(r => ["Moderator"].includes(r.name))) message.channel.send(":x: You are not a moderator :hammer:"); return;
  var messagecount = parseInt(args.join(" "));
  message.channel.fetchMessages({
    limit: messagecount
  }).then(messages => message.channel.bulkDelete(messages));
}