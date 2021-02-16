import fetchPdfDirectly from "./fetch-pdf-directly";
import fetchPdfFromNewTab from "./fetch-pdf-from-new-tab";

export default async function fetchPdfFromUrl(url) {
  let pdf = await fetchPdfDirectly(url);

  if (!pdf) {
    pdf = await fetchPdfFromNewTab(url, true);
  }

  if (!pdf) {
    pdf = await fetchPdfFromNewTab(url, false);
  }

  return pdf;
}
