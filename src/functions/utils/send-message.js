export default async function sendMessage(obj) {
  return new Promise((resolve, reject) =>
    chrome.runtime.sendMessage(obj, (res) => resolve(res))
  );
}
