import {createShips} from './src/index.js';
import {gameboard, g} from "./src/gameboard.js";
import {placeCarrier} from "./src/placeShips.js";

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

test("return path between two squares on gameboard", () => {
  let g = new gameboard();
  let startingSquare = "1,1"; //must be a string
  let endingSquare = "2,2";
  function addVertsAndEdges() {

    for(let i = 1; i < 11; i++) {
        for(let j = 1; j < 11; j++) {
            g.addVertex(`${i},${j}`); //must be added as string, adding as array causes problems
        }
    }

    for(let i = 1; i < 11; i++) {
        for(let j = 1; j < 11; j++) { //coordinates must be added as strings, adding as arrays causes problems
            g.addEdge(`${i},${j}`,`${i},${j + 1}`);
            g.addEdge(`${i},${j}`,`${i + 1},${j}`);
            g.addEdge(`${i},${j}`,`${i},${j - 1}`);
            g.addEdge(`${i},${j}`,`${i - 1},${j}`);
            
        }
    }
    
}
 addVertsAndEdges(); 
  //expect(g.vertices).toBe("poop");
  expect(g.bfs(startingSquare, endingSquare)).toBe({"ShortestPath": "1,1-->1,2-->2,2"})
})

test("push coordinates to ship object and return them", () => {
  expect(placeCarrier("1,1", "1,5", "carrier")).toStrictEqual("carrier");

})

test("ship is attacked and function returns number of hits", () => {
  g.receiveAttack("1,2");
  expect(g.receiveAttack("1,7")).toBe("miss");
})

