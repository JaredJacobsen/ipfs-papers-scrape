import storage from "../storage";
import getActiveTab from "./utils/get-active-tab";
import urlOrigin from "./utils/url-origin";

export default async function executeScript(details) {
  if (!details.newTab) {
    const { id } = await getActiveTab();

    await storage.set(id, details);

    chrome.scripting.executeScript({
      target: { tabId: id },
      files: [details.script],
    });
  } else {
    const newTab = await chrome.tabs.create({
      url: details.indirectFetch ? urlOrigin(url) : url,
      active: false,
    });

    try {
      chrome.webNavigation.onCommitted.addListener(async function listener({
        tabId,
      }) {
        if (tabId === newTab.id) {
          chrome.webNavigation.onCommitted.removeListener(listener);

          await storage.set(newTab.id, details);

          chrome.scripting.executeScript({
            target: { tabId: newTab.id },
            files: [details.script],
          });
        }
      });
    } catch (error) {
      details.onError(error);
    }
  }
}
