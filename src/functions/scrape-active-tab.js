import extractDoi from "./metadata/extract-doi";
import fetchMetadata from "./fetch/fetch-metadata";
import saveMetadata from "./metadata/save-metadata";
import extractTextFromPdf from "./pdf/extract-text-from-pdf";
import fetchPdf from "./fetch/fetch-pdf";
import savePdf from "./pdf/save-pdf";
import fetchTabHtml from "./fetch/fetch-tab-html";
import fetchTabPdf from "./fetch/fetch-tab-pdf";
import getActiveTab from "./tabs/get-active-tab";
import isHtmlDisplayingPdf from "./utils/is-html-displaying-pdf";

export default async function scrapeActiveTab(ipfs) {
  const activeTab = await getActiveTab();

  console.log("Fetching html in active tab ", activeTab.id);
  const html = await fetchTabHtml(activeTab.id);
  console.log("html", html);

  let pdf, doi;
  if (isHtmlDisplayingPdf(html)) {
    pdf = await fetchTabPdf(activeTab.id);
    if (pdf) {
      const text = await extractTextFromPdf(pdf);
      doi = extractDoi(text);
    }
  } else {
    doi = extractDoi(html);
  }

  if (doi) {
    console.log("Fetching metadata");
    const metadata = await fetchMetadata(doi);

    if (metadata) {
      console.log("Saving metadata: ", metadata);
      await saveMetadata(ipfs, metadata);
      console.log("Saved metadata");

      pdf = pdf || (await fetchPdf(doi, metadata.url_for_pdf));

      console.log("Saving pdf");
      pdf && (await savePdf(ipfs, metadata.title, pdf));
      console.log("Saved pdf");
    } else {
      //TODO should still fetch pdf with doi even if metadata not found.
      console.log("metadata not found");
    }
  } else {
    console.log("doi not found");
  }
}
