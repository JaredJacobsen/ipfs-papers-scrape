import IpfsHttpClient from "ipfs-http-client";
import { MESSAGE_TYPES } from "./constants";
import getOptions from "./functions/utils/getOptions";
import scrapeNewTab from "./functions/scrape-new-tab";
import scrapeActiveTab from "./functions/scrape-active-tab";

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "scrapePaper",
    title: "Add to Decent Papers",
    contexts: ["selection", "link"],
  });
});

getOptions().then(({ ipfsUrl }) => {
  const ipfs = IpfsHttpClient(ipfsUrl);

  chrome.contextMenus.onClicked.addListener(async function (info) {
    if (info.menuItemId == "scrapePaper") {
      console.log(JSON.stringify(info));

      if (info.linkUrl) {
        scrapeNewTab(ipfs, info.linkUrl);
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

  chrome.runtime.onMessage.addListener((message) => {
    if (message.type === MESSAGE_TYPES.SCRAPE) {
      if (message.url) {
        scrapeNewTab(ipfs, message.url);
      } else {
        scrapeActiveTab(ipfs);
      }
    }
    return true; //event listener must return true to keep message port alive for sendResponse to work
  });
});
