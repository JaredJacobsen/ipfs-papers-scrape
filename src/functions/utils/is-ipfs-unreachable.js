// import poll from "./poll";

export default async function isIpfsReachable(ipfs) {
  let reachable = true;
  try {
    await ipfs.id(); //Checks if IPFS is alive. Throws if not
    // await poll(async () => await ipfs.id(), 1000, 250);
  } catch (error) {
    console.log("ipfs unreachable");
    reachable = false;
  }
  return reachable;
}
