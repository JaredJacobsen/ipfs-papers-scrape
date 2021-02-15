//WrappedAsyncFunc must be of the form: () => asyncFunc.then((result) => chrome.runtime.sendMessage({ result, id: "an id matching the id arg to executeAsyncFunc" }))
export default async function executeScript({ tabId, id, args, script, func }) {
  return new Promise((resolve) => {
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

// import storage from "../storage";
// import tabReady from "./tabs/tab-ready";
// import getActiveTab from "./utils/get-active-tab";
// import origin from "./utils/origin";

// export default async function executeScript(details) {
//   return new Promise(async (resolve) => {
//     if (!details.newTab) {
//       const { id } = await getActiveTab();

//       await storage.set(id, details);

//       chrome.scripting.executeScript({
//         target: { tabId: id },
//         files: [details.script],
//       });
//     } else {
//       const newTab = await chrome.tabs.create({
//         url: origin(details.url),
//         active: false,
//       });

//       await tabReady(newTab.id);

//       await storage.set(newTab.id, details);

//       chrome.scripting.executeScript({
//         target: { tabId: newTab.id },
//         files: [details.script],
//       });
//     }
//   });
// }
