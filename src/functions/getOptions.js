import defaultOptions from "../defaultOptions";

export default function getOptions() {
  return new Promise((resolve) =>
    chrome.storage.sync.get(defaultOptions, resolve)
  );
}
