import { Server } from "colyseus";
import { createServer } from "http";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import { RoomCreation, Online_Search } from "./Rooms.js";
import serveIndex from "serve-index";
import { monitor } from "@colyseus/monitor";

//middle-wares
const app = express();
app.use("/", serveIndex(path.join(__dirname, "static"), { "icons": true }));
app.use("/", express.static(path.join(__dirname, "static")));
app.use("/colyseus", monitor());

//my express game server
export const gameServer = new Server({
  server: createServer(app),
});

//defining creation room
gameServer.define("create_room", RoomCreation).enableRealtimeListing();
//defining online matchmaker!
gameServer.define("online_query", Online_Search).enableRealtimeListing();
//listening to client
gameServer.listen(2567);
