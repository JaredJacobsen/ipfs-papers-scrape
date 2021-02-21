import { toString } from "lodash/fp";

export default function displayPopupMessage(popupMessage) {
  popupMessage = toString(popupMessage);
  log("popup message: ", popupMessage);
  chrome.runtime.sendMessage({ popupMessage });
}
