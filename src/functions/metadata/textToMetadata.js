import displayPopupMessage from "../utils/display-popup-message";
import extractDoi from "./extract-doi";
import fetchMetadata from "./fetch-metadata";

export default async function textToMetadata(text) {
  const doi = extractDoi(text);
  if (!doi) throw "Cannot find paper DOI number";

  console.log("Fetching metadata...");
  const metadata = await fetchMetadata(doi);

  displayPopupMessage(`Title: ${metadata.title}\nDOI: ${doi}`);

  return metadata;
}
