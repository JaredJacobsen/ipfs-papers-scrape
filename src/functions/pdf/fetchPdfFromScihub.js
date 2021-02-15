export default async function fetchPdfFromScihub(doi) {}

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
