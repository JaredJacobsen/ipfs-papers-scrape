"use strict";

var _tesseract = _interopRequireDefault(require("tesseract.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

chrome.tabs.captureVisibleTab(null, {}, function (imageDataUrl) {
  document.body.prepend("This is a test");
  var DOM_img = document.createElement("img");
  DOM_img.src = imageDataUrl;
  document.body.prepend(DOM_img);

  _tesseract.default.recognize(imageDataUrl, {
    logger: m => console.log(m)
  }).then((_ref) => {
    let {
      data: {
        text
      }
    } = _ref;
    throw text;
  });
});