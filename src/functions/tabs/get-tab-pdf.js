import executeScript from "../execute-script";

export default async function getTabPdf(tabId, args) {
  const { objectUrl } = await executeScript({
    tabId,
    id: "scrapeHtmlOrPdf",
    script: "scrapeHtmlOrPdf.js",
    args,
  });

  const response = await fetch(objectUrl);
  const pdf = await response.blob();
}
