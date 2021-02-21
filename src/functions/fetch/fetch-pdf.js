import fetchPdfFromUrl from "./fetch-pdf-from-url";
import fetchPdfFromScihub from "./fetch-pdf-from-scihub";
import log from "../utils/log";

export default async function fetchPdf(doi, url) {
  if (url) {
    log("pdf url: " + url);
    return fetchPdfFromUrl(url);
  }
  log("Fetching pdf from Scihub using doi");
  return fetchPdfFromScihub(doi);
}
