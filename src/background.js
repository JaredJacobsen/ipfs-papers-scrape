// import Tesseract from "tesseract.js";
// import * as pdfjsLib from "pdfjs-dist";
// import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
import { pick } from "ramda";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import IpfsHttpClient from "ipfs-http-client";
const ipfs = IpfsHttpClient("http://localhost:5001");

const PAPERS_DIR = "/ipfs-papers/papers/";
const PDF_FILES_DIR = "/ipfs-papers/pdf_files/";

// function scrapePaper() {
//   console.log("called scrapePaper");
//   popupDocument.body.append("some t");
//   setTimeout(() => {
//     popupDocument.body.append("another t");
//   }, 3000);
// }

async function scrapePaper() {
  try {
    await ipfs.id();
    _scrapePaper();
  } catch (error) {
    console.log("Failed to scrape paper: ", error);
    popupDocument.body.append(
      "\nUnable to reach IPFS. Make sure that IPFS is running at http://localhost:5001\n"
    );
  }
}

window.scrapePaper = scrapePaper;

async function _scrapePaper() {
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, async (tabs) => {
    let url = tabs[0].url;
    console.log("current url: ", url);

    let content;
    // try {
    if (url.slice(-4) === ".pdf") {
      content = await extractTextFromPdf(url);
      savePdf(content);
    } else {
      chrome.runtime.onMessage.addListener(async (request, sender) => {
        if (request.action == "getHtml") {
          content = request.html;
          await savePdf(content);
        }
      });

      chrome.tabs.executeScript(tabs[0].id, {
        code:
          'const html = document.documentElement.outerHTML; chrome.runtime.sendMessage({action: "getHtml", html: html});',
      });
    }
    // } catch (error) {
    //   console.log("Failed to fetch contents of paper: ", error);
    //   throw error;
    // }
  });
}

async function extractTextFromPdf(pdfUrl) {
  try {
    pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

    const doc = await pdfjsLib.getDocument(pdfUrl).promise;
    const data = await doc.getMetadata();

    // console.log("## Info");
    // console.log(JSON.stringify(data.info, null, 2));
    // if (data.metadata) {
    //   console.log("## Metadata");
    //   console.log(JSON.stringify(data.metadata.getAll(), null, 2));
    // }

    async function getPageText(pageNum) {
      const page = await doc.getPage(pageNum);
      const content = await page.getTextContent();
      const strings = content.items.map((item) => item.str);
      return strings.join(" ");
    }

    return getPageText(1);
  } catch (error) {
    console.log("Failed to extract PDF text: ", error);
    throw error;
  }
}

async function savePdf(content) {
  const doi = extractDoi(content);
  popupDocument.body.append("\ndoi: " + doi + "\n");

  const metadata = transformUnpaywallData(await fetchUnpaywallData(doi));
  console.log("metadata: ", metadata);

  popupDocument.body.append(
    "\nscraped paper! " + JSON.stringify(metadata) + "\n"
  );

  const filename = getPaperFilename(metadata.title);
  addPaperToIpfs(filename, metadata);
}

function extractDoi(content) {
  const re = /(10\.\d{4,9}\/[-._;():A-Z0-9]+)\s?/gi;
  const match = re.exec(content);
  return match && match[1];
}

async function fetchUnpaywallData(doi) {
  const unpaywallBaseUrl = "https://api.unpaywall.org/v2/";

  try {
    const response = await axios({
      method: "get",
      url: unpaywallBaseUrl + doi,
      params: {
        email: "jaredtjacobsen@gmail.com",
      },
    });

    console.log("fetched data from Unpaywall");
    return response.data;
  } catch (error) {
    console.log("Failed to fetch data from Unpaywall: ", error);
    throw error;
  }
}

function transformUnpaywallData(data) {
  const metadataKeys = [
    "doi",
    "title",
    "genre",
    "published_date",
    "journal_name",
    "journal_issns",
    "journal_issn_l",
    "journal_is_oa",
    "journal_is_in_doaj",
    "publisher",
    "is_oa",
    "oa_status",
  ];
  const metadata = pick(metadataKeys, data);

  const authorMetadataKeys = ["given", "family", "affiliation", "orcid"];
  metadata.authors = pick(authorMetadataKeys, data.z_authors);

  metadata.url_for_landing_page = data.best_oa_location.url_for_landing_page;
  metadata.url_for_pdf = data.best_oa_location.url_for_pdf;

  return metadata;
}

//This function must match that in https://github.com/JaredJacobsen/ipfs-papers-react-native
function getPaperFilename(title) {
  const base = title
    .trim()
    .replace(/\s+/g, "-")
    .toLowerCase()
    .replace(/[^\w-]/g, "");

  return base + "-" + uuidv4();
}

async function addPaperToIpfs(filename, obj) {
  // const t = Date.now();
  // const id = `scraped-paper-${t}`;
  // const obj = { title: t };

  try {
    await ipfs.files.write(PAPERS_DIR + filename, JSON.stringify(obj), {
      create: "true",
      parents: "true",
    });
  } catch (error) {
    console.log("Failed to add scraped paper: ", error);
    throw error;
  }

  if (obj.url_for_pdf) {
    console.log("scraping pdf...");
    try {
      // const cid = await ipfs.add(urlSource(obj.url_for_pdf));
      const cid = await fetchPdf("http://127.0.0.1:9999/" + obj.url_for_pdf);
      console.log(cid);
      const mfsPdfPath = PDF_FILES_DIR + filename + ".pdf";
      try {
        await ipfs.files.cp("/ipfs/" + cid, mfsPdfPath, {
          create: "true",
          parents: "true",
        });
      } catch (error) {
        console.log(
          "Failed to copy pdf file to MFS. This may be because the file already exists."
        );
      }

      const newObj = { ...obj, pdf: cid, path_to_pdf: mfsPdfPath };
      await ipfs.files.write(PAPERS_DIR + filename, JSON.stringify(newObj), {
        create: "true",
        parents: "true",
      });
    } catch (error) {
      console.log("Failed to scrape pdf: ", error);
      throw error;
    }
  }
}

async function fetchPdf(url) {
  try {
    console.log("before fetch", url);
    const res = await axios({
      method: "get",
      url,
      responseType: "blob",
    });
    const data = res.data;
    const { cid } = await ipfs.add(data);
    console.log("cid after fetch: ", cid.string);
    return cid.string;
  } catch (error) {
    console.log("failed to fetch pdf: ", error);
    throw error;
  }
}

////////////////////////////////////////////////////////////
// OCR
////////////////////////////////////////////////////////////

// Tesseract.recognize("http://tesseract.projectnaptha.com/img/eng_bw.png", {
//   logger: (m) => bkg.console.log(m),
// }).then(({ data: { text } }) => {
//   var h = document.createElement("H1");
//   var t = document.createTextNode(text);
//   h.appendChild(t);
//   popupDocument.body.prepend(h);
// });

// chrome.tabs.captureVisibleTab(null, {}, function (imageDataUrl) {
// var DOM_img = document.createElement("img");
// DOM_img.src = imageDataUrl;
// popupDocument.body.prepend(DOM_img);
// });

///////////////////////////////////////////////////////////
// CONTEXT MENUS
///////////////////////////////////////////////////////////

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
