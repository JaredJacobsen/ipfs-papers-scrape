import displayPopupMessage from "./functions/display-popup-message";
import extractTextFromPdf from "./functions/pdf/extract-text-from-pdf";
import savePdf from "./functions/pdf/save-pdf";
import pdfObjectUrlToBlob from "./functions/pdf/pdf-object-url-to-blob";
import textToMetadata from "./functions/metadata/textToMetadata";
import saveMetadata from "./functions/metadata/save-metadata";
import executeScript from "./functions/execute-script";
import getActiveTab from "./functions/utils/get-active-tab";
import sameOrigin from "./functions/utils/same-origin";
import { MESSAGE_TYPES } from "./constants";
import storage from "./storage";
import fetchHtmlOrPdf from "./functions/utils/fetch-html-or-pdf";
import fetchPdf from "./functions/pdf/fetch-pdf";
import sendMessage from "./functions/utils/send-message";
import createNewTab from "./functions/tabs/create-new-tab";

// async function getActiveTabContents() {
//   const activeTab = await getActiveTab();
//   asyncFunc.then((result) => chrome.runtime.sendMessage({ result }));

//   const pdf = executeAsyncFunc();
// }

function getTabHtml(tabId) {
  return new Promise((resolve) =>
    chrome.scripting.executeScript(
      {
        target: { tabId },
        function: () => document.documentElement.outerHTML,
      },
      resolve
    )
  );
}

function getTabContents(tabId) {
  return new Promise((resolve) =>
    chrome.scripting.executeScript(
      {
        target: { tabId },
        function: () => ,
      },
      resolve
    )
  );
}

function scrapeMetadata(tabId) {
  console.log("Fetching html in active tab");
  const html = await getTabHtml(tabId);
  
  console.log("Fetching metadata");
  const metadata = await textToMetadata(html);
  
  console.log("Saving metadata: ", metadata);
  await saveMetadata(ipfs, metadata);
  console.log("Saved metadata");
}

const messageHandlers = {
  [MESSAGE_TYPES.SCRAPE]: async ({ ipfs, message }) => {
    const activeTab = await getActiveTab();
    const { scrapeActiveTab } = message;
    const { url } = scrapeActiveTab ? activeTab : message;

    if (scrapeActiveTab) {

    } else {
      console.log("Creating new tab");
      const newTab = await createNewTab(url, false);

      console.log("execute script in new tab");
      const { html, pdf, error } = await executeScript({
        tabId: newTab.id,
        id: "scrapeHtmlOrPdf",
        args: { url },
        script: "scrapeHtmlOrPdf.js",
      });

      console.log("result from script", { html, pdf, error });
      if (error) {
        console.log("error", error);
      }

      if (html) {
        console.log("Fetching metadata for html from new tab");
        const metadata = await textToMetadata(html);

        console.log("Saving metadata: ", metadata);
        await saveMetadata(ipfs, metadata);
        console.log("Saved metadata");

        const { url_for_pdf, title } = metadata;
        if (url_for_pdf) {
          console.log("Directly fetching pdf for: ", title);
          const { pdf2, error2 } = await fetchHtmlOrPdf(url_for_pdf, true);

          if (error2) {
            console.log("error2", error2);
            if (pdf2) {
              const res = await savePdf(ipfs, title, pdf2);
              displayPopupMessage(
                res ? "Saved PDF to IPFS" : "Failed to save PDF to IPFS"
              );
            } else {
              console.log("Creating new tab to fetch pdf");
              const newTab2 = await createNewTab(url, true);

              console.log("execute script in new tab");
              const { pdf3, error3 } = await executeScript({
                tabId: newTab2.id,
                id: "scrapeHtmlOrPdf",
                args: { url, pdfOnly: true },
                script: "scrapeHtmlOrPdf.js",
              });
            }
          } else {
            //fetch from scihub
          }
        } else if (pdf) {
        }
      } else {
        //handle pdf in new tab case
      }
    }
  },

  //TODO this should just handle saving metadata and returning url_for_pdf
  [MESSAGE_TYPES.HTML]: async ({ ipfs, message }) => {
    const metadata = await textToMetadata(message.html);
    await saveMetadata(ipfs, metadata);
    console.log("metadata", metadata);

    const { url_for_pdf, title } = metadata;
    if (url_for_pdf) {
      console.log("fetching pdf for: ", title);

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

  //TODO should merge both pdf message types and use title defined as flag
  [MESSAGE_TYPES.PDF_WITH_SAVED_METADATA]: async ({
    ipfs,
    message,
    sender,
  }) => {
    const pdf = await pdfObjectUrlToBlob(message.pdf);

    const { title } = await storage.get(sender.tab.id);

    const res = await savePdf(ipfs, title, pdf);
    displayPopupMessage(
      res ? "Saved PDF to IPFS" : "Failed to save PDF to IPFS"
    );
  },

  [MESSAGE_TYPES.PDF_WITHOUT_SAVED_METADATA]: async ({ ipfs, message }) => {
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

  [MESSAGE_TYPES.DETAILS]: async ({ sender, sendResponse }) => {
    const details = await storage.get(sender.tab.id);
    sendResponse(details);
  },

  [MESSAGE_TYPES.ERROR]: async ({ message, sender }) => {
    console.log(
      "Failed to scrape paper from tabId " +
        sender.tab.id +
        " due to the following error:"
    );
    console.log(message.error);
  },
};

export default messageHandlers;
