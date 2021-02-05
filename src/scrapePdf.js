(async () => {
  console.log("in scrapePdf");

  try {
    const response = await fetch(location.href);

    if (response.ok) {
      const pdf = URL.createObjectURL(await response.blob());
      chrome.runtime.sendMessage({ type: "PDF", pdf });
    } else {
      throw "bad response: " + response.status;
    }
  } catch (error) {
    chrome.runtime.sendMessage({ type: "ERROR", error });
  }
})();
