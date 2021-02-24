import { MESSAGE_TYPES } from "../constants";
import scrapeActiveTab from "./scrape-active-tab";
import scrapeUrl from "./scrape-url";
import log from "./utils/log";

export default function setupMessageListeners(ipfsPromise) {
  chrome.runtime.onMessage.addListener(async (message) => {
    if (message.type === MESSAGE_TYPES.SCRAPE) {
      try {
        const { url } = message;
        if (url) {
          log("Scraping url: " + url);
          scrapeUrl(await ipfsPromise, url);
        } else {
          log("Scraping active tab.");
          scrapeActiveTab(await ipfsPromise);
        }
      } catch (error) {
        log("Scrape Failed");
        log(error);
      }
    }
    return true; //event listener must return true to keep message port alive for sendResponse to work
  });
}
