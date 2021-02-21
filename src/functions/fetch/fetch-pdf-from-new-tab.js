import createNewTab from "../tabs/create-new-tab";
import fetchTabPdf from "./fetch-tab-pdf";
import origin from "../utils/origin";

export default async function fetchPdfFromNewTab(url, fromOrigin = false) {
  let newTab;
  try {
    const tabUrl = fromOrigin ? origin(url) : url;
    newTab = await createNewTab(tabUrl, false);

    return await fetchTabPdf(newTab.id, fromOrigin ? { url } : {});
  } finally {
    newTab && chrome.tabs.remove(newTab.id);
  }
}
