import { MESSAGE_TYPES } from "./constants";

document.body.append("Scraping...");

function log(message) {
  document.body.append("\n|\n");
  document.body.append(message);
}

chrome.runtime.onMessage.addListener(async function listener(request) {
  const { popupMessage } = request;
  if (popupMessage) {
    log(popupMessage);
  }
});

chrome.runtime.sendMessage({ type: MESSAGE_TYPES.START_SCRAPE });
