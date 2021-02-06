import { PAPERS_DIR } from "../../constants";
import displayPopupMessage from "../utils/display-popup-message";
import isIpfsReachable from "../utils/is-ipfs-unreachable";

//TODO should return boolean?
export default async function saveMetadata(mfsFilename, metadata, ipfs) {
  let res = null;
  try {
    const reachable = await isIpfsReachable();
    if (!reachable) {
      console.log("IPFS unreachable at http://localhost:5001");
      displayPopupMessage(
        `Sorry, metadata was not saved because IPFS is unreachable. Make sure that IPFS is running at http://localhost:5001`
      );
    } else {
      res = await ipfs.files.write(
        PAPERS_DIR + mfsFilename,
        JSON.stringify(metadata),
        {
          create: "true",
          parents: "true",
        }
      );
      console.log("res: ", res);
    }
  } catch (error) {
    console.log("Failed to save paper metadata");
    throw error;
  }
  return res;
}
