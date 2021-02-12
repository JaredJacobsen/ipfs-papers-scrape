/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 7228:
/***/ ((module) => {

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

module.exports = _arrayLikeToArray;

/***/ }),

/***/ 3646:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arrayLikeToArray = __webpack_require__(7228);

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return arrayLikeToArray(arr);
}

module.exports = _arrayWithoutHoles;

/***/ }),

/***/ 6860:
/***/ ((module) => {

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

module.exports = _iterableToArray;

/***/ }),

/***/ 8206:
/***/ ((module) => {

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

module.exports = _nonIterableSpread;

/***/ }),

/***/ 319:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arrayWithoutHoles = __webpack_require__(3646);

var iterableToArray = __webpack_require__(6860);

var unsupportedIterableToArray = __webpack_require__(379);

var nonIterableSpread = __webpack_require__(8206);

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
}

module.exports = _toConsumableArray;

/***/ }),

/***/ 379:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arrayLikeToArray = __webpack_require__(7228);

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}

module.exports = _unsupportedIterableToArray;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
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
/******/ 				() => module['default'] :
/******/ 				() => module;
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
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/************************************************************************/
(() => {
"use strict";

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/toConsumableArray.js
var toConsumableArray = __webpack_require__(319);
var toConsumableArray_default = /*#__PURE__*/__webpack_require__.n(toConsumableArray);
;// CONCATENATED MODULE: ./src/constants.js
var SAVE_OPTIONS = {
  IPFS: "ipfs",
  DOWNLOADS: "downloads",
  BOTH: "both"
};
var MESSAGE_TYPES = {
  SCRAPE_ACTIVE_TAB: "SCRAPE_ACTIVE_TAB",
  SCRAPE_NEW_TAB: "SCRAPE_NEW_TAB",
  HTML: "HTML",
  PDF_WITH_SAVED_METADATA: "PDF_WITH_SAVED_METADATA",
  PDF_WITHOUT_SAVED_METADATA: "PDF_WITHOUT_SAVED_METADATA",
  DETAILS: "DETAILS",
  ERROR: "ERROR"
};

;// CONCATENATED MODULE: ./src/googleScholarContentScript.js


var buttonCssText = "\n  display: inline-block;\n  position: relative;\n  margin-left: 6px;\n  background: none;\n  box-shadow: none;\n  color: DarkOrange;\n  font-weight: 700;\n  border-radius: 0px;\n  border-color: DarkOrange;\n";

toConsumableArray_default()(document.getElementsByClassName("gs_ri")).map(function (x) {
  var btn = document.createElement("BUTTON");
  btn.innerHTML = "\u2795 Decent Papers";
  btn.style.cssText = buttonCssText;
  var url = x.getElementsByClassName("gs_rt")[0].getElementsByTagName("a")[0].href;
  btn.addEventListener("click", function () {
    chrome.runtime.sendMessage({
      type: MESSAGE_TYPES.SCRAPE_NEW_TAB,
      url: url
    });
  });
  x.getElementsByClassName("gs_a")[0].appendChild(btn);
});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9pcGZzLXBhcGVycy1zY3JhcGUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9hcnJheUxpa2VUb0FycmF5LmpzIiwid2VicGFjazovL2lwZnMtcGFwZXJzLXNjcmFwZS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2FycmF5V2l0aG91dEhvbGVzLmpzIiwid2VicGFjazovL2lwZnMtcGFwZXJzLXNjcmFwZS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2l0ZXJhYmxlVG9BcnJheS5qcyIsIndlYnBhY2s6Ly9pcGZzLXBhcGVycy1zY3JhcGUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9ub25JdGVyYWJsZVNwcmVhZC5qcyIsIndlYnBhY2s6Ly9pcGZzLXBhcGVycy1zY3JhcGUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy90b0NvbnN1bWFibGVBcnJheS5qcyIsIndlYnBhY2s6Ly9pcGZzLXBhcGVycy1zY3JhcGUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheS5qcyIsIndlYnBhY2s6Ly9pcGZzLXBhcGVycy1zY3JhcGUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vaXBmcy1wYXBlcnMtc2NyYXBlL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2lwZnMtcGFwZXJzLXNjcmFwZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vaXBmcy1wYXBlcnMtc2NyYXBlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vaXBmcy1wYXBlcnMtc2NyYXBlLy4vc3JjL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly9pcGZzLXBhcGVycy1zY3JhcGUvLi9zcmMvZ29vZ2xlU2Nob2xhckNvbnRlbnRTY3JpcHQuanMiXSwibmFtZXMiOlsiU0FWRV9PUFRJT05TIiwiSVBGUyIsIkRPV05MT0FEUyIsIkJPVEgiLCJNRVNTQUdFX1RZUEVTIiwiU0NSQVBFX0FDVElWRV9UQUIiLCJTQ1JBUEVfTkVXX1RBQiIsIkhUTUwiLCJQREZfV0lUSF9TQVZFRF9NRVRBREFUQSIsIlBERl9XSVRIT1VUX1NBVkVEX01FVEFEQVRBIiwiREVUQUlMUyIsIkVSUk9SIiwiYnV0dG9uQ3NzVGV4dCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsIm1hcCIsIngiLCJidG4iLCJjcmVhdGVFbGVtZW50IiwiaW5uZXJIVE1MIiwic3R5bGUiLCJjc3NUZXh0IiwidXJsIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJocmVmIiwiYWRkRXZlbnRMaXN0ZW5lciIsImNocm9tZSIsInJ1bnRpbWUiLCJzZW5kTWVzc2FnZSIsInR5cGUiLCJhcHBlbmRDaGlsZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFDQTs7QUFFQSx3Q0FBd0MsU0FBUztBQUNqRDtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsbUM7Ozs7Ozs7QUNWQSx1QkFBdUIsbUJBQU8sQ0FBQyxJQUFvQjs7QUFFbkQ7QUFDQTtBQUNBOztBQUVBLG9DOzs7Ozs7O0FDTkE7QUFDQTtBQUNBOztBQUVBLGtDOzs7Ozs7O0FDSkE7QUFDQTtBQUNBOztBQUVBLG9DOzs7Ozs7O0FDSkEsd0JBQXdCLG1CQUFPLENBQUMsSUFBcUI7O0FBRXJELHNCQUFzQixtQkFBTyxDQUFDLElBQW1COztBQUVqRCxpQ0FBaUMsbUJBQU8sQ0FBQyxHQUE4Qjs7QUFFdkUsd0JBQXdCLG1CQUFPLENBQUMsSUFBcUI7O0FBRXJEO0FBQ0E7QUFDQTs7QUFFQSxvQzs7Ozs7OztBQ1pBLHVCQUF1QixtQkFBTyxDQUFDLElBQW9COztBQUVuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDZDOzs7Ozs7VUNYQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0NyQkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGdDQUFnQyxZQUFZO1dBQzVDO1dBQ0EsRTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHdDQUF3Qyx5Q0FBeUM7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsc0Y7Ozs7Ozs7Ozs7O0FDQUEsSUFBTUEsWUFBWSxHQUFHO0FBQUVDLE1BQUksRUFBRSxNQUFSO0FBQWdCQyxXQUFTLEVBQUUsV0FBM0I7QUFBd0NDLE1BQUksRUFBRTtBQUE5QyxDQUFyQjtBQUNBLElBQU1DLGFBQWEsR0FBRztBQUNwQkMsbUJBQWlCLEVBQUUsbUJBREM7QUFFcEJDLGdCQUFjLEVBQUUsZ0JBRkk7QUFHcEJDLE1BQUksRUFBRSxNQUhjO0FBSXBCQyx5QkFBdUIsRUFBRSx5QkFKTDtBQUtwQkMsNEJBQTBCLEVBQUUsNEJBTFI7QUFNcEJDLFNBQU8sRUFBRSxTQU5XO0FBT3BCQyxPQUFLLEVBQUU7QUFQYSxDQUF0Qjs7OztBQ0RBO0FBRUEsSUFBTUMsYUFBYSxzTkFBbkI7O0FBWUEsNEJBQUlDLFFBQVEsQ0FBQ0Msc0JBQVQsQ0FBZ0MsT0FBaEMsQ0FBSixFQUE4Q0MsR0FBOUMsQ0FBa0QsVUFBQ0MsQ0FBRCxFQUFPO0FBQ3ZELE1BQU1DLEdBQUcsR0FBR0osUUFBUSxDQUFDSyxhQUFULENBQXVCLFFBQXZCLENBQVo7QUFDQUQsS0FBRyxDQUFDRSxTQUFKLEdBQWdCLHNCQUFoQjtBQUNBRixLQUFHLENBQUNHLEtBQUosQ0FBVUMsT0FBVixHQUFvQlQsYUFBcEI7QUFFQSxNQUFNVSxHQUFHLEdBQUdOLENBQUMsQ0FBQ0Ysc0JBQUYsQ0FBeUIsT0FBekIsRUFBa0MsQ0FBbEMsRUFBcUNTLG9CQUFyQyxDQUEwRCxHQUExRCxFQUErRCxDQUEvRCxFQUNUQyxJQURIO0FBR0FQLEtBQUcsQ0FBQ1EsZ0JBQUosQ0FBcUIsT0FBckIsRUFBOEIsWUFBTTtBQUNsQ0MsVUFBTSxDQUFDQyxPQUFQLENBQWVDLFdBQWYsQ0FBMkI7QUFDekJDLFVBQUksRUFBRXpCLDRCQURtQjtBQUV6QmtCLFNBQUcsRUFBSEE7QUFGeUIsS0FBM0I7QUFJRCxHQUxEO0FBT0FOLEdBQUMsQ0FBQ0Ysc0JBQUYsQ0FBeUIsTUFBekIsRUFBaUMsQ0FBakMsRUFBb0NnQixXQUFwQyxDQUFnRGIsR0FBaEQ7QUFDRCxDQWhCRCxFIiwiZmlsZSI6Imdvb2dsZVNjaG9sYXJDb250ZW50U2NyaXB0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHtcbiAgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7XG5cbiAgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7XG4gICAgYXJyMltpXSA9IGFycltpXTtcbiAgfVxuXG4gIHJldHVybiBhcnIyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9hcnJheUxpa2VUb0FycmF5OyIsInZhciBhcnJheUxpa2VUb0FycmF5ID0gcmVxdWlyZShcIi4vYXJyYXlMaWtlVG9BcnJheVwiKTtcblxuZnVuY3Rpb24gX2FycmF5V2l0aG91dEhvbGVzKGFycikge1xuICBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyYXlMaWtlVG9BcnJheShhcnIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9hcnJheVdpdGhvdXRIb2xlczsiLCJmdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5KGl0ZXIpIHtcbiAgaWYgKHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgJiYgU3ltYm9sLml0ZXJhdG9yIGluIE9iamVjdChpdGVyKSkgcmV0dXJuIEFycmF5LmZyb20oaXRlcik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2l0ZXJhYmxlVG9BcnJheTsiLCJmdW5jdGlvbiBfbm9uSXRlcmFibGVTcHJlYWQoKSB7XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gc3ByZWFkIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9ub25JdGVyYWJsZVNwcmVhZDsiLCJ2YXIgYXJyYXlXaXRob3V0SG9sZXMgPSByZXF1aXJlKFwiLi9hcnJheVdpdGhvdXRIb2xlc1wiKTtcblxudmFyIGl0ZXJhYmxlVG9BcnJheSA9IHJlcXVpcmUoXCIuL2l0ZXJhYmxlVG9BcnJheVwiKTtcblxudmFyIHVuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5ID0gcmVxdWlyZShcIi4vdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXlcIik7XG5cbnZhciBub25JdGVyYWJsZVNwcmVhZCA9IHJlcXVpcmUoXCIuL25vbkl0ZXJhYmxlU3ByZWFkXCIpO1xuXG5mdW5jdGlvbiBfdG9Db25zdW1hYmxlQXJyYXkoYXJyKSB7XG4gIHJldHVybiBhcnJheVdpdGhvdXRIb2xlcyhhcnIpIHx8IGl0ZXJhYmxlVG9BcnJheShhcnIpIHx8IHVuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFycikgfHwgbm9uSXRlcmFibGVTcHJlYWQoKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfdG9Db25zdW1hYmxlQXJyYXk7IiwidmFyIGFycmF5TGlrZVRvQXJyYXkgPSByZXF1aXJlKFwiLi9hcnJheUxpa2VUb0FycmF5XCIpO1xuXG5mdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7XG4gIGlmICghbykgcmV0dXJuO1xuICBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBhcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7XG4gIHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTtcbiAgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTtcbiAgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7XG4gIGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHRpZihfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdKSB7XG5cdFx0cmV0dXJuIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0uZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IG1vZHVsZVsnZGVmYXVsdCddIDpcblx0XHQoKSA9PiBtb2R1bGU7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSIsImNvbnN0IFNBVkVfT1BUSU9OUyA9IHsgSVBGUzogXCJpcGZzXCIsIERPV05MT0FEUzogXCJkb3dubG9hZHNcIiwgQk9USDogXCJib3RoXCIgfTtcbmNvbnN0IE1FU1NBR0VfVFlQRVMgPSB7XG4gIFNDUkFQRV9BQ1RJVkVfVEFCOiBcIlNDUkFQRV9BQ1RJVkVfVEFCXCIsXG4gIFNDUkFQRV9ORVdfVEFCOiBcIlNDUkFQRV9ORVdfVEFCXCIsXG4gIEhUTUw6IFwiSFRNTFwiLFxuICBQREZfV0lUSF9TQVZFRF9NRVRBREFUQTogXCJQREZfV0lUSF9TQVZFRF9NRVRBREFUQVwiLFxuICBQREZfV0lUSE9VVF9TQVZFRF9NRVRBREFUQTogXCJQREZfV0lUSE9VVF9TQVZFRF9NRVRBREFUQVwiLFxuICBERVRBSUxTOiBcIkRFVEFJTFNcIixcbiAgRVJST1I6IFwiRVJST1JcIixcbn07XG5cbmV4cG9ydCB7IFNBVkVfT1BUSU9OUywgTUVTU0FHRV9UWVBFUyB9O1xuIiwiaW1wb3J0IHsgTUVTU0FHRV9UWVBFUyB9IGZyb20gXCIuL2NvbnN0YW50c1wiO1xuXG5jb25zdCBidXR0b25Dc3NUZXh0ID0gYFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgbWFyZ2luLWxlZnQ6IDZweDtcbiAgYmFja2dyb3VuZDogbm9uZTtcbiAgYm94LXNoYWRvdzogbm9uZTtcbiAgY29sb3I6IERhcmtPcmFuZ2U7XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIGJvcmRlci1yYWRpdXM6IDBweDtcbiAgYm9yZGVyLWNvbG9yOiBEYXJrT3JhbmdlO1xuYDtcblxuWy4uLmRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJnc19yaVwiKV0ubWFwKCh4KSA9PiB7XG4gIGNvbnN0IGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJCVVRUT05cIik7XG4gIGJ0bi5pbm5lckhUTUwgPSBcIlxcdTI3OTUgRGVjZW50IFBhcGVyc1wiO1xuICBidG4uc3R5bGUuY3NzVGV4dCA9IGJ1dHRvbkNzc1RleHQ7XG5cbiAgY29uc3QgdXJsID0geC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZ3NfcnRcIilbMF0uZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJhXCIpWzBdXG4gICAgLmhyZWY7XG5cbiAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2Uoe1xuICAgICAgdHlwZTogTUVTU0FHRV9UWVBFUy5TQ1JBUEVfTkVXX1RBQixcbiAgICAgIHVybCxcbiAgICB9KTtcbiAgfSk7XG5cbiAgeC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZ3NfYVwiKVswXS5hcHBlbmRDaGlsZChidG4pO1xufSk7XG4iXSwic291cmNlUm9vdCI6IiJ9