export default function tabReady(newTabId) {
  return new Promise((resolve) =>
    chrome.webNavigation.onCommitted.addListener(async function listener({
      tabId,
    }) {
      if (tabId === newTabId) {
        chrome.webNavigation.onCommitted.removeListener(listener);
        resolve();
      }
    })
  );
}
