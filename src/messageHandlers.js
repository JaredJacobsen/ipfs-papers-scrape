import displayPopupMessage from "./functions/display-popup-message";
import extractTextFromPdf from "./functions/pdf/extract-text-from-pdf";
import savePdf from "./functions/pdf/save-pdf";
import urlToBlob from "./functions/utils/url-to-blob";
import textToMetadata from "./functions/metadata/textToMetadata";
import saveMetadata from "./functions/metadata/save-metadata";
import executeScript from "./functions/execute-script";
import getActiveTab from "./functions/utils/get-active-tab";
import sameOrigin from "./functions/utils/same-origin";
import { MESSAGE_TYPES } from "./constants";
import storage from "./storage";
import scrapeActiveTab from "./functions/scrape-active-tab";
import scrapeNewTab from "./functions/scrape-new-tab";

const messageHandlers = {
  [MESSAGE_TYPES.SCRAPE]: async ({ ipfs, message }) =>
    message.url ? scrapeActiveTab(ipfs) : scrapeNewTab(ipfs, message.url),

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
    const pdf = await urlToBlob(message.pdf);

    const { title } = await storage.get(sender.tab.id);

    const res = await savePdf(ipfs, title, pdf);
    displayPopupMessage(
      res ? "Saved PDF to IPFS" : "Failed to save PDF to IPFS"
    );
  },

  [MESSAGE_TYPES.PDF_WITHOUT_SAVED_METADATA]: async ({ ipfs, message }) => {
    const pdf = await urlToBlob(message.pdf);

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
