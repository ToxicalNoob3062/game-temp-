/////////////////////// Node event listeners ///////////////////
const event_creator = require("events");
const event_emitters = new event_creator();
//example1 event listeners!
event_emitters.on("sale", () => {
  console.log("some 1");
});
event_emitters.on("sale", (data) => {
  console.log(data);
  console.log("some 2");
});

event_emitters.emit("sale", "I love u Saima");

//example2->event listeners mechanism of servers
let http = require("http");
let sv = http.createServer();
sv.on("request", (req, res) => {
  console.log("req recv");
  console.log("res is something good");
  res.end("happy");
});

sv.on("close", (req, res) => {
  console.log("server closed");
});

//if you dont attach a listener connection will not establish!
sv.listen(8000, "127.0.0.1", () => {
  console.log("listening....");
});
