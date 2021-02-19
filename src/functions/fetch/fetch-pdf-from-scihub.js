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
