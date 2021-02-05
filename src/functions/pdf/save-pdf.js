import { PAPERS_DIR, PDF_FILES_DIR } from "../../constants";
import displayPopupMessage from "../utils/display-popup-message";

export default async function savePdf(mfsFilename, metadata, data, ipfs) {
  const cid = (await ipfs.add(data)).cid.string;
  console.log("cid: ", cid);

  //Add pdf to MFS
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
  displayPopupMessage("Saved PDF to IPFS");
}
