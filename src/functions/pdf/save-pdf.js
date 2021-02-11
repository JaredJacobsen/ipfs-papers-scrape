import { appDataDirectory, ipfsUrl } from "../../../config";
import titleToFilename from "../metadata/title-to-filename";
import displayPopupMessage from "../display-popup-message";
import isIpfsReachable from "../utils/is-ipfs-unreachable";

//Returns saved: boolean
export default async function savePdf(ipfs, title, pdf) {
  try {
    const reachable = await isIpfsReachable(ipfs);
    if (!reachable) {
      console.log("IPFS unreachable at " + ipfsUrl);
      displayPopupMessage(
        "Sorry, pdf was not saved because IPFS is unreachable. Make sure that IPFS is running at " +
          ipfsUrl
      );
    } else {
      //TODO all three actions below need to be a single transaction

      //Add pdf to IPFS
      const cid = (await ipfs.add(pdf)).cid.string;

      //Copy pdf to MFS, but first create pdf dir if it doesn't exist. {parents: true} doesn't work with cp so the parent dir must be created first
      const pdfDir = appDataDirectory + "pdf_files/";
      ipfs.files.mkdir(pdfDir, { parents: true });
      const mfsPdfPath = pdfDir + titleToFilename(title) + ".pdf";
      await ipfs.files.cp("/ipfs/" + cid, mfsPdfPath);

      console.log("Saved PDF to IPFS: ", cid);

      return true;
    }
  } catch (error) {
    console.log("Failed to save pdf");
    throw error;
  }
  return false;
}
