import {sum, createShips} from './src/index.js';

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

