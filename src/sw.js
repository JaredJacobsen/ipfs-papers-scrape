import IpfsHttpClient from "ipfs-http-client";
import { MESSAGE_TYPES } from "./constants";
import storage from "./storage";
import getOptions from "./functions/getOptions";
import messageHandlers from "./messageHandlers";

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "scrapePaper",
    title: "Add to Decent Papers",
    contexts: ["selection", "link"],
  });
});

//TODO maybe I should getOptions inside listeners so that listeners will be registered immediately
getOptions().then(({ ipfsUrl }) => {
  const ipfs = IpfsHttpClient(ipfsUrl);

  chrome.contextMenus.onClicked.addListener(async function (info) {
    if (info.menuItemId == "scrapePaper") {
      console.log(JSON.stringify(info));

      if (info.linkUrl) {
        messageHandlers[MESSAGE_TYPES.SCRAPE]({
          ipfs,
          message: {
            type: MESSAGE_TYPES.SCRAPE,
            url: info.linkUrl,
          },
        });
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

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const tabId = sender.tab && sender.tab.id;
    storage.get(tabId).then((details) => {
      if (details && details.newTab && message.type !== MESSAGE_TYPES.DETAILS) {
        chrome.tabs.remove(tabId);
      }

      console.log("onMessage triggered: ", { tabId, message, details });

      messageHandlers[message.type]({ ipfs, message, sender, sendResponse });
    });
    return true; //event listener must return true to keep message port alive to sendResponse
  });
});
