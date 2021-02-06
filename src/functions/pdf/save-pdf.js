import { PAPERS_DIR, PDF_FILES_DIR } from "../../constants";
import displayPopupMessage from "../utils/display-popup-message";
import isIpfsReachable from "../utils/is-ipfs-unreachable";

//Returns saved: boolean
export default async function savePdf(mfsFilename, metadata, data, ipfs) {
  try {
    const reachable = await isIpfsReachable(ipfs);
    if (!reachable) {
      console.log("IPFS unreachable at http://localhost:5001");
      displayPopupMessage(
        `Sorry, pdf was not saved because IPFS is unreachable. Make sure that IPFS is running at http://localhost:5001`
      );
    } else {
      //TODO all three actions below need to be a single transaction

      //Add pdf to IPFS
      const cid = (await ipfs.add(data)).cid.string;
      console.log("cid: ", cid);
      if (!cid) {
        console.log("Failed to add PDF to IPFS");
        return false;
      }

      //Copy pdf to MFS
      const mfsPdfPath = PDF_FILES_DIR + mfsFilename + ".pdf";
      await ipfs.files.cp("/ipfs/" + cid, mfsPdfPath, {
        create: "true",
        parents: "true",
      });

      //Update metadata.
      const newMetadata = {
        ...metadata,
        pdf: cid,
        path_to_pdf: mfsPdfPath,
      };
      await ipfs.files.write(
        PAPERS_DIR + mfsFilename,
        JSON.stringify(newMetadata),
        {
          create: "true",
          parents: "true",
        }
      );

      console.log("Saved PDF to IPFS");
      return true;
    }
  } catch (error) {
    console.log("Failed to save pdf");
    throw error;
  }
  return false;
}
