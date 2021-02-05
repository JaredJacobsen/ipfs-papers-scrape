export default function displayPopupMessage(popupMessage) {
  console.log("popup message: ", popupMessage);
  chrome.runtime.sendMessage({ popupMessage });
}
