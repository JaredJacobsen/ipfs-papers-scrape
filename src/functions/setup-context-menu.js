import { GOOGLE_SCHOLAR_QUERY_BASE_URL } from "../constants";
import scrapeUrl from "./scrape-url";
import logTable from "./utils/logTable";
import log from "./utils/log";

export default function setupContextMenu(ipfsPromise) {
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
          scrapeUrl(await ipfsPromise, info.linkUrl);
        } catch (error) {
          log("Scrape Failed");
          log(error);
        }
      } else {
        await chrome.tabs.create({
          url:
            GOOGLE_SCHOLAR_QUERY_BASE_URL +
            encodeURIComponent(info.selectionText),
          active: true,
        });
      }
    }
  });
}
