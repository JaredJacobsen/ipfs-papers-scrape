import executeScript from "../utils/execute-script";

export default async function fetchTabPdf(tabId, args) {
  try {
    const { objectUrl } = await executeScript({
      tabId,
      id: "scrapeHtmlOrPdf",
      script: "scrapeHtmlOrPdf.js",
      args,
    });

    const response = await fetch(objectUrl);
    return await response.blob();
  } catch (error) {
    console.log(error);
  }
}
