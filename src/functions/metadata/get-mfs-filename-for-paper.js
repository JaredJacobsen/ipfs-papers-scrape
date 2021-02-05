import { v4 as uuidv4 } from "uuid";

//This function must match that in https://github.com/JaredJacobsen/ipfs-papers-react-native
export default function getMfsFilenameForPaper(title) {
  const base = title
    .trim()
    .replace(/\s+/g, "-")
    .toLowerCase()
    .replace(/[^\w-]/g, "");

  return base + "-" + uuidv4(); //TODO remove uuid
}
