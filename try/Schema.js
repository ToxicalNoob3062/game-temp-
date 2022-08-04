import schema from "./../node_modules/@colyseus/schema/lib/index.js";
const Schema = schema.Schema;
const MapSchema = schema.MapSchema;
const SetSchema = schema.SetSchema;

//askey char generator
function askey(int) {
  return String.fromCharCode(int);
}

//tokens collections
const colors = ["red", "blue", "yellow", "green"];

//card schema for optimizing board states
export class Card extends Schema {
  constructor(id, cost) {
    super();
    this.id = id;
    this.cost = cost;
    this.level = 0;
    this.tokens = new SetSchema();
    this.owner = "none";
  }
}
schema.defineTypes(Card, {
  id: "string",
  level: "number",
  cost: "number",
  tokens: { set: "string" },
  owner: "string",
});

//players class to maintain players state!
export class Player extends Schema {
  constructor() {
    super();
    this.life = 100;
    this.owned = new SetSchema();
    this.token = colors.pop();
    this.pos = 0;
  }
}
schema.defineTypes(Player, {
  life: "number",
  owned: { set: Card },
  token: "string",
  pos: "number",
});

//the main monopoly board which will control all sub states!
export class MonopolyBoard extends Schema {
  constructor() {
    super();
    this.board = new MapSchema();
    this.players = new MapSchema();
    this.currentPlayer = 0;
    for (let i = 0; i < 36; i++) {
      this.board.set(i, new Card(askey(97 + i), 100 * (i + 1)));
    }
  }
  createPlayer(sessionId) {
    const player = new Player();
    this.players.set(sessionId, player);
    this.board.get(0).tokens.add(player.token);
  }

  Travel(player) {
    console.log("W");
    let posi = player.pos;
    let token = player.token;
    let next = posi + 1;
    if (next == 36) next = 0;
    this.board.get(posi).tokens.delete(token);
    this.board.get(next).tokens.add(token);
    player.pos = next;
  }
}
schema.defineTypes(MonopolyBoard, {
  board: { map: Card },
  players: { map: Player },
  currentPlayer: "number",
});
