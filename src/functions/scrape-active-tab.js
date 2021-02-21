import extractDoi from "./metadata/extract-doi";
import extractTextFromPdf from "./pdf/extract-text-from-pdf";
import fetchTabHtml from "./fetch/fetch-tab-html";
import fetchTabPdf from "./fetch/fetch-tab-pdf";
import getActiveTab from "./tabs/get-active-tab";
import isHtmlDisplayingPdf from "./utils/is-html-displaying-pdf";
import log from "./utils/log";
import fetchMetadata from "./fetch/fetch-metadata";
import saveMetadata from "./metadata/save-metadata";
import fetchPdf from "./fetch/fetch-pdf";
import savePdf from "./pdf/save-pdf";
import logTable from "./utils/logTable";
import attempt from "./utils/attempt";

export default async function scrapeActiveTab(ipfs) {
  const activeTab = await getActiveTab();
  const html = await fetchTabHtml(activeTab.id);

  let pdf, doi;
  if (isHtmlDisplayingPdf(html)) {
    log("Analyzing pdf in active tab.");
    pdf = attempt(
      () => fetchTabPdf(activeTab),
      "Failed to fetch pdf from active tab."
    );
    const text = await extractTextFromPdf(pdf);
    doi = extractDoi(text);
  } else {
    log("Analyzing active tab html");
    doi = extractDoi(html);
  }

  if (!doi) {
    log("DOI number not found. Failed to scrape paper.");
  } else {
    log("Fetching metadata for DOI: " + doi);
    const metadata = attempt(
      () => fetchMetadata(doi),
      "Failed to fetch metadata"
    );
    logTable(metadata, "Unpaywall metadata");
    await saveMetadata(ipfs, metadata);

    if (!pdf) {
      pdf = await fetchPdf(doi, metadata && metadata.url_for_pdf);
    }
    if (pdf) {
      await savePdf(ipfs, metadata.title, pdf);
    }
  }
}
