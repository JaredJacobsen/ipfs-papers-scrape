import { appDataDirectory, ipfsUrl } from "../../../config";
import displayPopupMessage from "../utils/display-popup-message";
import isIpfsReachable from "../utils/is-ipfs-unreachable";

//TODO should return boolean?
export default async function saveMetadata(mfsFilename, metadata, ipfs) {
  try {
    const reachable = await isIpfsReachable(ipfs);
    if (!reachable) {
      console.log("IPFS unreachable at " + ipfsUrl);
      displayPopupMessage(
        "Sorry, metadata was not saved because IPFS is unreachable. Make sure that IPFS is running at " +
          ipfsUrl
      );
    } else {
      await ipfs.files.write(
        appDataDirectory + "papers/" + mfsFilename,
        JSON.stringify(metadata),
        {
          create: "true",
          parents: "true",
        }
      );
      return true;
    }
  } catch (error) {
    console.log("Failed to save paper metadata");
    throw error;
  }
  return false;
}
