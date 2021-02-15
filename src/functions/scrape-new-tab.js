import extractDoi from "./metadata/extract-doi";
import fetchMetadata from "./metadata/fetch-metadata";
import saveMetadata from "./metadata/save-metadata";
import extractTextFromPdf from "./pdf/extract-text-from-pdf";
import fetchPdf from "./pdf/fetch-pdf";
import savePdf from "./pdf/save-pdf";
import getTabHtml from "./tabs/get-tab-html";
import getTabPdf from "./tabs/get-tab-pdf";
import getActiveTab from "./utils/get-active-tab";
import isHtmlDisplayingPdf from "./utils/is-html-displaying-pdf";

export default async function scrapeNewTab(ipfs) {
  const activeTab = await getActiveTab();

  console.log("Fetching html in active tab");
  const html = await getTabHtml(activeTab.id);

  let pdf, doi;
  if (isHtmlDisplayingPdf(html)) {
    pdf = await getTabPdf(activeTab.id);
    const text = await extractTextFromPdf(pdf);
    doi = extractDoi(text);
  } else {
    doi = extractDoi(html);
  }

  console.log("Fetching metadata");
  const metadata = await fetchMetadata(doi);

  console.log("Saving metadata: ", metadata);
  await saveMetadata(ipfs, metadata);
  console.log("Saved metadata");

  pdf = pdf || (await fetchPdf(metadata.url_for_pdf));

  console.log("Saving pdf");
  pdf && (await savePdf(ipfs, metadata.title, pdf));
  console.log("Saved pdf");
}
