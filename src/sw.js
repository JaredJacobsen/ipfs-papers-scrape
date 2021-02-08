// import Tesseract from "tesseract.js";
import { keys, toString } from "lodash/fp";
import IpfsHttpClient from "ipfs-http-client";
import displayPopupMessage from "./functions/utils/display-popup-message";
import { MESSAGE_TYPES } from "./constants";
import extractTextFromPdf from "./functions/pdf/extract-text-from-pdf";
import savePdf from "./functions/pdf/save-pdf";
import { ipfsUrl } from "../config";
import fetchPdf from "./functions/pdf/fetch-pdf";
import pdfObjectUrlToBlob from "./functions/pdf/pdf-object-url-to-blob";
import textToMetadata from "./functions/metadata/textToMetadata";
import saveMetadata from "./functions/metadata/save-metadata";

const ipfs = IpfsHttpClient(ipfsUrl);

//#region scrape paper

//TODO how to clean up listeners?
//TODO I need some sort of cache in case the user tries to scrape twice.
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Message Keys: ", keys(message));
  messageHandlers[message.type](message, sender, sendResponse);
});

const messageHandlers = {
  [MESSAGE_TYPES.START_SCRAPE]: async () => {
    const tabs = await chrome.tabs.query({
      active: true,
      lastFocusedWindow: true,
    });

    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      files: ["scrapeActiveWindow.js"],
    });
  },

  [MESSAGE_TYPES.HTML]: async (message) => {
    const metadata = await textToMetadata(message.html);
    await saveMetadata(ipfs, metadata);

    const { url_for_pdf, title } = metadata;
    console.log("metadata", metadata);
    if (url_for_pdf) {
      fetchPdf(url_for_pdf, title);
    } else {
      //fetch scihub
    }
  },

  [MESSAGE_TYPES.NEW_TAB_PDF]: async (message, sender) => {
    const pdf = await pdfObjectUrlToBlob(message.pdf);
    chrome.tabs.remove(sender.tab.id);

    const tabId = toString(sender.tab.id);
    chrome.storage.local.get([tabId], async ({ [tabId]: title }) => {
      const res = await savePdf(ipfs, title, pdf);
      displayPopupMessage(
        res ? "Saved PDF to IPFS" : "Failed to save PDF to IPFS"
      );
    });
  },

  [MESSAGE_TYPES.ACTIVE_TAB_PDF]: async (message) => {
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

  [MESSAGE_TYPES.ERROR]: async (message, sender) => {
    console.log("Failed to scrape paper from tabId " + sender.tab.id);
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
