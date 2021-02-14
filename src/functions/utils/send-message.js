export default function sendMessage(obj) {
  return new Promise((resolve) =>
    chrome.runtime.sendMessage(obj, (res) => {
      console.log({ res });
      resolve(res);
    })
  );
}
