import storage from "../storage";
import tabReady from "./tabs/tab-ready";
import getActiveTab from "./utils/get-active-tab";
import origin from "./utils/origin";

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
      url: origin(details.url),
      active: false,
    });

    await tabReady(newTab.id);

    await storage.set(newTab.id, details);

    chrome.scripting.executeScript({
      target: { tabId: newTab.id },
      files: [details.script],
    });
  }
}
