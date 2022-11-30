import {gameboard} from "../src/gameboard.js"


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
      }
    }

  return {
    player: player,
    ships
  }
}

/*createShips.prototype.hit = function() {
  this.hits++;
  return this.hits;
}*/




export {createShips};