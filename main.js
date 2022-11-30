/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addVertsAndEdges": () => (/* binding */ addVertsAndEdges),
/* harmony export */   "g": () => (/* binding */ g),
/* harmony export */   "gameboard": () => (/* binding */ gameboard)
/* harmony export */ });
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "./src/index.js");


let player1 = new _index_js__WEBPACK_IMPORTED_MODULE_0__.createShips("player1");

class gameboard {
    constructor() {
        this.vertices = [];
        this.adjacent = {};
        this.edges = 0;
        this.squares = {}
    }

    addVertex(v) {
        this.vertices.push(v);
        this.adjacent[v] = [];
        this.squares[v] = false;
    }

    addEdge(v, w) {
        let test = w;
        if(test.includes(-1) || test.includes(0)
           || test.includes(9) || test.includes(10)) {
            return;
        } //get rid of coordinates not on chessboard
            
        this.adjacent[v].push(w);
        //this.adjacent[w].push(v);
        this.edges++;
    }

    receiveAttack(coord) {
        /*if(this.squares[coord] != false && this.squares[coord] != "hit") {
            player1.ships[this.squares[coord]].hit();
            this.squares[coord] = "hit";
        }*/
        if(Object.keys(player1.ships).includes(this.squares[coord])) {
            player1.ships[this.squares[coord]].hit();
            this.squares[coord] = "hit";
        }
        else if(this.squares[coord] == false) {
            this.squares[coord] = "miss";
            return this.squares[coord];
        }
    }

    bfs(root, goal, shipName) { //breadth first search algorithm to find shortest path between two squares
        let adj = this.adjacent;

        const queue = [];
        queue.push(root);

        const discovered = [];
        discovered[root] = true;
        
        const edges = [];
        edges[root] = 0;

        //add vertices array and initialize it with root
        const predecessors = [];
        predecessors[root] = null;

        const buildPath = (goal, root, predecessors) => {
            const stack = []; //declare and initialize a "stack"
            stack.push(goal); //push our goal to the stack

            let u = predecessors[goal];

            while(u != root) {
                stack.push(u); //push each predecessor to the stack
                u = predecessors[u];
            }

            stack.push(root);
            for(let i = 0; i < stack.length; i++) {
            this.squares[stack[i]] = shipName;
            }
            console.log(stack);
            let path = stack.reverse().join('-->'); //join coordinates together to form path

            return path;
        }

        while(queue.length) {
            let v = queue.shift();

            if (v === goal) { //if our goal comes up in queue, return shortest path to goal
                return {
                    ShortestPath: buildPath(goal, root, predecessors)
                }
            }

            for (let i = 0; i < adj[v].length; i++) {
                if (!discovered[adj[v][i]]) {
                    discovered[adj[v][i]] = true; //if next vertex not discovered, make it discovered
                    queue.push(adj[v][i]); //push next vertex to queue
                    edges[adj[v][i]] = edges[v] + 1; //edges of previous vertex plus 1
                    predecessors[adj[v][i]] = v //create a key in vertices array with the current vertex
                    //assign it a value of its predecessor
                }
            }
        }

        return false;
    }
}

const g = new gameboard();
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

let startingSquare = "1,1"; //must be a string
let endingSquare = "1,5";

addVertsAndEdges();
console.log(`The shortest path from ${startingSquare} to ${endingSquare}:`);
//console.log(g.bfs("1,1","1,5"));



/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createShips": () => (/* binding */ createShips)
/* harmony export */ });
/* harmony import */ var _src_gameboard_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src/gameboard.js */ "./src/gameboard.js");



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






/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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d2VicGFjazovL2JhdHRsZXNoaXAtcHJvamVjdC8uL3NyYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC1wcm9qZWN0Ly4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAtcHJvamVjdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLXByb2plY3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAtcHJvamVjdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAtcHJvamVjdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAtcHJvamVjdC93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2JhdHRsZXNoaXAtcHJvamVjdC93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC1wcm9qZWN0L3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2NyZWF0ZVNoaXBzfSBmcm9tIFwiLi9pbmRleC5qc1wiO1xuXG5sZXQgcGxheWVyMSA9IG5ldyBjcmVhdGVTaGlwcyhcInBsYXllcjFcIik7XG5cbmNsYXNzIGdhbWVib2FyZCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMudmVydGljZXMgPSBbXTtcbiAgICAgICAgdGhpcy5hZGphY2VudCA9IHt9O1xuICAgICAgICB0aGlzLmVkZ2VzID0gMDtcbiAgICAgICAgdGhpcy5zcXVhcmVzID0ge31cbiAgICB9XG5cbiAgICBhZGRWZXJ0ZXgodikge1xuICAgICAgICB0aGlzLnZlcnRpY2VzLnB1c2godik7XG4gICAgICAgIHRoaXMuYWRqYWNlbnRbdl0gPSBbXTtcbiAgICAgICAgdGhpcy5zcXVhcmVzW3ZdID0gZmFsc2U7XG4gICAgfVxuXG4gICAgYWRkRWRnZSh2LCB3KSB7XG4gICAgICAgIGxldCB0ZXN0ID0gdztcbiAgICAgICAgaWYodGVzdC5pbmNsdWRlcygtMSkgfHwgdGVzdC5pbmNsdWRlcygwKVxuICAgICAgICAgICB8fCB0ZXN0LmluY2x1ZGVzKDkpIHx8IHRlc3QuaW5jbHVkZXMoMTApKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gLy9nZXQgcmlkIG9mIGNvb3JkaW5hdGVzIG5vdCBvbiBjaGVzc2JvYXJkXG4gICAgICAgICAgICBcbiAgICAgICAgdGhpcy5hZGphY2VudFt2XS5wdXNoKHcpO1xuICAgICAgICAvL3RoaXMuYWRqYWNlbnRbd10ucHVzaCh2KTtcbiAgICAgICAgdGhpcy5lZGdlcysrO1xuICAgIH1cblxuICAgIHJlY2VpdmVBdHRhY2soY29vcmQpIHtcbiAgICAgICAgLyppZih0aGlzLnNxdWFyZXNbY29vcmRdICE9IGZhbHNlICYmIHRoaXMuc3F1YXJlc1tjb29yZF0gIT0gXCJoaXRcIikge1xuICAgICAgICAgICAgcGxheWVyMS5zaGlwc1t0aGlzLnNxdWFyZXNbY29vcmRdXS5oaXQoKTtcbiAgICAgICAgICAgIHRoaXMuc3F1YXJlc1tjb29yZF0gPSBcImhpdFwiO1xuICAgICAgICB9Ki9cbiAgICAgICAgaWYoT2JqZWN0LmtleXMocGxheWVyMS5zaGlwcykuaW5jbHVkZXModGhpcy5zcXVhcmVzW2Nvb3JkXSkpIHtcbiAgICAgICAgICAgIHBsYXllcjEuc2hpcHNbdGhpcy5zcXVhcmVzW2Nvb3JkXV0uaGl0KCk7XG4gICAgICAgICAgICB0aGlzLnNxdWFyZXNbY29vcmRdID0gXCJoaXRcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKHRoaXMuc3F1YXJlc1tjb29yZF0gPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHRoaXMuc3F1YXJlc1tjb29yZF0gPSBcIm1pc3NcIjtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNxdWFyZXNbY29vcmRdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYmZzKHJvb3QsIGdvYWwsIHNoaXBOYW1lKSB7IC8vYnJlYWR0aCBmaXJzdCBzZWFyY2ggYWxnb3JpdGhtIHRvIGZpbmQgc2hvcnRlc3QgcGF0aCBiZXR3ZWVuIHR3byBzcXVhcmVzXG4gICAgICAgIGxldCBhZGogPSB0aGlzLmFkamFjZW50O1xuXG4gICAgICAgIGNvbnN0IHF1ZXVlID0gW107XG4gICAgICAgIHF1ZXVlLnB1c2gocm9vdCk7XG5cbiAgICAgICAgY29uc3QgZGlzY292ZXJlZCA9IFtdO1xuICAgICAgICBkaXNjb3ZlcmVkW3Jvb3RdID0gdHJ1ZTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGVkZ2VzID0gW107XG4gICAgICAgIGVkZ2VzW3Jvb3RdID0gMDtcblxuICAgICAgICAvL2FkZCB2ZXJ0aWNlcyBhcnJheSBhbmQgaW5pdGlhbGl6ZSBpdCB3aXRoIHJvb3RcbiAgICAgICAgY29uc3QgcHJlZGVjZXNzb3JzID0gW107XG4gICAgICAgIHByZWRlY2Vzc29yc1tyb290XSA9IG51bGw7XG5cbiAgICAgICAgY29uc3QgYnVpbGRQYXRoID0gKGdvYWwsIHJvb3QsIHByZWRlY2Vzc29ycykgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc3RhY2sgPSBbXTsgLy9kZWNsYXJlIGFuZCBpbml0aWFsaXplIGEgXCJzdGFja1wiXG4gICAgICAgICAgICBzdGFjay5wdXNoKGdvYWwpOyAvL3B1c2ggb3VyIGdvYWwgdG8gdGhlIHN0YWNrXG5cbiAgICAgICAgICAgIGxldCB1ID0gcHJlZGVjZXNzb3JzW2dvYWxdO1xuXG4gICAgICAgICAgICB3aGlsZSh1ICE9IHJvb3QpIHtcbiAgICAgICAgICAgICAgICBzdGFjay5wdXNoKHUpOyAvL3B1c2ggZWFjaCBwcmVkZWNlc3NvciB0byB0aGUgc3RhY2tcbiAgICAgICAgICAgICAgICB1ID0gcHJlZGVjZXNzb3JzW3VdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzdGFjay5wdXNoKHJvb3QpO1xuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHN0YWNrLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLnNxdWFyZXNbc3RhY2tbaV1dID0gc2hpcE5hbWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhzdGFjayk7XG4gICAgICAgICAgICBsZXQgcGF0aCA9IHN0YWNrLnJldmVyc2UoKS5qb2luKCctLT4nKTsgLy9qb2luIGNvb3JkaW5hdGVzIHRvZ2V0aGVyIHRvIGZvcm0gcGF0aFxuXG4gICAgICAgICAgICByZXR1cm4gcGF0aDtcbiAgICAgICAgfVxuXG4gICAgICAgIHdoaWxlKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICAgICAgbGV0IHYgPSBxdWV1ZS5zaGlmdCgpO1xuXG4gICAgICAgICAgICBpZiAodiA9PT0gZ29hbCkgeyAvL2lmIG91ciBnb2FsIGNvbWVzIHVwIGluIHF1ZXVlLCByZXR1cm4gc2hvcnRlc3QgcGF0aCB0byBnb2FsXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgU2hvcnRlc3RQYXRoOiBidWlsZFBhdGgoZ29hbCwgcm9vdCwgcHJlZGVjZXNzb3JzKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhZGpbdl0ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoIWRpc2NvdmVyZWRbYWRqW3ZdW2ldXSkge1xuICAgICAgICAgICAgICAgICAgICBkaXNjb3ZlcmVkW2Fkalt2XVtpXV0gPSB0cnVlOyAvL2lmIG5leHQgdmVydGV4IG5vdCBkaXNjb3ZlcmVkLCBtYWtlIGl0IGRpc2NvdmVyZWRcbiAgICAgICAgICAgICAgICAgICAgcXVldWUucHVzaChhZGpbdl1baV0pOyAvL3B1c2ggbmV4dCB2ZXJ0ZXggdG8gcXVldWVcbiAgICAgICAgICAgICAgICAgICAgZWRnZXNbYWRqW3ZdW2ldXSA9IGVkZ2VzW3ZdICsgMTsgLy9lZGdlcyBvZiBwcmV2aW91cyB2ZXJ0ZXggcGx1cyAxXG4gICAgICAgICAgICAgICAgICAgIHByZWRlY2Vzc29yc1thZGpbdl1baV1dID0gdiAvL2NyZWF0ZSBhIGtleSBpbiB2ZXJ0aWNlcyBhcnJheSB3aXRoIHRoZSBjdXJyZW50IHZlcnRleFxuICAgICAgICAgICAgICAgICAgICAvL2Fzc2lnbiBpdCBhIHZhbHVlIG9mIGl0cyBwcmVkZWNlc3NvclxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG5cbmNvbnN0IGcgPSBuZXcgZ2FtZWJvYXJkKCk7XG5mdW5jdGlvbiBhZGRWZXJ0c0FuZEVkZ2VzKCkge1xuXG4gICAgZm9yKGxldCBpID0gMTsgaSA8IDExOyBpKyspIHtcbiAgICAgICAgZm9yKGxldCBqID0gMTsgaiA8IDExOyBqKyspIHtcbiAgICAgICAgICAgIGcuYWRkVmVydGV4KGAke2l9LCR7an1gKTsgLy9tdXN0IGJlIGFkZGVkIGFzIHN0cmluZywgYWRkaW5nIGFzIGFycmF5IGNhdXNlcyBwcm9ibGVtc1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZm9yKGxldCBpID0gMTsgaSA8IDExOyBpKyspIHtcbiAgICAgICAgZm9yKGxldCBqID0gMTsgaiA8IDExOyBqKyspIHsgLy9jb29yZGluYXRlcyBtdXN0IGJlIGFkZGVkIGFzIHN0cmluZ3MsIGFkZGluZyBhcyBhcnJheXMgY2F1c2VzIHByb2JsZW1zXG4gICAgICAgICAgICBnLmFkZEVkZ2UoYCR7aX0sJHtqfWAsYCR7aX0sJHtqICsgMX1gKTtcbiAgICAgICAgICAgIGcuYWRkRWRnZShgJHtpfSwke2p9YCxgJHtpICsgMX0sJHtqfWApO1xuICAgICAgICAgICAgZy5hZGRFZGdlKGAke2l9LCR7an1gLGAke2l9LCR7aiAtIDF9YCk7XG4gICAgICAgICAgICBnLmFkZEVkZ2UoYCR7aX0sJHtqfWAsYCR7aSAtIDF9LCR7an1gKTtcbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgfVxuICAgIFxufVxuXG5sZXQgc3RhcnRpbmdTcXVhcmUgPSBcIjEsMVwiOyAvL211c3QgYmUgYSBzdHJpbmdcbmxldCBlbmRpbmdTcXVhcmUgPSBcIjEsNVwiO1xuXG5hZGRWZXJ0c0FuZEVkZ2VzKCk7XG5jb25zb2xlLmxvZyhgVGhlIHNob3J0ZXN0IHBhdGggZnJvbSAke3N0YXJ0aW5nU3F1YXJlfSB0byAke2VuZGluZ1NxdWFyZX06YCk7XG4vL2NvbnNvbGUubG9nKGcuYmZzKFwiMSwxXCIsXCIxLDVcIikpO1xuXG5leHBvcnQge2csIGdhbWVib2FyZCwgYWRkVmVydHNBbmRFZGdlc30iLCJpbXBvcnQge2dhbWVib2FyZH0gZnJvbSBcIi4uL3NyYy9nYW1lYm9hcmQuanNcIlxuXG5cbmZ1bmN0aW9uIGNyZWF0ZVNoaXBzKHBsYXllcikge1xuICBjb25zdCBzaGlwcyA9IHtcbiAgICAgIGNhcnJpZXI6IHtcbiAgICAgICAgbGVuZ3RoOiA1LFxuICAgICAgICBoaXRzOiAwLFxuICAgICAgICBzdW5rOiBmYWxzZSxcbiAgICAgICAgaGl0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICB0aGlzLmhpdHMrKztcbiAgICAgICAgfSxcbiAgICAgICAgaXNTdW5rOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZih0aGlzLmhpdHMgPj0gdGhpcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuc3VuayA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgYmF0dGxlc2hpcDoge1xuICAgICAgICBsZW5ndGg6IDQsXG4gICAgICAgIGhpdHM6IDAsXG4gICAgICAgIHN1bms6IGZhbHNlLFxuICAgICAgICBoaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHRoaXMuaGl0cysrO1xuICAgICAgICB9LFxuICAgICAgICBpc1N1bms6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmKHRoaXMuaGl0cyA+PSB0aGlzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5zdW5rID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBjcnVpc2VyIDoge1xuICAgICAgICBsZW5ndGg6IDMsXG4gICAgICAgIGhpdHM6IDAsXG4gICAgICAgIHN1bms6IGZhbHNlLFxuICAgICAgICBoaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHRoaXMuaGl0cysrO1xuICAgICAgICB9LFxuICAgICAgICBpc1N1bms6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmKHRoaXMuaGl0cyA+PSB0aGlzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5zdW5rID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBzdWJtYXJpbmU6IHtcbiAgICAgICAgbGVuZ3RoOiAyLFxuICAgICAgICBoaXRzOiAwLFxuICAgICAgICBzdW5rOiBmYWxzZSxcbiAgICAgICAgaGl0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICB0aGlzLmhpdHMrKztcbiAgICAgICAgfSxcbiAgICAgICAgaXNTdW5rOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZih0aGlzLmhpdHMgPj0gdGhpcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuc3VuayA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZGVzdHJveWVyOiB7XG4gICAgICAgIGxlbmd0aDogMSxcbiAgICAgICAgaGl0czogMCxcbiAgICAgICAgc3VuazogZmFsc2UsXG4gICAgICAgIGhpdDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdGhpcy5oaXRzKys7XG4gICAgICAgIH0sXG4gICAgICAgIGlzU3VuazogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYodGhpcy5oaXRzID49IHRoaXMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLnN1bmsgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICByZXR1cm4ge1xuICAgIHBsYXllcjogcGxheWVyLFxuICAgIHNoaXBzXG4gIH1cbn1cblxuLypjcmVhdGVTaGlwcy5wcm90b3R5cGUuaGl0ID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuaGl0cysrO1xuICByZXR1cm4gdGhpcy5oaXRzO1xufSovXG5cblxuXG5cbmV4cG9ydCB7Y3JlYXRlU2hpcHN9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=