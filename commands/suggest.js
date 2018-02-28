var Trello = require("trello");
var trello = new Trello("4ab69a6f55784a8a21e6f2f154c6fc75", "5dfea0e2aa20920451e23eb5ac95fca81a2cc8019d02bd7c683b0937b35622d5");
exports.run = (client, message, args) => {
    trello.addCard(`${message.author.tag}'s Suggestion`, args.join(" "), "5a5153d415d94b0c4ee89ebe",
    function (error, trelloCard) {
      if (error) {
        console.log('Could not add card:', error);
      } else {
        console.log('Added card:', trelloCard);
      }
    });
}