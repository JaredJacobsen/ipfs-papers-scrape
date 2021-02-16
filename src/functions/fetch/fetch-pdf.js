import fetchPdfFromUrl from "./fetch-pdf-from-url";
import fetchPdfFromScihub from "../pdf/fetchPdfFromScihub";

export default async function fetchPdf(doi, url_for_pdf) {
  return url_for_pdf ? fetchPdfFromUrl(url_for_pdf) : fetchPdfFromScihub(doi);
}
