import storage from "../storage";

export default async function executeScriptInNewTab(details) {
  let { url } = details;
  if (details.indirectFetch) {
    const scheme = url.split("://")[0];
    const { hostname } = new URL(url);
    url = scheme + "://" + hostname;
  }

  const newTab = await chrome.tabs.create({
    url,
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
