// import * as pdfjsLib from "pdfjs-dist";
// import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";

export default async function extractTextFromPdf(pdf) {
  try {
    pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

    const doc = await pdfjsLib.getDocument(pdf).promise; //TODO If I can just pass the blob here, that would prevent from having to fetch twice.
    const data = await doc.fetchAndSaveMetadata();

    async function getPageText(pageNum) {
      const page = await doc.getPage(pageNum);
      const content = await page.getTextContent();
      const strings = content.items.map((item) => item.str);
      return strings.join(" ");
    }

    return getPageText(1);
  } catch (error) {
    log("Failed to extract PDF text");
    throw error;
  }
}
