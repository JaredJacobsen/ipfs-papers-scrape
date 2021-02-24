import { PAPER_METADATA_DIRECTORY } from "../../constants";
import getOptions from "../utils/getOptions";

export default async function addOrUpdateIpfsPaper(ipfs, filename, obj) {
  const { ipfsAppDataDirectory } = await getOptions();
  const papersDir = ipfsAppDataDirectory + PAPER_METADATA_DIRECTORY;

  try {
    await ipfs.files.write(papersDir + filename, JSON.stringify(obj), {
      create: "true",
      parents: "true",
    });
  } catch (error) {
    console.log("Failed to add or update paper");
    console.log(error);
  }
}
