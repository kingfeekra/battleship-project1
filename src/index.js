import {gameboard} from "../src/gameboard.js"
import {player1, computer1} from "../src/players.js"
import "./styles.css";
import {board, headings, squareColors} from "./DOMstuff.js"

function createShips(player) {
  const ships = {
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
      destroyer: {
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
      }
    }

  return {
    player: player,
    ships
  }
}

function areShipsSunk(player) {
  let sunkArray = []
  let shipsArray = Object.keys(player.ships.ships);
  for(let i = 0; i < shipsArray.length; i++) {
    player.ships.ships[shipsArray[i]].isSunk();
    sunkArray.push(player.ships.ships[shipsArray[i]].sunk);
  }
  if(sunkArray.every(element => element === true) === true) {
    if(player == player1) {
      if(alert('You Lose!')){}
      else { 
        window.location.reload();
      }
    }
    else if(player == computer1) {
      if(alert('You Win!')){}
      else { 
        window.location.reload();
      }
    }
  }
}



board(computer1, "computerBoard");
board(player1, "playerBoard");
headings();

squareColors(player1);
squareColors(computer1);
export {createShips, areShipsSunk};