var room;
client
  .joinOrCreate("game_room")
  .then((room_instance) => {
    room = room_instance;
    room.state.board.onAdd = function (card, id) {
      card.onChange = function (changes) {
        console.log(card.id);
        card.tokens.onAdd = function (token) {
          console.log("added", card.id);
        };
        card.tokens.onRemove = function (token) {
          console.log("removed", card.id);
        };
      };
      //card.triggerAll();
    };
    room.state.players.onAdd = function (player, sessionId) {
      player.onChange = function (changes) {
        console.log(changes);
      };
      //player.triggerAll();
    };
  })
  .catch((err) => console.log("chuchu", err));

//my function
function Random(lowestNumber, highestNumber) {
  return Math.floor(Math.random() * (highestNumber - lowestNumber) + lowestNumber);
}
//sleep function
function sleepFor(sleepDuration) {
  var now = new Date().getTime();
  while (new Date().getTime() < now + sleepDuration) {}
}
function spin() {
  let steps = Random(1, 12);
  CatchIter(steps);
}
function CatchIter(steps) {
  if (steps == 0) return;
  room.send("spinner", steps);
  sleepFor(1500);
  CatchIter(steps - 1);
}
