/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ (() => {

class Graph {
    constructor() {
        this.vertices = [];
        this.adjacent = {};
        this.edges = 0;
    }

    addVertex(v) {
        this.vertices.push(v);
        this.adjacent[v] = [];
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

const g = new Graph();
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
console.log(g.bfs(startingSquare,endingSquare));

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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createShips": () => (/* binding */ createShips)
/* harmony export */ });
/* harmony import */ var _src_gameboard_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src/gameboard.js */ "./src/gameboard.js");
/* harmony import */ var _src_gameboard_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_src_gameboard_js__WEBPACK_IMPORTED_MODULE_0__);



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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhCQUE4QjtBQUM5Qiw4QkFBOEI7O0FBRTlCOztBQUVBO0FBQ0EsK0JBQStCO0FBQy9CO0FBQ0E7O0FBRUE7O0FBRUEsb0RBQW9EOztBQUVwRDtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsOEJBQThCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDRCQUE0QixtQkFBbUI7QUFDL0M7QUFDQSxrREFBa0Q7QUFDbEQsMkNBQTJDO0FBQzNDLHFEQUFxRDtBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLG1CQUFtQixRQUFRO0FBQzNCLHVCQUF1QixRQUFRO0FBQy9CLDJCQUEyQixFQUFFLEdBQUcsRUFBRSxJQUFJO0FBQ3RDO0FBQ0E7O0FBRUEsbUJBQW1CLFFBQVE7QUFDM0IsdUJBQXVCLFFBQVEsT0FBTztBQUN0Qyx5QkFBeUIsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEdBQUcsTUFBTTtBQUNoRCx5QkFBeUIsRUFBRSxHQUFHLEVBQUUsS0FBSyxNQUFNLEdBQUcsRUFBRTtBQUNoRCx5QkFBeUIsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEdBQUcsTUFBTTtBQUNoRCx5QkFBeUIsRUFBRSxHQUFHLEVBQUUsS0FBSyxNQUFNLEdBQUcsRUFBRTtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDRCQUE0QjtBQUM1Qjs7QUFFQTtBQUNBLHNDQUFzQyxnQkFBZ0IsS0FBSyxhQUFhO0FBQ3hFOzs7Ozs7VUM1R0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTjZDOzs7QUFHN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLXByb2plY3QvLi9zcmMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAtcHJvamVjdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLXByb2plY3Qvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC1wcm9qZWN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLXByb2plY3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLXByb2plY3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLXByb2plY3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgR3JhcGgge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnZlcnRpY2VzID0gW107XG4gICAgICAgIHRoaXMuYWRqYWNlbnQgPSB7fTtcbiAgICAgICAgdGhpcy5lZGdlcyA9IDA7XG4gICAgfVxuXG4gICAgYWRkVmVydGV4KHYpIHtcbiAgICAgICAgdGhpcy52ZXJ0aWNlcy5wdXNoKHYpO1xuICAgICAgICB0aGlzLmFkamFjZW50W3ZdID0gW107XG4gICAgfVxuXG4gICAgYWRkRWRnZSh2LCB3KSB7XG4gICAgICAgIGxldCB0ZXN0ID0gdztcbiAgICAgICAgaWYodGVzdC5pbmNsdWRlcygtMSkgfHwgdGVzdC5pbmNsdWRlcygwKVxuICAgICAgICAgICB8fCB0ZXN0LmluY2x1ZGVzKDkpIHx8IHRlc3QuaW5jbHVkZXMoMTApKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gLy9nZXQgcmlkIG9mIGNvb3JkaW5hdGVzIG5vdCBvbiBjaGVzc2JvYXJkXG4gICAgICAgICAgICBcbiAgICAgICAgdGhpcy5hZGphY2VudFt2XS5wdXNoKHcpO1xuICAgICAgICAvL3RoaXMuYWRqYWNlbnRbd10ucHVzaCh2KTtcbiAgICAgICAgdGhpcy5lZGdlcysrO1xuICAgIH1cblxuICAgIGJmcyhyb290LCBnb2FsKSB7IC8vYnJlYWR0aCBmaXJzdCBzZWFyY2ggYWxnb3JpdGhtIHRvIGZpbmQgc2hvcnRlc3QgcGF0aCBiZXR3ZWVuIHR3byBzcXVhcmVzXG4gICAgICAgIGxldCBhZGogPSB0aGlzLmFkamFjZW50O1xuICAgICAgICBcbiAgICAgICAgY29uc3QgcXVldWUgPSBbXTtcbiAgICAgICAgcXVldWUucHVzaChyb290KTtcblxuICAgICAgICBjb25zdCBkaXNjb3ZlcmVkID0gW107XG4gICAgICAgIGRpc2NvdmVyZWRbcm9vdF0gPSB0cnVlO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgZWRnZXMgPSBbXTtcbiAgICAgICAgZWRnZXNbcm9vdF0gPSAwO1xuXG4gICAgICAgIC8vYWRkIHZlcnRpY2VzIGFycmF5IGFuZCBpbml0aWFsaXplIGl0IHdpdGggcm9vdFxuICAgICAgICBjb25zdCBwcmVkZWNlc3NvcnMgPSBbXTtcbiAgICAgICAgcHJlZGVjZXNzb3JzW3Jvb3RdID0gbnVsbDtcblxuICAgICAgICBjb25zdCBidWlsZFBhdGggPSAoZ29hbCwgcm9vdCwgcHJlZGVjZXNzb3JzKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzdGFjayA9IFtdOyAvL2RlY2xhcmUgYW5kIGluaXRpYWxpemUgYSBcInN0YWNrXCJcbiAgICAgICAgICAgIHN0YWNrLnB1c2goZ29hbCk7IC8vcHVzaCBvdXIgZ29hbCB0byB0aGUgc3RhY2tcblxuICAgICAgICAgICAgbGV0IHUgPSBwcmVkZWNlc3NvcnNbZ29hbF07XG5cbiAgICAgICAgICAgIHdoaWxlKHUgIT0gcm9vdCkge1xuICAgICAgICAgICAgICAgIHN0YWNrLnB1c2godSk7IC8vcHVzaCBlYWNoIHByZWRlY2Vzc29yIHRvIHRoZSBzdGFja1xuICAgICAgICAgICAgICAgIHUgPSBwcmVkZWNlc3NvcnNbdV07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHN0YWNrLnB1c2gocm9vdCk7XG5cbiAgICAgICAgICAgIGxldCBwYXRoID0gc3RhY2sucmV2ZXJzZSgpLmpvaW4oJy0tPicpOyAvL2pvaW4gY29vcmRpbmF0ZXMgdG9nZXRoZXIgdG8gZm9ybSBwYXRoXG5cbiAgICAgICAgICAgIHJldHVybiBwYXRoO1xuICAgICAgICB9XG5cbiAgICAgICAgd2hpbGUocXVldWUubGVuZ3RoKSB7XG4gICAgICAgICAgICBsZXQgdiA9IHF1ZXVlLnNoaWZ0KCk7XG5cbiAgICAgICAgICAgIGlmICh2ID09PSBnb2FsKSB7IC8vaWYgb3VyIGdvYWwgY29tZXMgdXAgaW4gcXVldWUsIHJldHVybiBzaG9ydGVzdCBwYXRoIHRvIGdvYWxcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBTaG9ydGVzdFBhdGg6IGJ1aWxkUGF0aChnb2FsLCByb290LCBwcmVkZWNlc3NvcnMpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFkalt2XS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmICghZGlzY292ZXJlZFthZGpbdl1baV1dKSB7XG4gICAgICAgICAgICAgICAgICAgIGRpc2NvdmVyZWRbYWRqW3ZdW2ldXSA9IHRydWU7IC8vaWYgbmV4dCB2ZXJ0ZXggbm90IGRpc2NvdmVyZWQsIG1ha2UgaXQgZGlzY292ZXJlZFxuICAgICAgICAgICAgICAgICAgICBxdWV1ZS5wdXNoKGFkalt2XVtpXSk7IC8vcHVzaCBuZXh0IHZlcnRleCB0byBxdWV1ZVxuICAgICAgICAgICAgICAgICAgICBlZGdlc1thZGpbdl1baV1dID0gZWRnZXNbdl0gKyAxOyAvL2VkZ2VzIG9mIHByZXZpb3VzIHZlcnRleCBwbHVzIDFcbiAgICAgICAgICAgICAgICAgICAgcHJlZGVjZXNzb3JzW2Fkalt2XVtpXV0gPSB2IC8vY3JlYXRlIGEga2V5IGluIHZlcnRpY2VzIGFycmF5IHdpdGggdGhlIGN1cnJlbnQgdmVydGV4XG4gICAgICAgICAgICAgICAgICAgIC8vYXNzaWduIGl0IGEgdmFsdWUgb2YgaXRzIHByZWRlY2Vzc29yXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cblxuY29uc3QgZyA9IG5ldyBHcmFwaCgpO1xuZnVuY3Rpb24gYWRkVmVydHNBbmRFZGdlcygpIHtcblxuICAgIGZvcihsZXQgaSA9IDE7IGkgPCAxMTsgaSsrKSB7XG4gICAgICAgIGZvcihsZXQgaiA9IDE7IGogPCAxMTsgaisrKSB7XG4gICAgICAgICAgICBnLmFkZFZlcnRleChgJHtpfSwke2p9YCk7IC8vbXVzdCBiZSBhZGRlZCBhcyBzdHJpbmcsIGFkZGluZyBhcyBhcnJheSBjYXVzZXMgcHJvYmxlbXNcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZvcihsZXQgaSA9IDE7IGkgPCAxMTsgaSsrKSB7XG4gICAgICAgIGZvcihsZXQgaiA9IDE7IGogPCAxMTsgaisrKSB7IC8vY29vcmRpbmF0ZXMgbXVzdCBiZSBhZGRlZCBhcyBzdHJpbmdzLCBhZGRpbmcgYXMgYXJyYXlzIGNhdXNlcyBwcm9ibGVtc1xuICAgICAgICAgICAgZy5hZGRFZGdlKGAke2l9LCR7an1gLGAke2l9LCR7aiArIDF9YCk7XG4gICAgICAgICAgICBnLmFkZEVkZ2UoYCR7aX0sJHtqfWAsYCR7aSArIDF9LCR7an1gKTtcbiAgICAgICAgICAgIGcuYWRkRWRnZShgJHtpfSwke2p9YCxgJHtpfSwke2ogLSAxfWApO1xuICAgICAgICAgICAgZy5hZGRFZGdlKGAke2l9LCR7an1gLGAke2kgLSAxfSwke2p9YCk7XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbn1cblxubGV0IHN0YXJ0aW5nU3F1YXJlID0gXCIxLDFcIjsgLy9tdXN0IGJlIGEgc3RyaW5nXG5sZXQgZW5kaW5nU3F1YXJlID0gXCI1LDRcIjtcblxuYWRkVmVydHNBbmRFZGdlcygpO1xuY29uc29sZS5sb2coYFRoZSBzaG9ydGVzdCBwYXRoIGZyb20gJHtzdGFydGluZ1NxdWFyZX0gdG8gJHtlbmRpbmdTcXVhcmV9OmApO1xuY29uc29sZS5sb2coZy5iZnMoc3RhcnRpbmdTcXVhcmUsZW5kaW5nU3F1YXJlKSk7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7Z2FtZWJvYXJkfSBmcm9tIFwiLi4vc3JjL2dhbWVib2FyZC5qc1wiXG5cblxuZnVuY3Rpb24gY3JlYXRlU2hpcHMocGxheWVyKSB7XG4gIGNvbnN0IHNoaXBzID0ge1xuICAgICAgY2Fycmllcjoge1xuICAgICAgICBsZW5ndGg6IDUsXG4gICAgICAgIGhpdHM6IDAsXG4gICAgICAgIHN1bms6IGZhbHNlLFxuICAgICAgICBoaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHRoaXMuaGl0cysrO1xuICAgICAgICB9LFxuICAgICAgICBpc1N1bms6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmKHRoaXMuaGl0cyA+PSB0aGlzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5zdW5rID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBiYXR0bGVzaGlwOiB7XG4gICAgICAgIGxlbmd0aDogNCxcbiAgICAgICAgaGl0czogMCxcbiAgICAgICAgc3VuazogZmFsc2UsXG4gICAgICAgIGhpdDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdGhpcy5oaXRzKys7XG4gICAgICAgIH0sXG4gICAgICAgIGlzU3VuazogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYodGhpcy5oaXRzID49IHRoaXMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLnN1bmsgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGNydWlzZXIgOiB7XG4gICAgICAgIGxlbmd0aDogMyxcbiAgICAgICAgaGl0czogMCxcbiAgICAgICAgc3VuazogZmFsc2UsXG4gICAgICAgIGhpdDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdGhpcy5oaXRzKys7XG4gICAgICAgIH0sXG4gICAgICAgIGlzU3VuazogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYodGhpcy5oaXRzID49IHRoaXMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLnN1bmsgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHN1Ym1hcmluZToge1xuICAgICAgICBsZW5ndGg6IDIsXG4gICAgICAgIGhpdHM6IDAsXG4gICAgICAgIHN1bms6IGZhbHNlLFxuICAgICAgICBoaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHRoaXMuaGl0cysrO1xuICAgICAgICB9LFxuICAgICAgICBpc1N1bms6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmKHRoaXMuaGl0cyA+PSB0aGlzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5zdW5rID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBkZXN0cm95ZXI6IHtcbiAgICAgICAgbGVuZ3RoOiAxLFxuICAgICAgICBoaXRzOiAwLFxuICAgICAgICBzdW5rOiBmYWxzZSxcbiAgICAgICAgaGl0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICB0aGlzLmhpdHMrKztcbiAgICAgICAgfSxcbiAgICAgICAgaXNTdW5rOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZih0aGlzLmhpdHMgPj0gdGhpcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuc3VuayA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gIHJldHVybiB7XG4gICAgcGxheWVyOiBwbGF5ZXIsXG4gICAgc2hpcHNcbiAgfVxufVxuXG4vKmNyZWF0ZVNoaXBzLnByb3RvdHlwZS5oaXQgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5oaXRzKys7XG4gIHJldHVybiB0aGlzLmhpdHM7XG59Ki9cblxubGV0IHBsYXllcjEgPSBuZXcgY3JlYXRlU2hpcHMoXCJwbGF5ZXIxXCIpO1xuXG5cbmV4cG9ydCB7Y3JlYXRlU2hpcHN9OyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==