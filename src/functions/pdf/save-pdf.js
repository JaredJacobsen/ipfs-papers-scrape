import { PAPERS_DIR, PDF_FILES_DIR } from "../../constants";
import displayPopupMessage from "../utils/display-popup-message";
import isIpfsReachable from "../utils/is-ipfs-unreachable";

export default async function savePdf(mfsFilename, metadata, data, ipfs) {
  try {
    const reachable = await isIpfsReachable();
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
      const res1 = await ipfs.files.cp("/ipfs/" + cid, mfsPdfPath, {
        create: "true",
        parents: "true",
      });
      if (!res1) {
        console.log("Failed to copy PDF to MFS");
        return false;
      }

      //Update metadata.
      const newMetadata = {
        ...metadata,
        pdf: cid,
        path_to_pdf: mfsPdfPath,
      };
      const res2 = await ipfs.files.write(
        PAPERS_DIR + mfsFilename,
        JSON.stringify(newMetadata),
        {
          create: "true",
          parents: "true",
        }
      );
      if (!res2) {
        console.log("Failed to update metadata with path_to_pdf");
        return false;
      }
      console.log("Saved PDF to IPFS");
      return true;
    }
  } catch (error) {
    console.log("Failed to save pdf");
    throw error;
  }
  return false;
}
