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
class gameboard {
    constructor() {
        this.vertices = [];
        this.adjacent = {};
        this.edges = 0;
        this.taken = {}
    }

    addVertex(v) {
        this.vertices.push(v);
        this.adjacent[v] = [];
        this.taken[v] = false;
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

    bfs(root, goal) { //breadth first search algorithm to find shortest path between two squares
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
let endingSquare = "5,4";

addVertsAndEdges();
console.log(`The shortest path from ${startingSquare} to ${endingSquare}:`);
console.log(g.bfs("1,1","5,4"));



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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
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

let player1 = new createShips("player1");



})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOEJBQThCO0FBQzlCLDhCQUE4Qjs7QUFFOUI7O0FBRUE7QUFDQSwrQkFBK0I7QUFDL0I7QUFDQTs7QUFFQTs7QUFFQSxvREFBb0Q7O0FBRXBEO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSw4QkFBOEI7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsNEJBQTRCLG1CQUFtQjtBQUMvQztBQUNBLGtEQUFrRDtBQUNsRCwyQ0FBMkM7QUFDM0MscURBQXFEO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsbUJBQW1CLFFBQVE7QUFDM0IsdUJBQXVCLFFBQVE7QUFDL0IsMkJBQTJCLEVBQUUsR0FBRyxFQUFFLElBQUk7QUFDdEM7QUFDQTs7QUFFQSxtQkFBbUIsUUFBUTtBQUMzQix1QkFBdUIsUUFBUSxPQUFPO0FBQ3RDLHlCQUF5QixFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxNQUFNO0FBQ2hELHlCQUF5QixFQUFFLEdBQUcsRUFBRSxLQUFLLE1BQU0sR0FBRyxFQUFFO0FBQ2hELHlCQUF5QixFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxNQUFNO0FBQ2hELHlCQUF5QixFQUFFLEdBQUcsRUFBRSxLQUFLLE1BQU0sR0FBRyxFQUFFO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsNEJBQTRCO0FBQzVCOztBQUVBO0FBQ0Esc0NBQXNDLGdCQUFnQixLQUFLLGFBQWE7QUFDeEU7Ozs7Ozs7O1VDOUdBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNONkM7OztBQUc3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRCIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAtcHJvamVjdC8uL3NyYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC1wcm9qZWN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAtcHJvamVjdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC1wcm9qZWN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC1wcm9qZWN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC1wcm9qZWN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNsYXNzIGdhbWVib2FyZCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMudmVydGljZXMgPSBbXTtcbiAgICAgICAgdGhpcy5hZGphY2VudCA9IHt9O1xuICAgICAgICB0aGlzLmVkZ2VzID0gMDtcbiAgICAgICAgdGhpcy50YWtlbiA9IHt9XG4gICAgfVxuXG4gICAgYWRkVmVydGV4KHYpIHtcbiAgICAgICAgdGhpcy52ZXJ0aWNlcy5wdXNoKHYpO1xuICAgICAgICB0aGlzLmFkamFjZW50W3ZdID0gW107XG4gICAgICAgIHRoaXMudGFrZW5bdl0gPSBmYWxzZTtcbiAgICB9XG5cbiAgICBhZGRFZGdlKHYsIHcpIHtcbiAgICAgICAgbGV0IHRlc3QgPSB3O1xuICAgICAgICBpZih0ZXN0LmluY2x1ZGVzKC0xKSB8fCB0ZXN0LmluY2x1ZGVzKDApXG4gICAgICAgICAgIHx8IHRlc3QuaW5jbHVkZXMoOSkgfHwgdGVzdC5pbmNsdWRlcygxMCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSAvL2dldCByaWQgb2YgY29vcmRpbmF0ZXMgbm90IG9uIGNoZXNzYm9hcmRcbiAgICAgICAgICAgIFxuICAgICAgICB0aGlzLmFkamFjZW50W3ZdLnB1c2godyk7XG4gICAgICAgIC8vdGhpcy5hZGphY2VudFt3XS5wdXNoKHYpO1xuICAgICAgICB0aGlzLmVkZ2VzKys7XG4gICAgfVxuXG4gICAgYmZzKHJvb3QsIGdvYWwpIHsgLy9icmVhZHRoIGZpcnN0IHNlYXJjaCBhbGdvcml0aG0gdG8gZmluZCBzaG9ydGVzdCBwYXRoIGJldHdlZW4gdHdvIHNxdWFyZXNcbiAgICAgICAgbGV0IGFkaiA9IHRoaXMuYWRqYWNlbnQ7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBxdWV1ZSA9IFtdO1xuICAgICAgICBxdWV1ZS5wdXNoKHJvb3QpO1xuXG4gICAgICAgIGNvbnN0IGRpc2NvdmVyZWQgPSBbXTtcbiAgICAgICAgZGlzY292ZXJlZFtyb290XSA9IHRydWU7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBlZGdlcyA9IFtdO1xuICAgICAgICBlZGdlc1tyb290XSA9IDA7XG5cbiAgICAgICAgLy9hZGQgdmVydGljZXMgYXJyYXkgYW5kIGluaXRpYWxpemUgaXQgd2l0aCByb290XG4gICAgICAgIGNvbnN0IHByZWRlY2Vzc29ycyA9IFtdO1xuICAgICAgICBwcmVkZWNlc3NvcnNbcm9vdF0gPSBudWxsO1xuXG4gICAgICAgIGNvbnN0IGJ1aWxkUGF0aCA9IChnb2FsLCByb290LCBwcmVkZWNlc3NvcnMpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHN0YWNrID0gW107IC8vZGVjbGFyZSBhbmQgaW5pdGlhbGl6ZSBhIFwic3RhY2tcIlxuICAgICAgICAgICAgc3RhY2sucHVzaChnb2FsKTsgLy9wdXNoIG91ciBnb2FsIHRvIHRoZSBzdGFja1xuXG4gICAgICAgICAgICBsZXQgdSA9IHByZWRlY2Vzc29yc1tnb2FsXTtcblxuICAgICAgICAgICAgd2hpbGUodSAhPSByb290KSB7XG4gICAgICAgICAgICAgICAgc3RhY2sucHVzaCh1KTsgLy9wdXNoIGVhY2ggcHJlZGVjZXNzb3IgdG8gdGhlIHN0YWNrXG4gICAgICAgICAgICAgICAgdSA9IHByZWRlY2Vzc29yc1t1XTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc3RhY2sucHVzaChyb290KTtcblxuICAgICAgICAgICAgbGV0IHBhdGggPSBzdGFjay5yZXZlcnNlKCkuam9pbignLS0+Jyk7IC8vam9pbiBjb29yZGluYXRlcyB0b2dldGhlciB0byBmb3JtIHBhdGhcblxuICAgICAgICAgICAgcmV0dXJuIHBhdGg7XG4gICAgICAgIH1cblxuICAgICAgICB3aGlsZShxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGxldCB2ID0gcXVldWUuc2hpZnQoKTtcblxuICAgICAgICAgICAgaWYgKHYgPT09IGdvYWwpIHsgLy9pZiBvdXIgZ29hbCBjb21lcyB1cCBpbiBxdWV1ZSwgcmV0dXJuIHNob3J0ZXN0IHBhdGggdG8gZ29hbFxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIFNob3J0ZXN0UGF0aDogYnVpbGRQYXRoKGdvYWwsIHJvb3QsIHByZWRlY2Vzc29ycylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWRqW3ZdLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFkaXNjb3ZlcmVkW2Fkalt2XVtpXV0pIHtcbiAgICAgICAgICAgICAgICAgICAgZGlzY292ZXJlZFthZGpbdl1baV1dID0gdHJ1ZTsgLy9pZiBuZXh0IHZlcnRleCBub3QgZGlzY292ZXJlZCwgbWFrZSBpdCBkaXNjb3ZlcmVkXG4gICAgICAgICAgICAgICAgICAgIHF1ZXVlLnB1c2goYWRqW3ZdW2ldKTsgLy9wdXNoIG5leHQgdmVydGV4IHRvIHF1ZXVlXG4gICAgICAgICAgICAgICAgICAgIGVkZ2VzW2Fkalt2XVtpXV0gPSBlZGdlc1t2XSArIDE7IC8vZWRnZXMgb2YgcHJldmlvdXMgdmVydGV4IHBsdXMgMVxuICAgICAgICAgICAgICAgICAgICBwcmVkZWNlc3NvcnNbYWRqW3ZdW2ldXSA9IHYgLy9jcmVhdGUgYSBrZXkgaW4gdmVydGljZXMgYXJyYXkgd2l0aCB0aGUgY3VycmVudCB2ZXJ0ZXhcbiAgICAgICAgICAgICAgICAgICAgLy9hc3NpZ24gaXQgYSB2YWx1ZSBvZiBpdHMgcHJlZGVjZXNzb3JcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuXG5jb25zdCBnID0gbmV3IGdhbWVib2FyZCgpO1xuZnVuY3Rpb24gYWRkVmVydHNBbmRFZGdlcygpIHtcblxuICAgIGZvcihsZXQgaSA9IDE7IGkgPCAxMTsgaSsrKSB7XG4gICAgICAgIGZvcihsZXQgaiA9IDE7IGogPCAxMTsgaisrKSB7XG4gICAgICAgICAgICBnLmFkZFZlcnRleChgJHtpfSwke2p9YCk7IC8vbXVzdCBiZSBhZGRlZCBhcyBzdHJpbmcsIGFkZGluZyBhcyBhcnJheSBjYXVzZXMgcHJvYmxlbXNcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZvcihsZXQgaSA9IDE7IGkgPCAxMTsgaSsrKSB7XG4gICAgICAgIGZvcihsZXQgaiA9IDE7IGogPCAxMTsgaisrKSB7IC8vY29vcmRpbmF0ZXMgbXVzdCBiZSBhZGRlZCBhcyBzdHJpbmdzLCBhZGRpbmcgYXMgYXJyYXlzIGNhdXNlcyBwcm9ibGVtc1xuICAgICAgICAgICAgZy5hZGRFZGdlKGAke2l9LCR7an1gLGAke2l9LCR7aiArIDF9YCk7XG4gICAgICAgICAgICBnLmFkZEVkZ2UoYCR7aX0sJHtqfWAsYCR7aSArIDF9LCR7an1gKTtcbiAgICAgICAgICAgIGcuYWRkRWRnZShgJHtpfSwke2p9YCxgJHtpfSwke2ogLSAxfWApO1xuICAgICAgICAgICAgZy5hZGRFZGdlKGAke2l9LCR7an1gLGAke2kgLSAxfSwke2p9YCk7XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbn1cblxubGV0IHN0YXJ0aW5nU3F1YXJlID0gXCIxLDFcIjsgLy9tdXN0IGJlIGEgc3RyaW5nXG5sZXQgZW5kaW5nU3F1YXJlID0gXCI1LDRcIjtcblxuYWRkVmVydHNBbmRFZGdlcygpO1xuY29uc29sZS5sb2coYFRoZSBzaG9ydGVzdCBwYXRoIGZyb20gJHtzdGFydGluZ1NxdWFyZX0gdG8gJHtlbmRpbmdTcXVhcmV9OmApO1xuY29uc29sZS5sb2coZy5iZnMoXCIxLDFcIixcIjUsNFwiKSk7XG5cbmV4cG9ydCB7ZywgZ2FtZWJvYXJkLCBhZGRWZXJ0c0FuZEVkZ2VzfSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHtnYW1lYm9hcmR9IGZyb20gXCIuLi9zcmMvZ2FtZWJvYXJkLmpzXCJcblxuXG5mdW5jdGlvbiBjcmVhdGVTaGlwcyhwbGF5ZXIpIHtcbiAgY29uc3Qgc2hpcHMgPSB7XG4gICAgICBjYXJyaWVyOiB7XG4gICAgICAgIGxlbmd0aDogNSxcbiAgICAgICAgaGl0czogMCxcbiAgICAgICAgc3VuazogZmFsc2UsXG4gICAgICAgIGhpdDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdGhpcy5oaXRzKys7XG4gICAgICAgIH0sXG4gICAgICAgIGlzU3VuazogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYodGhpcy5oaXRzID49IHRoaXMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLnN1bmsgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGJhdHRsZXNoaXA6IHtcbiAgICAgICAgbGVuZ3RoOiA0LFxuICAgICAgICBoaXRzOiAwLFxuICAgICAgICBzdW5rOiBmYWxzZSxcbiAgICAgICAgaGl0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICB0aGlzLmhpdHMrKztcbiAgICAgICAgfSxcbiAgICAgICAgaXNTdW5rOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZih0aGlzLmhpdHMgPj0gdGhpcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuc3VuayA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgY3J1aXNlciA6IHtcbiAgICAgICAgbGVuZ3RoOiAzLFxuICAgICAgICBoaXRzOiAwLFxuICAgICAgICBzdW5rOiBmYWxzZSxcbiAgICAgICAgaGl0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICB0aGlzLmhpdHMrKztcbiAgICAgICAgfSxcbiAgICAgICAgaXNTdW5rOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZih0aGlzLmhpdHMgPj0gdGhpcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuc3VuayA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgc3VibWFyaW5lOiB7XG4gICAgICAgIGxlbmd0aDogMixcbiAgICAgICAgaGl0czogMCxcbiAgICAgICAgc3VuazogZmFsc2UsXG4gICAgICAgIGhpdDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdGhpcy5oaXRzKys7XG4gICAgICAgIH0sXG4gICAgICAgIGlzU3VuazogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYodGhpcy5oaXRzID49IHRoaXMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLnN1bmsgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGRlc3Ryb3llcjoge1xuICAgICAgICBsZW5ndGg6IDEsXG4gICAgICAgIGhpdHM6IDAsXG4gICAgICAgIHN1bms6IGZhbHNlLFxuICAgICAgICBoaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHRoaXMuaGl0cysrO1xuICAgICAgICB9LFxuICAgICAgICBpc1N1bms6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmKHRoaXMuaGl0cyA+PSB0aGlzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5zdW5rID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgcmV0dXJuIHtcbiAgICBwbGF5ZXI6IHBsYXllcixcbiAgICBzaGlwc1xuICB9XG59XG5cbi8qY3JlYXRlU2hpcHMucHJvdG90eXBlLmhpdCA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmhpdHMrKztcbiAgcmV0dXJuIHRoaXMuaGl0cztcbn0qL1xuXG5sZXQgcGxheWVyMSA9IG5ldyBjcmVhdGVTaGlwcyhcInBsYXllcjFcIik7XG5cblxuZXhwb3J0IHtjcmVhdGVTaGlwc307Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9