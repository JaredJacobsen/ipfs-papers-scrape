import displayPopupMessage from "../display-popup-message";
import log from "../utils/log";
import extractDoi from "./extract-doi";
import fetchMetadata from "./fetch-metadata";

export default async function textToMetadata(text) {
  const doi = extractDoi(text);
  if (!doi) throw new Error("Cannot find paper DOI number");

  log("Fetching metadata...");
  const metadata = await fetchMetadata(doi);

  displayPopupMessage(`Title: ${metadata.title}\nDOI: ${doi}`);

  return metadata;
}
