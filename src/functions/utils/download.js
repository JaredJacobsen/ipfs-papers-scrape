export default async function download(filename, data) {
  chrome.downloads.download({ filename, body: data }, (downloadId) => {
    if (!downloadId) {
      throw new Error("Failed to download to device");
    }
  });
}
