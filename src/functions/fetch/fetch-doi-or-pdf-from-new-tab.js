import extractDoi from "../metadata/extract-doi";
import extractTextFromPdf from "../pdf/extract-text-from-pdf";
import createNewTab from "../tabs/create-new-tab";
import origin from "../utils/origin";
import fetchTabHtmlOrPdf from "./fetch-tab-html-or-pdf";

export default async function fetchDoiOrPdfFromNewTab(url, fromOrigin = false) {
  const tabUrl = fromOrigin ? origin(url) : url;
  log(`Fetching doi or pdf from ${url} in new tab at ${tabUrl}`);
  const newTab = await createNewTab(tabUrl, false);

  log("Executing script in new tab");
  const { pdf, html } = await fetchTabHtmlOrPdf(
    newTab.id,
    fromOrigin ? { url } : {}
  );

  chrome.tabs.remove(newTab.id);

  if (html) {
    return { doi: extractDoi(html) };
  }
  if (pdf) {
    const text = await extractTextFromPdf(pdf);
    return { doi: extractDoi(text), pdf };
  }
  return {};
}
