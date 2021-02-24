import all from "it-all";
import { fromPairs } from "lodash";
import { PAPER_METADATA_DIRECTORY, PDF_FILES_DIRECTORY } from "../../constants";
import getOptions from "../utils/getOptions";
import readIpfsFile from "./read-ipfs-file";

export default async function getIpfsPapers(ipfs, filename) {
  const { ipfsAppDataDirectory } = await getOptions();
  const papersDir = ipfsAppDataDirectory + PAPER_METADATA_DIRECTORY;
  const pdfsDir = ipfsAppDataDirectory + PDF_FILES_DIRECTORY;

  const pdfFiles = await all(ipfs.files.ls(pdfsDir));
  const pdfFilenameToCidMap = fromPairs(
    pdfFiles.map((f) => [f.name.slice(0, -4), f.cid])
  );

  if (filename) {
    try {
      const paper = await readIpfsFile(ipfs, papersDir + filename);
      paper.pdfCid = pdfFilenameToCidMap[filename];
      return paper;
    } catch (error) {
      console.log("Failed to read file: " + filename);
      console.log(error);
      return null;
    }
  }

  try {
    const files = await all(ipfs.files.ls(papersDir));
    return await Promise.all(
      files.map(async (f) => {
        const metadata = await readIpfsFile(ipfs, papersDir + f.name);
        const metadataCid = f.cid;
        const pdfCid = pdfFilenameToCidMap[f.name];
        return { ...metadata, metadataCid, pdfCid };
      })
    );
  } catch (error) {
    console.log("Failed to fetch papers");
    console.log(error);
    return {};
  }
}
