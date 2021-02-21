import titleToFilename from "../metadata/title-to-filename";
import isIpfsReachable from "../utils/is-ipfs-unreachable";
import getOptions from "../utils/getOptions";
import download from "../utils/download";
import log from "../utils/log";

export default async function savePdf(ipfs, title, pdf) {
  const {
    saveToIpfs,
    ipfsAppDataDirectory,
    ipfsUrl,
    saveToDevice,
  } = await getOptions();

  const filename = titleToFilename(title) + ".pdf";

  if (saveToIpfs) {
    try {
      const reachable = await isIpfsReachable(ipfs);
      if (!reachable) {
        throw "IPFS unreachable at " + ipfsUrl;
      } else {
        //TODO all three actions below need to be a single transaction

        //Add pdf to IPFS
        const cid = (await ipfs.add(pdf)).cid.string;

        //Copy pdf to MFS, but first create pdf dir if it doesn't exist. {parents: true} doesn't work with cp so the parent dir must be created first
        const pdfDir = ipfsAppDataDirectory + "pdf_files/";
        ipfs.files.mkdir(pdfDir, { parents: true });
        await ipfs.files.cp("/ipfs/" + cid, pdfDir + filename);

        log("Saved pdf to ipfs, cid: ", cid);
      }
    } catch (error) {
      log("Failed to save pdf to ipfs.");
    }
  }

  if (saveToDevice) {
    try {
      await download("pdf_files/" + filename, pdf);
    } catch (error) {
      log("Failed to save paper to device.");
    }
  }
}
