import IpfsHttpClient from "ipfs-http-client";
import { MESSAGE_TYPES } from "./constants";
import getOptions from "./functions/utils/getOptions";
import scrapeActiveTab from "./functions/scrape-active-tab";
import scrapeUrl from "./functions/scrape-url";
import logTable from "./functions/utils/logTable";
import log from "./functions/utils/log";

let ipfs;
getOptions().then(({ ipfsUrl }) => {
  ipfs = IpfsHttpClient(ipfsUrl);
});

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === MESSAGE_TYPES.SCRAPE) {
    try {
      const { url } = message;
      if (url) {
        log("Scraping url: " + url);
        scrapeUrl(ipfs, url);
      } else {
        log("Scraping active tab.");
        scrapeActiveTab(ipfs);
      }
    } catch (error) {
      log("Scrape Failed");
      log(error);
    }
  }
  return true; //event listener must return true to keep message port alive for sendResponse to work
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "scrapePaper",
    title: "Add to Decent Papers",
    contexts: ["selection", "link"],
  });
});

chrome.contextMenus.onClicked.addListener(async function (info) {
  if (info.menuItemId == "scrapePaper") {
    logTable(info, "Context menu click event info");

    if (info.linkUrl) {
      try {
        scrapeUrl(ipfs, info.linkUrl);
      } catch (error) {
        log("Scrape Failed");
        log(error);
      }
    } else {
      await chrome.tabs.create({
        url:
          "https://scholar.google.com/scholar?q=" +
          encodeURIComponent(info.selectionText),
        active: true,
      });
    }
  }
});
