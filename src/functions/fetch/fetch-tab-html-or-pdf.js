import executeScript from "../utils/execute-script";

export default async function fetchTabHtmlOrPdf(tabId, args) {
  console.log("Fetching html or pdf from tab");
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
    console.log(error);
    return {};
  }
}
