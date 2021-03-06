import { MESSAGE_TYPES } from "../../constants";

export default async function executeScript({ tabId, id, args, script, func }) {
  return new Promise((resolve, reject) => {
    chrome.runtime.onMessage.addListener(function listener(
      message,
      sender,
      sendResponse
    ) {
      if (sender.tab.id === tabId && message.id === id) {
        if (message.type === MESSAGE_TYPES.ARGS) {
          return sendResponse(args);
        }
        if (message.type === MESSAGE_TYPES.DONE) {
          chrome.runtime.onMessage.removeListener(listener);
          if (message.error) {
            reject("executeScript failed. " + message.error);
          }
          resolve(message.result);
        }
      }
      return true; //keeps message port alive
    });

    chrome.scripting.executeScript(
      script
        ? {
            tabId,
            files: [script],
          }
        : {
            tabId,
            function: func,
          }
    );
  });
}
