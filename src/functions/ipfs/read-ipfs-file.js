import all from "it-all";
import toBuffer from "it-to-buffer";

export default async function readIpfsFile(ipfs, path) {
  const chunks = await all(ipfs.files.read(path));
  const buffer = await toBuffer(chunks.map((c) => Buffer.from(c)));
  return JSON.parse(buffer.toString());
}
