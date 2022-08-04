//used for testing
// import { Client } from "colyseus.js";

// let client = new Client("ws://localhost:2567");
var uv;
function Store(room) {
  uv = room;
  localStorage.setItem("roomId", room.id);
  localStorage.setItem("sessionId", room.sessionId);
}
async function Create(options) {
  const creation_room = await client.joinOrCreate("create_room", options);
  creation_room.onMessage("completed", (msg) => {
    client.joinOrCreate(msg).then((room) => {
      console.log(`joined to newly created room ${msg} succesfully!`);
      Store(room);
      room.onLeave(() => reconnect());
      creation_room.leave();
    });
  });
}

//handling Join button
async function Join() {
  const join_id = document.getElementById("join").value;
  try {
    const room = await client.join(join_id);
    Store(room);
    room.onLeave(() => reconnect());
    console.log("client joined succesfully!");
  } catch (err) {
    console.log("Invalid ID");
  }
}

//online match button!
async function Online() {
  const search = await client.joinOrCreate("online_query");
  search.onMessage("join", (msg) => {
    client
      .join(msg)
      .then((room) => {
        console.log("Online join success!");
        Store(room);
        JoiningPage();
        room.onLeave(() => reconnect());
        search.leave();
      })
      .catch((err) => {
        search.leave();
        Online();
      });
  });
  search.onMessage("create", (msg) => {
    client.joinOrCreate(msg).then((room) => {
      console.log("new room created from online!");
      Store(room);
      room.onLeave(() => reconnect());
      search.leave();
    });
  });
}

//try to reconnect!
function reconnect() {
  var roomId = localStorage.getItem("roomId");
  var sessionId = localStorage.getItem("sessionId");
  client
    .reconnect(roomId, sessionId)
    .then((room) => {
      Store(room);
      console.log("Reconnected successfully!");
      room.onLeave(() => reconnect());
    })
    .catch((e) => {
      console.error("Error Time limit exceeded", e);
    });
}

//will disconnect connection!!
function Disconnect() {
  console.log(uv);
  uv.leave(false);
}
