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
/* harmony export */   "computerBoard": () => (/* binding */ computerBoard),
/* harmony export */   "gameboard": () => (/* binding */ gameboard),
/* harmony export */   "playerBoard": () => (/* binding */ playerBoard)
/* harmony export */ });
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "./src/index.js");


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
        this.edges++;
    }

    receiveAttack(player, coord) {
        if(Object.keys(player.ships).includes(this.squares[coord])) {
            player.ships[this.squares[coord]].hit();
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

const playerBoard = new gameboard();
const computerBoard = new gameboard();
function addVertsAndEdges(board) {

    for(let i = 1; i < 11; i++) {
        for(let j = 1; j < 11; j++) {
            board.addVertex(`${i},${j}`); //must be added as string, adding as array causes problems
        }
    }

    for(let i = 1; i < 11; i++) {
        for(let j = 1; j < 11; j++) { //coordinates must be added as strings, adding as arrays causes problems
            board.addEdge(`${i},${j}`,`${i},${j + 1}`);
            board.addEdge(`${i},${j}`,`${i + 1},${j}`);
            board.addEdge(`${i},${j}`,`${i},${j - 1}`);
            board.addEdge(`${i},${j}`,`${i - 1},${j}`);
            
        }
    }
    
}
addVertsAndEdges(playerBoard);
addVertsAndEdges(computerBoard);

let startingSquare = "1,1"; //must be a string
let endingSquare = "1,5";

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ym9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC1wcm9qZWN0Ly4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAtcHJvamVjdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLXByb2plY3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAtcHJvamVjdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAtcHJvamVjdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAtcHJvamVjdC93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2JhdHRsZXNoaXAtcHJvamVjdC93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC1wcm9qZWN0L3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2NyZWF0ZVNoaXBzfSBmcm9tIFwiLi9pbmRleC5qc1wiO1xuXG5jbGFzcyBnYW1lYm9hcmQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnZlcnRpY2VzID0gW107XG4gICAgICAgIHRoaXMuYWRqYWNlbnQgPSB7fTtcbiAgICAgICAgdGhpcy5lZGdlcyA9IDA7XG4gICAgICAgIHRoaXMuc3F1YXJlcyA9IHt9XG4gICAgfVxuXG4gICAgYWRkVmVydGV4KHYpIHtcbiAgICAgICAgdGhpcy52ZXJ0aWNlcy5wdXNoKHYpO1xuICAgICAgICB0aGlzLmFkamFjZW50W3ZdID0gW107XG4gICAgICAgIHRoaXMuc3F1YXJlc1t2XSA9IGZhbHNlO1xuICAgIH1cblxuICAgIGFkZEVkZ2Uodiwgdykge1xuICAgICAgICBsZXQgdGVzdCA9IHc7XG4gICAgICAgIGlmKHRlc3QuaW5jbHVkZXMoLTEpIHx8IHRlc3QuaW5jbHVkZXMoMClcbiAgICAgICAgICAgfHwgdGVzdC5pbmNsdWRlcyg5KSB8fCB0ZXN0LmluY2x1ZGVzKDEwKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9IC8vZ2V0IHJpZCBvZiBjb29yZGluYXRlcyBub3Qgb24gY2hlc3Nib2FyZFxuICAgICAgICAgICAgXG4gICAgICAgIHRoaXMuYWRqYWNlbnRbdl0ucHVzaCh3KTtcbiAgICAgICAgdGhpcy5lZGdlcysrO1xuICAgIH1cblxuICAgIHJlY2VpdmVBdHRhY2socGxheWVyLCBjb29yZCkge1xuICAgICAgICBpZihPYmplY3Qua2V5cyhwbGF5ZXIuc2hpcHMpLmluY2x1ZGVzKHRoaXMuc3F1YXJlc1tjb29yZF0pKSB7XG4gICAgICAgICAgICBwbGF5ZXIuc2hpcHNbdGhpcy5zcXVhcmVzW2Nvb3JkXV0uaGl0KCk7XG4gICAgICAgICAgICB0aGlzLnNxdWFyZXNbY29vcmRdID0gXCJoaXRcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKHRoaXMuc3F1YXJlc1tjb29yZF0gPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHRoaXMuc3F1YXJlc1tjb29yZF0gPSBcIm1pc3NcIjtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNxdWFyZXNbY29vcmRdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYmZzKHJvb3QsIGdvYWwsIHNoaXBOYW1lKSB7IC8vYnJlYWR0aCBmaXJzdCBzZWFyY2ggYWxnb3JpdGhtIHRvIGZpbmQgc2hvcnRlc3QgcGF0aCBiZXR3ZWVuIHR3byBzcXVhcmVzXG4gICAgICAgIGxldCBhZGogPSB0aGlzLmFkamFjZW50O1xuXG4gICAgICAgIGNvbnN0IHF1ZXVlID0gW107XG4gICAgICAgIHF1ZXVlLnB1c2gocm9vdCk7XG5cbiAgICAgICAgY29uc3QgZGlzY292ZXJlZCA9IFtdO1xuICAgICAgICBkaXNjb3ZlcmVkW3Jvb3RdID0gdHJ1ZTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGVkZ2VzID0gW107XG4gICAgICAgIGVkZ2VzW3Jvb3RdID0gMDtcblxuICAgICAgICAvL2FkZCB2ZXJ0aWNlcyBhcnJheSBhbmQgaW5pdGlhbGl6ZSBpdCB3aXRoIHJvb3RcbiAgICAgICAgY29uc3QgcHJlZGVjZXNzb3JzID0gW107XG4gICAgICAgIHByZWRlY2Vzc29yc1tyb290XSA9IG51bGw7XG5cbiAgICAgICAgY29uc3QgYnVpbGRQYXRoID0gKGdvYWwsIHJvb3QsIHByZWRlY2Vzc29ycykgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc3RhY2sgPSBbXTsgLy9kZWNsYXJlIGFuZCBpbml0aWFsaXplIGEgXCJzdGFja1wiXG4gICAgICAgICAgICBzdGFjay5wdXNoKGdvYWwpOyAvL3B1c2ggb3VyIGdvYWwgdG8gdGhlIHN0YWNrXG5cbiAgICAgICAgICAgIGxldCB1ID0gcHJlZGVjZXNzb3JzW2dvYWxdO1xuXG4gICAgICAgICAgICB3aGlsZSh1ICE9IHJvb3QpIHtcbiAgICAgICAgICAgICAgICBzdGFjay5wdXNoKHUpOyAvL3B1c2ggZWFjaCBwcmVkZWNlc3NvciB0byB0aGUgc3RhY2tcbiAgICAgICAgICAgICAgICB1ID0gcHJlZGVjZXNzb3JzW3VdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzdGFjay5wdXNoKHJvb3QpO1xuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHN0YWNrLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLnNxdWFyZXNbc3RhY2tbaV1dID0gc2hpcE5hbWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhzdGFjayk7XG4gICAgICAgICAgICBsZXQgcGF0aCA9IHN0YWNrLnJldmVyc2UoKS5qb2luKCctLT4nKTsgLy9qb2luIGNvb3JkaW5hdGVzIHRvZ2V0aGVyIHRvIGZvcm0gcGF0aFxuXG4gICAgICAgICAgICByZXR1cm4gcGF0aDtcbiAgICAgICAgfVxuXG4gICAgICAgIHdoaWxlKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICAgICAgbGV0IHYgPSBxdWV1ZS5zaGlmdCgpO1xuXG4gICAgICAgICAgICBpZiAodiA9PT0gZ29hbCkgeyAvL2lmIG91ciBnb2FsIGNvbWVzIHVwIGluIHF1ZXVlLCByZXR1cm4gc2hvcnRlc3QgcGF0aCB0byBnb2FsXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgU2hvcnRlc3RQYXRoOiBidWlsZFBhdGgoZ29hbCwgcm9vdCwgcHJlZGVjZXNzb3JzKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhZGpbdl0ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoIWRpc2NvdmVyZWRbYWRqW3ZdW2ldXSkge1xuICAgICAgICAgICAgICAgICAgICBkaXNjb3ZlcmVkW2Fkalt2XVtpXV0gPSB0cnVlOyAvL2lmIG5leHQgdmVydGV4IG5vdCBkaXNjb3ZlcmVkLCBtYWtlIGl0IGRpc2NvdmVyZWRcbiAgICAgICAgICAgICAgICAgICAgcXVldWUucHVzaChhZGpbdl1baV0pOyAvL3B1c2ggbmV4dCB2ZXJ0ZXggdG8gcXVldWVcbiAgICAgICAgICAgICAgICAgICAgZWRnZXNbYWRqW3ZdW2ldXSA9IGVkZ2VzW3ZdICsgMTsgLy9lZGdlcyBvZiBwcmV2aW91cyB2ZXJ0ZXggcGx1cyAxXG4gICAgICAgICAgICAgICAgICAgIHByZWRlY2Vzc29yc1thZGpbdl1baV1dID0gdiAvL2NyZWF0ZSBhIGtleSBpbiB2ZXJ0aWNlcyBhcnJheSB3aXRoIHRoZSBjdXJyZW50IHZlcnRleFxuICAgICAgICAgICAgICAgICAgICAvL2Fzc2lnbiBpdCBhIHZhbHVlIG9mIGl0cyBwcmVkZWNlc3NvclxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG5cbmNvbnN0IHBsYXllckJvYXJkID0gbmV3IGdhbWVib2FyZCgpO1xuY29uc3QgY29tcHV0ZXJCb2FyZCA9IG5ldyBnYW1lYm9hcmQoKTtcbmZ1bmN0aW9uIGFkZFZlcnRzQW5kRWRnZXMoYm9hcmQpIHtcblxuICAgIGZvcihsZXQgaSA9IDE7IGkgPCAxMTsgaSsrKSB7XG4gICAgICAgIGZvcihsZXQgaiA9IDE7IGogPCAxMTsgaisrKSB7XG4gICAgICAgICAgICBib2FyZC5hZGRWZXJ0ZXgoYCR7aX0sJHtqfWApOyAvL211c3QgYmUgYWRkZWQgYXMgc3RyaW5nLCBhZGRpbmcgYXMgYXJyYXkgY2F1c2VzIHByb2JsZW1zXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IobGV0IGkgPSAxOyBpIDwgMTE7IGkrKykge1xuICAgICAgICBmb3IobGV0IGogPSAxOyBqIDwgMTE7IGorKykgeyAvL2Nvb3JkaW5hdGVzIG11c3QgYmUgYWRkZWQgYXMgc3RyaW5ncywgYWRkaW5nIGFzIGFycmF5cyBjYXVzZXMgcHJvYmxlbXNcbiAgICAgICAgICAgIGJvYXJkLmFkZEVkZ2UoYCR7aX0sJHtqfWAsYCR7aX0sJHtqICsgMX1gKTtcbiAgICAgICAgICAgIGJvYXJkLmFkZEVkZ2UoYCR7aX0sJHtqfWAsYCR7aSArIDF9LCR7an1gKTtcbiAgICAgICAgICAgIGJvYXJkLmFkZEVkZ2UoYCR7aX0sJHtqfWAsYCR7aX0sJHtqIC0gMX1gKTtcbiAgICAgICAgICAgIGJvYXJkLmFkZEVkZ2UoYCR7aX0sJHtqfWAsYCR7aSAtIDF9LCR7an1gKTtcbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgfVxuICAgIFxufVxuYWRkVmVydHNBbmRFZGdlcyhwbGF5ZXJCb2FyZCk7XG5hZGRWZXJ0c0FuZEVkZ2VzKGNvbXB1dGVyQm9hcmQpO1xuXG5sZXQgc3RhcnRpbmdTcXVhcmUgPSBcIjEsMVwiOyAvL211c3QgYmUgYSBzdHJpbmdcbmxldCBlbmRpbmdTcXVhcmUgPSBcIjEsNVwiO1xuXG5jb25zb2xlLmxvZyhgVGhlIHNob3J0ZXN0IHBhdGggZnJvbSAke3N0YXJ0aW5nU3F1YXJlfSB0byAke2VuZGluZ1NxdWFyZX06YCk7XG4vL2NvbnNvbGUubG9nKGcuYmZzKFwiMSwxXCIsXCIxLDVcIikpO1xuXG5leHBvcnQge3BsYXllckJvYXJkLCBjb21wdXRlckJvYXJkLCBnYW1lYm9hcmQsIGFkZFZlcnRzQW5kRWRnZXN9IiwiaW1wb3J0IHtnYW1lYm9hcmR9IGZyb20gXCIuLi9zcmMvZ2FtZWJvYXJkLmpzXCJcblxuXG5mdW5jdGlvbiBjcmVhdGVTaGlwcyhwbGF5ZXIpIHtcbiAgY29uc3Qgc2hpcHMgPSB7XG4gICAgICBjYXJyaWVyOiB7XG4gICAgICAgIGxlbmd0aDogNSxcbiAgICAgICAgaGl0czogMCxcbiAgICAgICAgc3VuazogZmFsc2UsXG4gICAgICAgIGhpdDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdGhpcy5oaXRzKys7XG4gICAgICAgIH0sXG4gICAgICAgIGlzU3VuazogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYodGhpcy5oaXRzID49IHRoaXMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLnN1bmsgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGJhdHRsZXNoaXA6IHtcbiAgICAgICAgbGVuZ3RoOiA0LFxuICAgICAgICBoaXRzOiAwLFxuICAgICAgICBzdW5rOiBmYWxzZSxcbiAgICAgICAgaGl0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICB0aGlzLmhpdHMrKztcbiAgICAgICAgfSxcbiAgICAgICAgaXNTdW5rOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZih0aGlzLmhpdHMgPj0gdGhpcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuc3VuayA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgY3J1aXNlciA6IHtcbiAgICAgICAgbGVuZ3RoOiAzLFxuICAgICAgICBoaXRzOiAwLFxuICAgICAgICBzdW5rOiBmYWxzZSxcbiAgICAgICAgaGl0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICB0aGlzLmhpdHMrKztcbiAgICAgICAgfSxcbiAgICAgICAgaXNTdW5rOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZih0aGlzLmhpdHMgPj0gdGhpcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuc3VuayA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgc3VibWFyaW5lOiB7XG4gICAgICAgIGxlbmd0aDogMixcbiAgICAgICAgaGl0czogMCxcbiAgICAgICAgc3VuazogZmFsc2UsXG4gICAgICAgIGhpdDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdGhpcy5oaXRzKys7XG4gICAgICAgIH0sXG4gICAgICAgIGlzU3VuazogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYodGhpcy5oaXRzID49IHRoaXMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLnN1bmsgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGRlc3Ryb3llcjoge1xuICAgICAgICBsZW5ndGg6IDEsXG4gICAgICAgIGhpdHM6IDAsXG4gICAgICAgIHN1bms6IGZhbHNlLFxuICAgICAgICBoaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHRoaXMuaGl0cysrO1xuICAgICAgICB9LFxuICAgICAgICBpc1N1bms6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmKHRoaXMuaGl0cyA+PSB0aGlzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5zdW5rID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgcmV0dXJuIHtcbiAgICBwbGF5ZXI6IHBsYXllcixcbiAgICBzaGlwc1xuICB9XG59XG5cbi8qY3JlYXRlU2hpcHMucHJvdG90eXBlLmhpdCA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmhpdHMrKztcbiAgcmV0dXJuIHRoaXMuaGl0cztcbn0qL1xuXG5cblxuXG5leHBvcnQge2NyZWF0ZVNoaXBzfTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9