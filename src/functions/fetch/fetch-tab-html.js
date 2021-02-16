export default function fetchTabHtml(tabId) {
  return new Promise((resolve) =>
    chrome.scripting.executeScript(
      {
        target: { tabId },
        function: () => document.documentElement.outerHTML,
      },
      resolve
    )
  );
}
