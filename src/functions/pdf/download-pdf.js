import displayPopupMessage from "../utils/display-popup-message";

export default async function downloadPdf(filename, data) {
  chrome.downloads.download({ filename, body: data }, (downloadId) => {
    if (!downloadId) {
      console.log("Failed to download PDF");
      displayPopupMessage("Failed to download PDF");
    }
  });
}
