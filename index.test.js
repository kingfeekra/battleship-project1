import {createShips} from './src/index.js';
import {gameboard, playerBoard} from "./src/gameboard.js";
import {placeShip} from "./src/placeShips.js";
import {player1} from "./src/players.js";

test("returns player name", () => {
  expect(createShips("player1")).toMatchObject({player: "player1",
  ships: {
    carrier: {
      length: 5,
      hits: 0,
      sunk: false,
      hit: function() {
        this.hits++;
      },
      isSunk: function() {
        if(this.hits >= this.length) {
          this.sunk = true;
        }
      }
    },
    battleship: {
      length: 4,
      hits: 0,
      sunk: false,
      hit: function() {
        this.hits++;
      },
      isSunk: function() {
        if(this.hits >= this.length) {
          this.sunk = true;
        }
      }
    },
    cruiser : {
      length: 3,
      hits: 0,
      sunk: false,
      hit: function() {
        this.hits++;
      },
      isSunk: function() {
        if(this.hits >= this.length) {
          this.sunk = true;
        }
      }
    },
    submarine: {
      length: 2,
      hits: 0,
      sunk: false,
      hit: function() {
        this.hits++;
      },
      isSunk: function() {
        if(this.hits >= this.length) {
          this.sunk = true;
        }
      }
    },
    destroyer: {
      length: 1,
      hits: 0,
      sunk: false,
      hit: function() {
        this.hits++;
      },
      isSunk: function() {
        if(this.hits >= this.length) {
          this.sunk = true;
        }
      }
  }}})
})

test("returns number of hits after hit function is run", () =>{
  let player1 = new createShips(player1);
  player1.ships.carrier.hit();
  expect(player1.ships.carrier.hits).toBe(1);
})

test("run isSunk function and return sunk property as true", () => {
  let player1 = new createShips(player1);
  player1.ships.carrier.hits = 5;
  player1.ships.carrier.isSunk();
  expect(player1.ships.carrier.sunk).toBe(true);
})

test("push coordinates to ship object and return them", () => {
  expect(placeShip("1,1", "1,5", "carrier")).toStrictEqual("carrier");

})

test("ship is attacked and function returns number of hits", () => {
  player1.gameboard.receiveAttack(player1, "1,2");
  expect(player1.gameboard.receiveAttack(player1, "1,7")).toBe("miss");
})

