// import Tesseract from "tesseract.js";
import IpfsHttpClient from "ipfs-http-client";
import displayPopupMessage from "./functions/display-popup-message";
import { MESSAGE_TYPES } from "./constants";
import extractTextFromPdf from "./functions/pdf/extract-text-from-pdf";
import savePdf from "./functions/pdf/save-pdf";
import { ipfsUrl } from "../config";
import pdfObjectUrlToBlob from "./functions/pdf/pdf-object-url-to-blob";
import textToMetadata from "./functions/metadata/textToMetadata";
import saveMetadata from "./functions/metadata/save-metadata";
import storage from "./storage";
import executeScript from "./functions/execute-script";
import getActiveTab from "./functions/utils/get-active-tab";
import sameOrigin from "./functions/utils/same-origin";

const ipfs = IpfsHttpClient(ipfsUrl);

//#region scrape paper

//TODO how to clean up listeners? Will there only ever be one SW regardless of how many times the extension is activated?
//TODO I need some sort of cache in case the user tries to scrape twice.
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  const tabId = sender.tab && sender.tab.id;
  const details = await storage.get(tabId);

  if (details && details.newTab && message.type !== MESSAGE_TYPES.DETAILS) {
    chrome.tabs.remove(tabId);
  }

  console.log({ tabId, message, details });

  messageHandlers[message.type](message, sender, sendResponse);
});

const messageHandlers = {
  [MESSAGE_TYPES.SCRAPE]: async (message) => {
    const activeTab = await getActiveTab();
    const newTab = !sameOrigin(activeTab.url, message.url);

    executeScript({
      newTab,
      url: message.url,
      script: "scrapeHtmlOrPdf.js",
    });
  },

  [MESSAGE_TYPES.HTML]: async (message) => {
    const metadata = await textToMetadata(message.html);
    await saveMetadata(ipfs, metadata);
    console.log("metadata", metadata);

    const { url_for_pdf, title } = metadata;
    if (url_for_pdf) {
      console.log("fetching pdf from: ", title);

      const activeTab = await getActiveTab();

      executeScript({
        newTab: !sameOrigin(activeTab.url, url_for_pdf),
        url: url_for_pdf,
        script: "scrapePdf.js",
        title,
      });
    } else {
      //fetch scihub
    }
  },

  [MESSAGE_TYPES.PDF_WITH_SAVED_METADATA]: async (message, sender) => {
    const pdf = await pdfObjectUrlToBlob(message.pdf);

    const { title } = await storage.get(sender.tab.id);

    const res = await savePdf(ipfs, title, pdf);
    displayPopupMessage(
      res ? "Saved PDF to IPFS" : "Failed to save PDF to IPFS"
    );
  },

  [MESSAGE_TYPES.PDF_WITHOUT_SAVED_METADATA]: async (message) => {
    const pdf = await pdfObjectUrlToBlob(message.pdf);

    const text = await extractTextFromPdf(pdf);
    const metadata = await textToMetadata(ipfs, text);
    const savedMetadata = await saveMetadata(ipfs, metadata);
    displayPopupMessage(
      savedMetadata
        ? "Saved Metadata to IPFS"
        : "Failed to save Metadata to IPFS"
    );

    const savedPdf = await savePdf(ipfs, metadata.title, pdf);
    displayPopupMessage(
      savedPdf ? "Saved PDF to IPFS" : "Failed to save PDF to IPFS"
    );
  },

  [MESSAGE_TYPES.DETAILS]: async (_, sender, sendResponse) => {
    const details = await storage.get(sender.tab.id);
    console.log("details: ", details);
    sendResponse(details);
  },

  [MESSAGE_TYPES.ERROR]: async (message, sender) => {
    console.log(
      "Failed to scrape paper from tabId " +
        sender.tab.id +
        " due to the following error:"
    );
    console.log(message.error);
  },
};

// async function fetchPdf(metadata) {
//   const fetchFromScihub = !metadata.url_for_pdf; //TODO check if settings allow scihub
//   const createTabUrl = fetchFromScihub
//     ? scihubUrl + doi
//     : metadata.url_for_pdf;

//   chrome.tabs.create({ url: createTabUrl, active: false }, async (tab) => {
//     const tabUrl = tab.url || tab.pendingUrl; //`tabUrl` could be different than `createTabUrl` if there is a redirect or something

//     const code = `(async () => {
//       try {
//         ${
//           fetchFromScihub
//             ? `const res = await fetch("${tabUrl}");
//               const parser = new DOMParser();
//               const url = parser
//               .parseFromString(await res.text(), "text/html")
//               .querySelector("iframe#pdf")
//               .src.replace("chrome-extension", "https")
//               .replace(/#.*/g, "");
//               const response = await fetch(url)`
//             : `const response = await fetch("${tabUrl}")`
//         }
//         if (response.ok) {
//           const url = URL.createObjectURL(await response.blob())
//           chrome.runtime.sendMessage({action: "sendPdf", url})
//         } else {
//           throw "bad response: " + response.status
//         }
//       } catch (error) {
//         chrome.runtime.sendMessage({action: "sendPdf", error })
//       }
//     })();`;

//     // chrome.tabs.executeScript(tab.id, { code });
//     const result = await chrome.scripting.executeScript({
//       target: { tabId: tab.id },
//       function: getTitle,
//     });
//   });
// }

// const getPdfFromScihub = (doi) => async () => {
//   try {
//     const res = await fetch("${tabUrl}");
//     const parser = new DOMParser();
//     const url = parser
//       .parseFromString(await res.text(), "text/html")
//       .querySelector("iframe#pdf")
//       .src.replace("chrome-extension", "https")
//       .replace(/#.*/g, "");
//     if (response.ok) {
//       const url = URL.createObjectURL(await response.blob());
//       chrome.runtime.sendMessage({ action: "sendPdf", url });
//     } else {
//       throw "bad response: " + response.status;
//     }
//   } catch (error) {
//     chrome.runtime.sendMessage({ action: "sendPdf", error });
//   }
// };

// const saveTo = (await isIpfsReachable(ipfs))
//   ? SAVE_OPTIONS.IPFS
//   : SAVE_OPTIONS.DOWNLOADS; //TODO should be false depending on options

// if (saveTo === SAVE_OPTIONS.ipfs || saveTo === SAVE_OPTIONS.BOTH) {
// }

// if (
//   saveTo === SAVE_OPTIONS.DOWNLOADS ||
//   saveTo === SAVE_OPTIONS.BOTH
// ) {
//   downloadPdf(mfsFilename, data);
// }

// async function listenForFetchedPdf(metadata, mfsFilename, saveTo) {
//   chrome.runtime.onMessage.addListener(async function listener(message) {
//     if (message.action === "sendPdf") {
//       chrome.runtime.onMessage.removeListener(listener);
//       if (message.error) {
//         console.log("Failed to fetch pdf");
//         console.log(error);
//       } else {
//         console.log("saving pdf");

//         const data = await fetch(message.url).then((r) => r.blob());
//         chrome.tabs.remove(tab.id);

//         if (
//           saveTo === SAVE_OPTIONS.IPFS ||
//           saveTo === SAVE_OPTIONS.BOTH
//         ) {
//           savePdf(mfsFilename, metadata, data, ipfs);
//         }

//         if (
//           saveTo === SAVE_OPTIONS.DOWNLOADS ||
//           saveTo === SAVE_OPTIONS.BOTH
//         ) {
//           downloadPdf(mfsFilename, data);
//         }
//       }
//     }
//   });
// }

//#endregion scrape paper

//#region OCR

// Tesseract.recognize("http://tesseract.projectnaptha.com/img/eng_bw.png", {
//   logger: (m) => bkg.console.log(m),
// }).then(({ data: { text } }) => {
//   var h = document.createElement("H1");
//   var t = document.createTextNode(text);
//   h.appendChild(t);
//   popupDocument.body.prepend(h);
// });

// chrome.tabs.captureVisibleTab(null, {}, function (imageDataUrl) {
// var DOM_img = document.createElement("img");
// DOM_img.src = imageDataUrl;
// popupDocument.body.prepend(DOM_img);
// });

//#endregion

//#region context menu

// chrome.contextMenus.create({
//   id: "addPaper",
//   title: "Add paper to IPFS-Papers",
//   contexts: ["selection"],
// });

// chrome.contextMenus.onClicked.addListener(function (info, tab) {
//   if (info.menuItemId == "addPaper") {
//     console.log(JSON.stringify(info));
//   }
// });

// const ipfsOptions = {
//   // repo: "./ipfs"
// };
// IPFS.create(ipfsOptions).then(async (ipfs) => {
//   const ipfs = await IPFS.create(ipfsOptions);
//   const room = Room(ipfs, "ipfs-papers");

//   room.on("peer joined", (peer) => {
//     console.log("Peer joined the room", peer);
//   });

//   room.on("peer left", (peer) => {
//     console.log("Peer left...", peer);
//   });

//   // now started to listen to room
//   room.on("subscribed", () => {
//     console.log("Now connected!");
//   });
// });

//#endregion
