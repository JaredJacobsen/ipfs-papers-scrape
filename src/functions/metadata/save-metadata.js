import download from "../utils/download";
import displayPopupMessage from "../utils/display-popup-message";
import getOptions from "../utils/getOptions";
import isIpfsReachable from "../utils/is-ipfs-unreachable";
import titleToFilename from "./title-to-filename";

//TODO what should this return? What to the callers need to know failed?
//TODO what if metadata for the paper already exists?
export default async function saveMetadata(ipfs, metadata) {
  const {
    saveMetadata,
    saveToIpfs,
    ipfsAppDataDirectory,
    ipfsUrl,
    saveToDevice,
    deviceAppDataDirectory,
  } = await getOptions();

  if (!saveMetadata) {
    return false;
  }

  const filename = "papers/" + titleToFilename(metadata.title);
  const data = JSON.stringify(metadata);

  if (saveToIpfs) {
    try {
      //TODO is it even necessary to check if reachable here? Saving when not reachable should just throw an error
      const reachable = await isIpfsReachable(ipfs);
      if (!reachable) {
        throw "IPFS unreachable at " + ipfsUrl;
      }

      await ipfs.files.write(ipfsAppDataDirectory + filename, data, {
        create: true,
        parents: true,
      });

      displayPopupMessage("Saved metadata to IPFS");

      return true;
    } catch (error) {
      console.log("Failed to save paper metadata to IPFS");
    }
  }

  if (saveToDevice) {
    try {
      await download(deviceAppDataDirectory + filename, data);
    } catch (error) {
      console.log("Failed to save paper to device.");
    }
  }
  return false;
}
