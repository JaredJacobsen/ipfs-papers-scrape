import extractDoi from "../metadata/extract-doi";
import extractTextFromPdf from "../pdf/extract-text-from-pdf";
import fetchHtmlOrPdf from "./fetch-html-or-pdf";

export default async function fetchDoiOrPdfDirectly(url) {
  console.log("Fetching doi or pdf directly");
  const { html, pdf } = await fetchHtmlOrPdf(url);

  if (html) {
    return { doi: extractDoi(html) };
  }
  if (pdf) {
    const text = await extractTextFromPdf(pdf);
    return { doi: extractDoi(text), pdf };
  }
  return {};
}
