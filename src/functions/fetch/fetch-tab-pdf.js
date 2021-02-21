import executeScript from "../utils/execute-script";

export default async function fetchTabPdf(tabId, args) {
  const { objectUrl } = await executeScript({
    tabId,
    id: "scrapeHtmlOrPdf",
    script: "scrapeHtmlOrPdf.js",
    args,
  });

  const response = await fetch(objectUrl);
  if (response.ok) {
    return response.blob();
  }
  throw "Bad response: " + JSON.stringify(response);
}
