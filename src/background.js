// import IPFS from "ipfs";
// import Room from "ipfs-pubsub-room";

// function addPaper(text) {
//   const bkg = chrome.extension.getBackgroundPage();
//   bkg.console.log(text.selectionText);
// }

// chrome.contextMenus.create({
//   id: "addPaper",
//   title: "Add paper to IPFS-Papers",
//   contexts: ["selection"],
// });

// chrome.contextMenus.onClicked.addListener(function (info, tab) {
//   if (info.menuItemId == "addPaper") {
//     console.log(JSON.stringify(info));
//   }
// });

// const ipfsOptions = {
//   // repo: "./ipfs"
// };
// IPFS.create(ipfsOptions).then(async (ipfs) => {
//   const ipfs = await IPFS.create(ipfsOptions);
//   const room = Room(ipfs, "ipfs-papers");

//   room.on("peer joined", (peer) => {
//     console.log("Peer joined the room", peer);
//   });

//   room.on("peer left", (peer) => {
//     console.log("Peer left...", peer);
//   });

//   // now started to listen to room
//   room.on("subscribed", () => {
//     console.log("Now connected!");
//   });
// });
