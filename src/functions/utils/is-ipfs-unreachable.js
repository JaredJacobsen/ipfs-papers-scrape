import poll from "./poll";

export default async function isIpfsReachable(ipfs) {
  let reachable = true;
  try {
    await poll(async () => await ipfs.id(), 1000, 250); //Checks if IPFS is alive. Throws if not
  } catch (error) {
    reachable = false;
  }
  return reachable;
}
