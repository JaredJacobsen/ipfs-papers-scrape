// import Tesseract from "tesseract.js";
import { keys, toString } from "lodash/fp";
import IpfsHttpClient from "ipfs-http-client";
import displayPopupMessage from "./functions/utils/display-popup-message";
import { MESSAGE_TYPES } from "./constants";
import extractTextFromPdf from "./functions/pdf/extract-text-from-pdf";
import fetchAndSaveMetadata from "./functions/metadata/fetch-and-save-metadata";
import savePdf from "./functions/pdf/save-pdf";
import poll from "./functions/utils/poll";

const ipfs = IpfsHttpClient("http://localhost:5001");

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
    const [mfsFilename, metadata] = await fetchAndSaveMetadata(
      message.html,
      ipfs
    );

    if (metadata.url_for_pdf) {
      console.log("fetching pdf from: ", metadata.url_for_pdf);

      const newTab = await chrome.tabs.create({
        url: metadata.url_for_pdf,
        active: false,
      });

      try {
        await poll(
          async () => {
            const tab = await chrome.tabs.get(newTab.id);
            return tab.status === "complete";
          },
          8000,
          100
        );

        //TODO should remove these objects from storage at some point, maybe after everything successfully saves in ipfs
        //Map tab id to metadata so that the scraped pdf can be matched with the metadata later
        chrome.storage.local.set(
          {
            [toString(newTab.id)]: { mfsFilename, metadata },
          },
          () => {
            chrome.scripting.executeScript({
              target: { tabId: newTab.id },
              files: ["scrapePdf.js"],
            });
          }
        );
      } catch (error) {
        const m =
          "Error: Unable to save PDF because its download URL is unreachable.";
        console.log(m);
        displayPopupMessage(m);
      }
    } else {
      //fetch scihub
    }
  },

  [MESSAGE_TYPES.PDF]: async (message, sender) => {
    // const pdf = await fetch(message.pdf).then((r) => r.blob());

    // const { tabId, pdfKey } = message;
    // const pdfKey = toString(message.pdfKey);

    const tabId = toString(sender.tab.id);
    console.log("tabId: ", tabId);

    chrome.storage.local.get(
      [tabId],
      async ({ [tabId]: { mfsFilename, metadata } }) => {
        const pdf = await fetch(message.pdf).then((r) => r.blob());

        if (!pdf) {
          console.log("No PDF returned from content script");
          displayPopupMessage("Failed to save PDF to IPFS");
        } else {
          if (!mfsFilename || !metadata) {
            const text = await extractTextFromPdf(pdf);
            const arr = await fetchAndSaveMetadata(text, ipfs); //TODO fetch and save metadata should happen separately because I will still need metadata even if can't save
            mfsFilename = arr[0];
            metadata = arr[1];
          }

          const res = await savePdf(mfsFilename, metadata, pdf, ipfs);

          if (res) {
            displayPopupMessage("Saved PDF to IPFS");
          } else {
            displayPopupMessage("Failed to save PDF to IPFS");
          }
        }
      }
    );
  },

  [MESSAGE_TYPES.TAB_ID]: async (_, sender, sendResponse) =>
    sendResponse({ tabId: sender.tab.id }),

  [MESSAGE_TYPES.ERROR]: async (message, sender) => {
    console.log("Failed to scrape paper from tabId " + sender.tab.id);
    console.log(message.error);
  },
};

// async function fetchPdf(metadata) {
//   const fetchFromScihub = !metadata.url_for_pdf; //TODO check if settings allow scihub
//   const createTabUrl = fetchFromScihub
//     ? SCIHUB_URL + doi
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
