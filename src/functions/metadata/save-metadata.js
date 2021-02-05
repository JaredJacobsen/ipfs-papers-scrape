import { PAPERS_DIR } from "../../constants";
import getMfsFilenameForPaper from "./get-mfs-filename-for-paper";

export default async function saveMetadata(metadata, ipfs) {
  console.log("inside metadata");
  const mfsFilename = getMfsFilenameForPaper(metadata.title);
  try {
    await ipfs.files.write(PAPERS_DIR + mfsFilename, JSON.stringify(metadata), {
      create: "true",
      parents: "true",
    });
  } catch (error) {
    console.log("Failed to save paper metadata");
    throw error;
  }
  return mfsFilename;
}
