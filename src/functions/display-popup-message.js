import { toString } from "lodash/fp";

export default function displayPopupMessage(popupMessage) {
  popupMessage = toString(popupMessage);
  console.log("popup message: ", popupMessage);
  chrome.runtime.sendMessage({ popupMessage });
}
