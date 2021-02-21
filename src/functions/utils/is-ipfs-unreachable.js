export default async function isIpfsReachable(ipfs) {
  let reachable = true;
  try {
    await ipfs.id(); //Checks if IPFS is alive. Throws if not
  } catch (error) {
    log("ipfs unreachable");
    reachable = false;
  }
  return reachable;
}
