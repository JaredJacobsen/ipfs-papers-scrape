import { toString } from "lodash/fp";
import storage from "../storage";
import poll from "./utils/poll";

export default async function executeScriptInNewTab({
  url,
  script,
  tabInfo = {},
  onError = (e) => console.log(e),
}) {
  const newTab = await chrome.tabs.create({
    url,
    active: false,
  });

  try {
    await poll(
      async () => {
        console.log("Fetching tab", newTab.id);
        const tab = await chrome.tabs.get(newTab.id); //TODO if the tab is closed right away, a "no tab id found" error will happen
        return tab.status === "complete";
      },
      15000,
      100
    );

    await storage.set(newTab.id, tabInfo);

    chrome.scripting.executeScript({
      target: { tabId: newTab.id },
      files: [script],
    });
  } catch (error) {
    onError(error);
  }
}
