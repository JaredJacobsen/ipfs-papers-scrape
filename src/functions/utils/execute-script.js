//WrappedAsyncFunc must be of the form: () => asyncFunc.then((result) => chrome.runtime.sendMessage({ result, id: "an id matching the id arg to executeAsyncFunc" }))
export default async function executeScript({ tabId, id, args, script, func }) {
  return new Promise((resolve, reject) => {
    chrome.runtime.onMessage.addListener(function listener(
      message,
      sender,
      sendResponse
    ) {
      if (sender.tab.id === tabId && message.id === id) {
        if (message.type === "start") {
          return sendResponse(args);
        } else if (message.type === "end") {
          chrome.runtime.onMessage.removeListener(listener);
          if (message.error) {
            reject(message.error);
          }
          resolve(message.result);
        }
      }
      return true; //keeps message port alive
    });

    chrome.tabs.executeScript(
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
