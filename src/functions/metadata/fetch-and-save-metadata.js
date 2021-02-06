import displayPopupMessage from "../utils/display-popup-message";
import extractDoi from "./extract-doi";
import fetchMetadata from "./fetch-metadata";
import getMfsFilenameForPaper from "./get-mfs-filename-for-paper";
import saveMetadata from "./save-metadata";

export default async function fetchAndSaveMetadata(pageText, ipfs) {
  const doi = extractDoi(pageText);
  if (!doi) throw "Cannot find paper DOI number";

  console.log("Fetching metadata...");
  const metadata = await fetchMetadata(doi);

  displayPopupMessage(`Title: ${metadata.title}\nDOI: ${doi}`);

  console.log("Saving metadata: ", metadata);
  const mfsFilename = getMfsFilenameForPaper(metadata.title);
  const saved = await saveMetadata(mfsFilename, metadata, ipfs);

  if (saved) {
    displayPopupMessage("Saved metadata to IPFS");
  }

  // saveTo === SAVE_OPTIONS.ipfs || saveTo === SAVE_OPTIONS.BOTH
  //   ? await saveMetadata(metadata)
  //   : null

  return [mfsFilename, metadata];
}
