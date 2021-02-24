import titleToFilename from "../metadata/title-to-filename";
import getOptions from "../utils/getOptions";
import download from "../utils/download";
import log from "../utils/log";
import { PDF_FILES_DIRECTORY } from "../../constants";

export default async function savePdf(ipfs, title, pdf) {
  const {
    saveToIpfs,
    deviceAppDataDirectory,
    ipfsAppDataDirectory,
    saveToDevice,
  } = await getOptions();

  const filename = titleToFilename(title) + ".pdf";

  if (saveToIpfs) {
    try {
      //Add pdf to IPFS
      const cid = (await ipfs.add(pdf)).cid.string;

      //Copy pdf to MFS, but first create pdf dir if it doesn't exist. {parents: true} doesn't work with cp so the parent dir must be created first
      const pdfDir = ipfsAppDataDirectory + PDF_FILES_DIRECTORY;
      ipfs.files.mkdir(pdfDir, { parents: true });
      await ipfs.files.cp("/ipfs/" + cid, pdfDir + filename);

      log("Saved pdf to ipfs, cid: ", cid);
    } catch (error) {
      log("Failed to save pdf to ipfs.");
    }
  }

  if (saveToDevice) {
    try {
      await download(
        deviceAppDataDirectory + PDF_FILES_DIRECTORY + filename,
        pdf
      );
    } catch (error) {
      log("Failed to save paper to device.");
    }
  }
}
