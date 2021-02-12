import storage from "../storage";
import poll from "./utils/poll";

export default async function executeScriptInNewTab({
  options = {},
  script,
  onError = (e) => console.log(e),
}) {
  let url = options.url;
  console.log("url1: ", url);
  if (options.indirectFetch) {
    const scheme = url.split("://")[0];
    const { hostname } = new URL(url);
    url = scheme + "://" + hostname;
  }

  console.log("url", url);

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
      20000,
      100
    );

    await storage.set(newTab.id, options);

    chrome.scripting.executeScript({
      target: { tabId: newTab.id },
      files: [script],
    });
  } catch (error) {
    onError(error);
  }
}
