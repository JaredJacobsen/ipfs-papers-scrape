import executeScript from "../utils/execute-script";
import { default as fetch } from "../utils/wrappedFetch";

export default async function fetchTabPdf(tabId, args) {
  const { objectUrl } = await executeScript({
    tabId,
    id: "scrapeHtmlOrPdf",
    script: "scrapeHtmlOrPdf.js",
    args,
  });

  const response = await fetch(objectUrl);
  return response.blob();
}
