import executeScript from "../utils/execute-script";
import log from "../utils/log";
import { default as fetch } from "../utils/wrappedFetch";

export default async function fetchTabHtmlOrPdf(tabId, args) {
  log("Fetching html or pdf from tab");
  try {
    const { type, objectUrl } = await executeScript({
      tabId,
      id: "scrapeHtmlOrPdf",
      script: "scrapeHtmlOrPdf.js",
      args,
    });

    const response = await fetch(objectUrl);
    return type === "pdf"
      ? { pdf: await response.blob() }
      : { html: await response.text() };
  } catch (error) {
    log(error);
    return {};
  }
}
