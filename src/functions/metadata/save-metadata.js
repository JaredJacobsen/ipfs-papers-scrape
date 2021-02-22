import download from "../utils/download";
import getOptions from "../utils/getOptions";
import titleToFilename from "./title-to-filename";
import log from "../utils/log";

export default async function saveMetadata(ipfs, metadata) {
  const {
    saveMetadata,
    saveToIpfs,
    deviceAppDataDirectory,
    ipfsAppDataDirectory,
    saveToDevice,
  } = await getOptions();

  if (!saveMetadata) {
    return false;
  }

  const filename = "papers/" + titleToFilename(metadata.title);
  const data = JSON.stringify(metadata);

  if (saveToIpfs) {
    try {
      await ipfs.files.write(ipfsAppDataDirectory + filename, data, {
        create: true,
        parents: true,
      });
      log("Saved metadata to IPFS.");
    } catch (error) {
      log("Failed to save metadata to IPFS.");
    }
  }

  if (saveToDevice) {
    try {
      await download(deviceAppDataDirectory + filename, data);
    } catch (error) {
      log("Failed to save paper to device.");
    }
  }
  return false;
}
