import { toString } from "lodash/fp";
import displayPopupMessage from "../utils/display-popup-message";
import poll from "../utils/poll";

export default async function fetchPdf(url, title) {
  console.log("fetching pdf from: ", url, title);

  const newTab = await chrome.tabs.create({
    url,
    active: false,
  });

  try {
    await poll(
      async () => {
        const tab = await chrome.tabs.get(newTab.id);
        return tab.status === "complete";
      },
      8000,
      100
    );

    //Map tab id to title so the service worker can later match the scraped pdf with the right metadata
    chrome.storage.local.set({ [toString(newTab.id)]: title }, () => {
      chrome.scripting.executeScript({
        target: { tabId: newTab.id },
        files: ["scrapePdf.js"],
      });
    });
  } catch (error) {
    console.log(error);
    displayPopupMessage(
      "Error: Unable to save PDF because its download URL is unreachable."
    );
  }
}
