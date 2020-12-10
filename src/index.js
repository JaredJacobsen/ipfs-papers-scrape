// import Tesseract from "tesseract.js";
// import * as pdfjsLib from "pdfjs-dist";
// import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
// import IPFS from "ipfs";

// import OrbitDB from "orbit-db";

import IpfsHttpClient from "ipfs-http-client";
import all from "it-all";
// const { urlSource } = IpfsHttpClient;

const PAPERS_DIR = "/ipfs-papers/papers/";

const log = chrome.extension.getBackgroundPage().console.log;
log("test logging");

async function main() {
  const ipfs = IpfsHttpClient("http://localhost:5001");
  log("ipfs id: ", await ipfs.id());

  // const orbitdb = await OrbitDB.createInstance(ipfs);
  // log("orbitdb id: ", orbitdb.identity);

  // const papersDb = await orbitdb.keyvalue(
  //   // "/orbitdb/zdpuB3dfRa56omR4bBfdKiGfiJGLxvp6nHUELf7Si4txxMLCP/ipfs-papers-papers"
  //   // "/orbitdb/zdpuAx6bt8CmpF5UhpVskV3bknUnp4NMkKtRQqo5kYJrDeZh9/ipfs-papers-paperss"
  //   "/orbitdb/zdpuAqBsaZwqU8V3bjpXM4XqcWagncv6PAk4d9bFaU5urWsPh/ipfs-papers-papersss",
  //   { replicate: "true" }
  // );

  // await Promise.resolve((resolve) => {
  //   db.events.on("replicated", resolve);
  // });

  // await papersDb.load();

  // const t = Date.now();
  // const cid = await papersDb.set(`paper-${t}`, { title: t });
  // log("new paper cid: ", cid);

  // log("all: ", await papersDb.all);
  // log(papersDb.id);

  // const file = await ipfs.add(
  //   urlSource("https://ipfs.io/images/ipfs-logo.svg")
  // );
  // const file = await ipfs.add("yo");
  // log(file);

  // ipfs.files.write("/" + f.name, f, { create: true });
  await ipfs.files.write(PAPERS_DIR + "hello", "yo dawg", {
    create: "true",
    parents: "true",
  });

  log(await all(ipfs.files.ls("/")));
  log(await all(ipfs.files.ls(PAPERS_DIR)));

  chrome.tabs.captureVisibleTab(null, {}, function (imageDataUrl) {
    document.body.prepend("This is test");
    // var DOM_img = document.createElement("img");
    // DOM_img.src = imageDataUrl;
    // document.body.prepend(DOM_img);
  });
}
main();

// chrome.tabs.query({ active: true, lastFocusedWindow: true }, async (tabs) => {
//   let url = tabs[0].url;
//   log("current url: ", url);

//   var content;
//   // type=pdf
//   if (url.slice(-4) === ".pdf") {
//     content = await extractTextFromPdf();
//     if (content) {
//     }
//   } else {
//     chrome.runtime.onMessage.addListener((request, sender) => {
//       if (request.action == "getHtml") {
//         content = request.html;
//       }
//     });

//     chrome.tabs.executeScript(tabs[0].id, {
//       code:
//         'const html = document.documentElement.outerHTML; chrome.runtime.sendMessage({action: "getHtml", html: html});',
//     });
//   }
// });

// chrome.tabs.captureVisibleTab(null, {}, function (imageDataUrl) {
//   document.body.prepend("This is test");
//   var DOM_img = document.createElement("img");
//   DOM_img.src = imageDataUrl;

//   document.body.prepend(DOM_img);

//   log("foo");

//   // Tesseract.recognize("http://tesseract.projectnaptha.com/img/eng_bw.png", {
//   //   logger: (m) => bkg.console.log(m),
//   // }).then(({ data: { text } }) => {
//   //   var h = document.createElement("H1");
//   //   var t = document.createTextNode(text);
//   //   h.appendChild(t);
//   //   document.body.prepend(h);
//   // });

//   log("bar");
// });

// const ipfsOptions = {
//   // repo: "./ipfs"
// };
// IPFS.create(ipfsOptions).then(async (ipfs) => {
//   log("initialized ipfs");
//   const topic = "ipfs-papers";
//   const msg = "this is a message";
//   ipfs.pubsub.publish(topic, msg, (err) => {
//     if (err) {
//       log(`failed to publish to ${topic}`, err);
//     }
//     log(`published to ${topic}: `, msg);
//   });
//   log("after publish");
// });

// function savePdf(content) {
//   const doi = extractDoi(content);
//   document.body.prepend("doi: ", doi);
// }

// function extractDoi(content) {
//   const re = /(10\.\d{4,9}\/[-._;():A-Z0-9]+)\s?/gi;
//   const match = re.exec(content);
//   return match && match[1];
// }

// async function extractTextFromPdf(pdfUrl, log) {
//   try {
//     pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

//     const doc = await pdfjsLib.getDocument(pdfUrl).promise;
//     const data = await doc.getMetadata();

//     log("# Metadata Is Loaded");
//     log("## Info");
//     log(JSON.stringify(data.info, null, 2));
//     if (data.metadata) {
//       log("## Metadata");
//       log(JSON.stringify(data.metadata.getAll(), null, 2));
//     }

//     async function getPageText(pageNum) {
//       const page = await doc.getPage(pageNum);
//       const content = await page.getTextContent();
//       const strings = content.items.map((item) => item.str);
//       return strings.join(" ");
//     }

//     return getPageText(1);
//   } catch (error) {
//     log("Failed to extract PDF text");
//     log(error);
//     return null;
//   }
// }

// "chrome-extension://nmdkebiopcgmbkhkcpeiedopnalmkbnf";
