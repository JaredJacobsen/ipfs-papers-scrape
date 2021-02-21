import fetchDoiOrPdfDirectly from "./fetch/fetch-doi-or-pdf-directly";
import fetchDoiOrPdfFromNewTab from "./fetch/fetch-doi-or-pdf-from-new-tab";
import fetchMetadata from "./fetch/fetch-metadata";
import saveMetadata from "./metadata/save-metadata";
import fetchPdf from "./fetch/fetch-pdf";
import savePdf from "./pdf/save-pdf";
import log from "./utils/log";

export default async function scrapeUrl(ipfs, url) {
  let { doi, pdf } = fetchDoiOrPdfDirectly(url);

  if (!doi) {
    const obj = await fetchDoiOrPdfFromNewTab(url);
    doi = obj.doi;
    pdf = pdf || obj.pdf;
  }

  if (!doi) {
    const obj = await fetchDoiOrPdfFromNewTab(url, true);
    doi = obj.doi;
    pdf = pdf || obj.pdf;
  }

  if (doi) {
    log("Fetching metadata");
    const metadata = await fetchMetadata(doi);

    if (metadata) {
      log("Saving metadata: ", metadata);
      await saveMetadata(ipfs, metadata);
      log("Saved metadata");

      pdf = pdf || (await fetchPdf(doi, metadata.url_for_pdf));

      log("Saving pdf");
      pdf && (await savePdf(ipfs, metadata.title, pdf));
      log("Saved pdf");
    } else {
      //TODO should still fetch pdf with doi even if metadata not found.
      log("metadata not found");
    }
  } else {
    log("doi not found");
  }
}
