export default function sendMessage(obj) {
  return new Promise((resolve) =>
    chrome.runtime.sendMessage(obj, (res) => {
      log({ res });
      resolve(res);
    })
  );
}
