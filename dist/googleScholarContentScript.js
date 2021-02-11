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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9pcGZzLXBhcGVycy1zY3JhcGUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9hcnJheUxpa2VUb0FycmF5LmpzIiwid2VicGFjazovL2lwZnMtcGFwZXJzLXNjcmFwZS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2FycmF5V2l0aG91dEhvbGVzLmpzIiwid2VicGFjazovL2lwZnMtcGFwZXJzLXNjcmFwZS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2l0ZXJhYmxlVG9BcnJheS5qcyIsIndlYnBhY2s6Ly9pcGZzLXBhcGVycy1zY3JhcGUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9ub25JdGVyYWJsZVNwcmVhZC5qcyIsIndlYnBhY2s6Ly9pcGZzLXBhcGVycy1zY3JhcGUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy90b0NvbnN1bWFibGVBcnJheS5qcyIsIndlYnBhY2s6Ly9pcGZzLXBhcGVycy1zY3JhcGUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheS5qcyIsIndlYnBhY2s6Ly9pcGZzLXBhcGVycy1zY3JhcGUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vaXBmcy1wYXBlcnMtc2NyYXBlL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2lwZnMtcGFwZXJzLXNjcmFwZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vaXBmcy1wYXBlcnMtc2NyYXBlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vaXBmcy1wYXBlcnMtc2NyYXBlLy4vc3JjL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly9pcGZzLXBhcGVycy1zY3JhcGUvLi9zcmMvZ29vZ2xlU2Nob2xhckNvbnRlbnRTY3JpcHQuanMiXSwibmFtZXMiOlsiU0FWRV9PUFRJT05TIiwiSVBGUyIsIkRPV05MT0FEUyIsIkJPVEgiLCJNRVNTQUdFX1RZUEVTIiwiU0NSQVBFX0FDVElWRV9UQUIiLCJTQ1JBUEVfTkVXX1RBQiIsIkhUTUwiLCJQREZfV0lUSF9TQVZFRF9NRVRBREFUQSIsIlBERl9XSVRIT1VUX1NBVkVEX01FVEFEQVRBIiwiRVJST1IiLCJidXR0b25Dc3NUZXh0IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwibWFwIiwieCIsImJ0biIsImNyZWF0ZUVsZW1lbnQiLCJpbm5lckhUTUwiLCJzdHlsZSIsImNzc1RleHQiLCJ1cmwiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsImhyZWYiLCJhZGRFdmVudExpc3RlbmVyIiwiY2hyb21lIiwicnVudGltZSIsInNlbmRNZXNzYWdlIiwidHlwZSIsImFwcGVuZENoaWxkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTtBQUNBOztBQUVBLHdDQUF3QyxTQUFTO0FBQ2pEO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxtQzs7Ozs7OztBQ1ZBLHVCQUF1QixtQkFBTyxDQUFDLElBQW9COztBQUVuRDtBQUNBO0FBQ0E7O0FBRUEsb0M7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0E7O0FBRUEsa0M7Ozs7Ozs7QUNKQTtBQUNBO0FBQ0E7O0FBRUEsb0M7Ozs7Ozs7QUNKQSx3QkFBd0IsbUJBQU8sQ0FBQyxJQUFxQjs7QUFFckQsc0JBQXNCLG1CQUFPLENBQUMsSUFBbUI7O0FBRWpELGlDQUFpQyxtQkFBTyxDQUFDLEdBQThCOztBQUV2RSx3QkFBd0IsbUJBQU8sQ0FBQyxJQUFxQjs7QUFFckQ7QUFDQTtBQUNBOztBQUVBLG9DOzs7Ozs7O0FDWkEsdUJBQXVCLG1CQUFPLENBQUMsSUFBb0I7O0FBRW5EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsNkM7Ozs7OztVQ1hBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3JCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsZ0NBQWdDLFlBQVk7V0FDNUM7V0FDQSxFOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esd0NBQXdDLHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSxzRjs7Ozs7Ozs7Ozs7QUNBQSxJQUFNQSxZQUFZLEdBQUc7QUFBRUMsTUFBSSxFQUFFLE1BQVI7QUFBZ0JDLFdBQVMsRUFBRSxXQUEzQjtBQUF3Q0MsTUFBSSxFQUFFO0FBQTlDLENBQXJCO0FBQ0EsSUFBTUMsYUFBYSxHQUFHO0FBQ3BCQyxtQkFBaUIsRUFBRSxtQkFEQztBQUVwQkMsZ0JBQWMsRUFBRSxnQkFGSTtBQUdwQkMsTUFBSSxFQUFFLE1BSGM7QUFJcEJDLHlCQUF1QixFQUFFLHlCQUpMO0FBS3BCQyw0QkFBMEIsRUFBRSw0QkFMUjtBQU1wQkMsT0FBSyxFQUFFO0FBTmEsQ0FBdEI7Ozs7QUNEQTtBQUVBLElBQU1DLGFBQWEsc05BQW5COztBQVlBLDRCQUFJQyxRQUFRLENBQUNDLHNCQUFULENBQWdDLE9BQWhDLENBQUosRUFBOENDLEdBQTlDLENBQWtELFVBQUNDLENBQUQsRUFBTztBQUN2RCxNQUFNQyxHQUFHLEdBQUdKLFFBQVEsQ0FBQ0ssYUFBVCxDQUF1QixRQUF2QixDQUFaO0FBQ0FELEtBQUcsQ0FBQ0UsU0FBSixHQUFnQixzQkFBaEI7QUFDQUYsS0FBRyxDQUFDRyxLQUFKLENBQVVDLE9BQVYsR0FBb0JULGFBQXBCO0FBRUEsTUFBTVUsR0FBRyxHQUFHTixDQUFDLENBQUNGLHNCQUFGLENBQXlCLE9BQXpCLEVBQWtDLENBQWxDLEVBQXFDUyxvQkFBckMsQ0FBMEQsR0FBMUQsRUFBK0QsQ0FBL0QsRUFDVEMsSUFESDtBQUdBUCxLQUFHLENBQUNRLGdCQUFKLENBQXFCLE9BQXJCLEVBQThCLFlBQU07QUFDbENDLFVBQU0sQ0FBQ0MsT0FBUCxDQUFlQyxXQUFmLENBQTJCO0FBQ3pCQyxVQUFJLEVBQUV4Qiw0QkFEbUI7QUFFekJpQixTQUFHLEVBQUhBO0FBRnlCLEtBQTNCO0FBSUQsR0FMRDtBQU9BTixHQUFDLENBQUNGLHNCQUFGLENBQXlCLE1BQXpCLEVBQWlDLENBQWpDLEVBQW9DZ0IsV0FBcEMsQ0FBZ0RiLEdBQWhEO0FBQ0QsQ0FoQkQsRSIsImZpbGUiOiJnb29nbGVTY2hvbGFyQ29udGVudFNjcmlwdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7XG4gIGlmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoO1xuXG4gIGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykge1xuICAgIGFycjJbaV0gPSBhcnJbaV07XG4gIH1cblxuICByZXR1cm4gYXJyMjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfYXJyYXlMaWtlVG9BcnJheTsiLCJ2YXIgYXJyYXlMaWtlVG9BcnJheSA9IHJlcXVpcmUoXCIuL2FycmF5TGlrZVRvQXJyYXlcIik7XG5cbmZ1bmN0aW9uIF9hcnJheVdpdGhvdXRIb2xlcyhhcnIpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycmF5TGlrZVRvQXJyYXkoYXJyKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfYXJyYXlXaXRob3V0SG9sZXM7IiwiZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheShpdGVyKSB7XG4gIGlmICh0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiICYmIFN5bWJvbC5pdGVyYXRvciBpbiBPYmplY3QoaXRlcikpIHJldHVybiBBcnJheS5mcm9tKGl0ZXIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9pdGVyYWJsZVRvQXJyYXk7IiwiZnVuY3Rpb24gX25vbkl0ZXJhYmxlU3ByZWFkKCkge1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIHNwcmVhZCBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfbm9uSXRlcmFibGVTcHJlYWQ7IiwidmFyIGFycmF5V2l0aG91dEhvbGVzID0gcmVxdWlyZShcIi4vYXJyYXlXaXRob3V0SG9sZXNcIik7XG5cbnZhciBpdGVyYWJsZVRvQXJyYXkgPSByZXF1aXJlKFwiLi9pdGVyYWJsZVRvQXJyYXlcIik7XG5cbnZhciB1bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheSA9IHJlcXVpcmUoXCIuL3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5XCIpO1xuXG52YXIgbm9uSXRlcmFibGVTcHJlYWQgPSByZXF1aXJlKFwiLi9ub25JdGVyYWJsZVNwcmVhZFwiKTtcblxuZnVuY3Rpb24gX3RvQ29uc3VtYWJsZUFycmF5KGFycikge1xuICByZXR1cm4gYXJyYXlXaXRob3V0SG9sZXMoYXJyKSB8fCBpdGVyYWJsZVRvQXJyYXkoYXJyKSB8fCB1bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIpIHx8IG5vbkl0ZXJhYmxlU3ByZWFkKCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3RvQ29uc3VtYWJsZUFycmF5OyIsInZhciBhcnJheUxpa2VUb0FycmF5ID0gcmVxdWlyZShcIi4vYXJyYXlMaWtlVG9BcnJheVwiKTtcblxuZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikge1xuICBpZiAoIW8pIHJldHVybjtcbiAgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pO1xuICB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7XG4gIGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7XG4gIGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG8pO1xuICBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIGFycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXk7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0aWYoX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSkge1xuXHRcdHJldHVybiBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiBtb2R1bGVbJ2RlZmF1bHQnXSA6XG5cdFx0KCkgPT4gbW9kdWxlO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkiLCJjb25zdCBTQVZFX09QVElPTlMgPSB7IElQRlM6IFwiaXBmc1wiLCBET1dOTE9BRFM6IFwiZG93bmxvYWRzXCIsIEJPVEg6IFwiYm90aFwiIH07XG5jb25zdCBNRVNTQUdFX1RZUEVTID0ge1xuICBTQ1JBUEVfQUNUSVZFX1RBQjogXCJTQ1JBUEVfQUNUSVZFX1RBQlwiLFxuICBTQ1JBUEVfTkVXX1RBQjogXCJTQ1JBUEVfTkVXX1RBQlwiLFxuICBIVE1MOiBcIkhUTUxcIixcbiAgUERGX1dJVEhfU0FWRURfTUVUQURBVEE6IFwiUERGX1dJVEhfU0FWRURfTUVUQURBVEFcIixcbiAgUERGX1dJVEhPVVRfU0FWRURfTUVUQURBVEE6IFwiUERGX1dJVEhPVVRfU0FWRURfTUVUQURBVEFcIixcbiAgRVJST1I6IFwiRVJST1JcIixcbn07XG5cbmV4cG9ydCB7IFNBVkVfT1BUSU9OUywgTUVTU0FHRV9UWVBFUyB9O1xuIiwiaW1wb3J0IHsgTUVTU0FHRV9UWVBFUyB9IGZyb20gXCIuL2NvbnN0YW50c1wiO1xuXG5jb25zdCBidXR0b25Dc3NUZXh0ID0gYFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgbWFyZ2luLWxlZnQ6IDZweDtcbiAgYmFja2dyb3VuZDogbm9uZTtcbiAgYm94LXNoYWRvdzogbm9uZTtcbiAgY29sb3I6IERhcmtPcmFuZ2U7XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIGJvcmRlci1yYWRpdXM6IDBweDtcbiAgYm9yZGVyLWNvbG9yOiBEYXJrT3JhbmdlO1xuYDtcblxuWy4uLmRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJnc19yaVwiKV0ubWFwKCh4KSA9PiB7XG4gIGNvbnN0IGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJCVVRUT05cIik7XG4gIGJ0bi5pbm5lckhUTUwgPSBcIlxcdTI3OTUgRGVjZW50IFBhcGVyc1wiO1xuICBidG4uc3R5bGUuY3NzVGV4dCA9IGJ1dHRvbkNzc1RleHQ7XG5cbiAgY29uc3QgdXJsID0geC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZ3NfcnRcIilbMF0uZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJhXCIpWzBdXG4gICAgLmhyZWY7XG5cbiAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2Uoe1xuICAgICAgdHlwZTogTUVTU0FHRV9UWVBFUy5TQ1JBUEVfTkVXX1RBQixcbiAgICAgIHVybCxcbiAgICB9KTtcbiAgfSk7XG5cbiAgeC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZ3NfYVwiKVswXS5hcHBlbmRDaGlsZChidG4pO1xufSk7XG4iXSwic291cmNlUm9vdCI6IiJ9