import displayPopupMessage from "./display-popup-message";

export default async function download(filename, data) {
  chrome.downloads.download({ filename, body: data }, (downloadId) => {
    if (!downloadId) {
      throw "Failed to download to device";
    }
  });
}
