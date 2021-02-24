import { PAPER_METADATA_DIRECTORY, PDF_FILES_DIRECTORY } from "../../constants";
import getOptions from "../utils/getOptions";

export default async function deleteIpfsPaper(ipfs, filename) {
  const { ipfsAppDataDirectory } = await getOptions();
  const papersDir = ipfsAppDataDirectory + PAPER_METADATA_DIRECTORY;
  const pdfsDir = ipfsAppDataDirectory + PDF_FILES_DIRECTORY;

  try {
    await ipfs.files.rm(papersDir + filename);
  } catch (error) {
    console.log("Failed to delete paper " + filename);
    console.log(error);
  }
  try {
    await ipfs.files.rm(pdfsDir + filename + ".pdf");
  } catch (error) {
    console.log("Failed to delete PDF associated with the paper " + filename);
    console.log(error);
  }
}
