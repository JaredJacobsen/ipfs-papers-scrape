import isPdf from "./functions/utils/is-pdf";

(async () => {
  console.log("in scrape active");

  await chrome.storage.local.set({ test: "testing storage" });

  try {
    const response = await fetch(location.href);
    if (response.ok) {
      const responseClone = response.clone();
      const isUrlAPdf = isPdf(await responseClone.arrayBuffer());
      if (isUrlAPdf) {
        const pdf = URL.createObjectURL(await response.blob());
        chrome.runtime.sendMessage({ type: "PDF", pdf });
      } else {
        chrome.runtime.sendMessage({
          type: "HTML",
          html: document.documentElement.outerHTML,
        });
      }
    } else {
      throw "bad response status: " + response.status;
    }
  } catch (error) {
    chrome.runtime.sendMessage({ type: "ERROR", error });
  }
})();
