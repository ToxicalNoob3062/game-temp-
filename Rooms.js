import { Room } from "colyseus";
import { gameServer } from "./server.js";
import { PriorityQueue } from "./Heap.js";
const ORA = new PriorityQueue((a, b) => a.clients > b.clients);

//making  game-room-class for all board!
export class GameRoom extends Room {
  maxClients = 4;
  onCreate(options) {
    console.log("Game room created");
  }
  onJoin(client, options) {
    console.log("Joined To Game Room");
  }
  async onLeave(client, consented) {
    if (consented) {
      throw new Error("Truth is bitter");
    }
    try {
      console.log("Trying to reconnect!");
      await this.allowReconnection(client, 15);
    } catch (err) {
      console.log("took more than x sec");
    }
  }
}

//user will come here and open source to create room!
export class RoomCreation extends Room {
  onJoin(client) {
    gameServer.define(client.id, GameRoom).enableRealtimeListing();
    client.send("completed", client.id);
  }
}

//export OnlineSearch()
export class Online_Search extends Room {
  onJoin(client) {
    if (ORA.size() > 0) {
      ORA.peek().clients++;
      const id = ORA.peek().rName;
      if (ORA.peek().clients == 4) ORA.pop();
      client.send("join", id);
    } else {
      ORA.push({ clients: 1, rName: client.id });
      gameServer.define(client.id, GameRoom).enableRealtimeListing();
      client.send("create", client.id);
    }
  }
}
