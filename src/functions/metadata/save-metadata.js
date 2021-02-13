import displayPopupMessage from "../display-popup-message";
import getOptions from "../getOptions";
import isIpfsReachable from "../utils/is-ipfs-unreachable";
import titleToFilename from "./title-to-filename";

//TODO should return boolean?
//TODO what if metadata for the paper already exists?
export default async function saveMetadata(ipfs, metadata) {
  console.log("Saving metadata: ", metadata);

  const { appDataDirectory, ipfsUrl } = await getOptions();

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
        appDataDirectory + "papers/" + titleToFilename(metadata.title),
        JSON.stringify(metadata),
        {
          create: true,
          parents: true,
        }
      );

      displayPopupMessage("Saved metadata to IPFS");

      return true;
    }
  } catch (error) {
    console.log("Failed to save paper metadata");
    throw error;
  }
  return false;
}
