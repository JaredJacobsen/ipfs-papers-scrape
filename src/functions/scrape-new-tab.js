import fetchDoiOrPdfDirectly from "./fetch/fetch-doi-or-pdf-directly";
import fetchDoiOrPdfFromNewTab from "./fetch/fetch-doi-or-pdf-from-new-tab";
import fetchMetadata from "./fetch/fetch-metadata";
import saveMetadata from "./metadata/save-metadata";
import fetchPdf from "./fetch/fetch-pdf";
import savePdf from "./pdf/save-pdf";

export default async function scrapeNewTab(ipfs, url) {
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
