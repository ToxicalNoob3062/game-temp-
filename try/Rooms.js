import { Room } from "colyseus";
import { MonopolyBoard } from "./Schema.js";

//the room where gamers collide!
export class GameRoom extends Room {
  maxClients = 4;
  onCreate(options) {
    this.setState(new MonopolyBoard());
  }
  onJoin(client, options) {
    console.log("Joined To Game Room");
    this.state.createPlayer(client.sessionId);
    this.onMessage("spinner", (client) => {
      let player = this.state.players.get(client.sessionId);
      this.state.Travel(player);
    });
  }
}
