import fetchPdfFromUrl from "./fetch-pdf-from-url";
import fetchPdfFromScihub from "./fetch-pdf-from-scihub";
import log from "../utils/log";
import getOptions from "../utils/getOptions";

export default async function fetchPdf(doi, url) {
  if (!url && !doi) {
    return null;
  }

  const {
    // fetchIpfs,
    fetchScihub,
  } = await getOptions();

  if (url) {
    log("pdf url: " + url);
    return fetchPdfFromUrl(url);
  } else if (fetchScihub) {
    log("Fetching pdf from Scihub using doi");
    return fetchPdfFromScihub(doi);
  } else {
    log(
      "Pdf cannot be fetched without open access download url unless fetchScihub is set to true in settings."
    );
    return null;
  }
}
