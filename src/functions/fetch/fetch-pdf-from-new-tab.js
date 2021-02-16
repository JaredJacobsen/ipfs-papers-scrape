import createNewTab from "../tabs/create-new-tab";
import fetchTabPdf from "./fetch-tab-pdf";
import origin from "../utils/origin";

export default async function fetchPdfFromNewTab(url, fromOrigin = false) {
  const tabUrl = fromOrigin ? origin(url) : url;
  console.log(`Fetching pdf from ${url} in new tab at ${tabUrl}`);

  const newTab = await createNewTab(tabUrl, false);

  const pdf = await fetchTabPdf(newTab.id, fromOrigin ? { url } : {});
  chrome.tabs.remove(newTab.id);
  return pdf;
}
