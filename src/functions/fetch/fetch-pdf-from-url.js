import log from "../utils/log";
import fetchPdfFromServiceWorker from "./fetch-pdf-from-service-worker";
import fetchPdfFromNewTab from "./fetch-pdf-from-new-tab";

export default async function fetchPdfFromUrl(url) {
  log("Trying to fetch pdf url from service worker");
  try {
    return await fetchPdfFromServiceWorker(url);
  } catch (error) {
    log("Fetch failed");
    log(error);
  }

  log("Trying to fetch pdf url from new tab at origin of pdf url");
  try {
    return await fetchPdfFromNewTab(url, true);
  } catch (error) {
    log("Fetch failed");
    log(error);
  }

  log("Trying to fetch pdf url from new tab at pdf url");
  try {
    return await fetchPdfFromNewTab(url, false);
  } catch (error) {
    log("Fetch failed");
    log(error);
  }
}
