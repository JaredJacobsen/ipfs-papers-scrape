import fetchPdfFromUrl from "./fetch-pdf-from-url";
import fetchPdfFromScihub from "./fetchPdfFromScihub";

export default async function fetchPdf(url_for_pdf) {
  return url_for_pdf
    ? fetchPdfFromUrl(url_for_pdf)
    : fetchPdfFromScihub(url_for_pdf);
}
