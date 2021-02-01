// import Tesseract from "tesseract.js";
// import * as pdfjsLib from "pdfjs-dist";
// import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
import { pick } from "lodash/fp";
import { v4 as uuidv4 } from "uuid";
import IpfsHttpClient from "ipfs-http-client";
import isPdf from "./utils/is-pdf";
const ipfs = IpfsHttpClient("http://localhost:5001");

const PAPERS_DIR = "/ipfs-papers/papers/";
const PDF_FILES_DIR = "/ipfs-papers/pdf_files/";
const SCIHUB_URL = "https://sci-hub.do/";
const UNPAYWALL_URL = "https://api.unpaywall.org/v2/";
const SAVE_TO_OPTIONS = { IPFS: "ipfs", DOWNLOADS: "downloads", BOTH: "both" };

//#region scrape paper

async function scrapePaper() {
  try {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) =>
      _scrapePaper(tabs[0].url)
    );
  } catch (error) {
    console.log("Failed to scrape paper");
    console.log(error);
  }
  //TODO add finally block to clean up listener
}
window.scrapePaper = scrapePaper; //popup.js can't access the scrapePaper function unless it is on the window

async function _scrapePaper(tabUrl) {
  const response = await fetch(tabUrl);

  const isUrlAPdf = isPdf(await response.arrayBuffer());

  const pageText = isUrlAPdf
    ? await extractTextFromPdf(tabUrl)
    : await response.text();

  const doi = extractDoi(pageText);
  if (!doi) throw "Cannot find paper DOI number";

  console.log("Fetching metadata...");
  const metadata = await fetchMetadata(doi);

  displayPopupMessage(`Title: ${metadata.title}\nDOI: ${doi}`);

  const saveTo = (await isIpfsReachable())
    ? SAVE_TO_OPTIONS.IPFS
    : SAVE_TO_OPTIONS.DOWNLOADS; //TODO should be false depending on options

  console.log("Saving metadata: ", metadata);
  const mfsFilename =
    saveTo === SAVE_TO_OPTIONS.ipfs || saveTo === SAVE_TO_OPTIONS.BOTH
      ? await saveMetadata(metadata)
      : null;

  displayPopupMessage("Saved metadata to IPFS");

  if (isUrlAPdf) {
    const data = await fetch(tabUrl).then((r) => r.blob());

    if (saveTo === SAVE_TO_OPTIONS.ipfs || saveTo === SAVE_TO_OPTIONS.BOTH) {
      savePdfToIpfs(MfsFilename, metadata, data);
      displayPopupMessage("Saved PDF to IPFS");
    }

    if (
      saveTo === SAVE_TO_OPTIONS.DOWNLOADS ||
      saveTo === SAVE_TO_OPTIONS.BOTH
    ) {
      downloadPdf(MfsFilename, data);
    }
  } else {
    listenForFetchedPdf(metadata, MfsFilename, saveTo);

    console.log("fetching pdf...");
    await fetchPdf(mfsFilename, metadata);
  }
}

async function fetchMetadata(doi) {
  try {
    const url = new URL(UNPAYWALL_URL + doi);
    url.searchParams.append("email", "jaredtjacobsen@gmail.com");

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
    });

    const metadata = await response.json();

    return transformUnpaywallMetadata(metadata);
  } catch (error) {
    console.log("Failed to fetch Unpaywall metadata");
    throw error;
  }
}

async function saveMetadata(metadata) {
  const mfsFilename = getMfsFilenameForPaper(metadata.title);
  try {
    await ipfs.files.write(PAPERS_DIR + mfsFilename, JSON.stringify(metadata), {
      create: "true",
      parents: "true",
    });
  } catch (error) {
    console.log("Failed to save paper metadata");
    throw error;
  }
  return mfsFilename;
}

async function isIpfsReachable() {
  let reachable = true;
  try {
    await ipfs.id(); //Check if IPFS is alive. Throws if not
  } catch (error) {
    reachable = false;
    console.log("IPFS unreachable at http://localhost:5001");
    displayPopupMessage(
      `Unable to reach IPFS. Make sure that IPFS is running at http://localhost:5001`
    );
  }
  return reachable;
}

async function listenForFetchedPdf(metadata, MfsFilename, saveTo) {
  chrome.runtime.onMessage.addListener(async function listener(request) {
    if (request.action === "sendPdf") {
      chrome.runtime.onMessage.removeListener(listener);
      if (request.error) {
        console.log("Failed to fetch pdf");
        console.log(error);
      } else {
        console.log("saving pdf");

        const data = await fetch(request.url).then((r) => r.blob());
        chrome.tabs.remove(tab.id);

        if (
          saveTo === SAVE_TO_OPTIONS.IPFS ||
          saveTo === SAVE_TO_OPTIONS.BOTH
        ) {
          savePdfToIpfs(MfsFilename, metadata, data);
        }

        if (
          saveTo === SAVE_TO_OPTIONS.DOWNLOADS ||
          saveTo === SAVE_TO_OPTIONS.BOTH
        ) {
          downloadPdf(MfsFilename, data);
        }
      }
    }
  });
}

async function fetchPdf(metadata) {
  const fetchFromScihub = !metadata.url_for_pdf; //TODO check if settings allow scihub
  const createTabUrl = fetchFromScihub
    ? SCIHUB_URL + doi
    : metadata.url_for_pdf;

  chrome.tabs.create({ url: createTabUrl, active: false }, (tab) => {
    const tabUrl = tab.url || tab.pendingUrl; //`tabUrl` could be different than `createTabUrl` if there is a redirect or something

    const code = `(async () => {
      try {
        ${
          fetchFromScihub
            ? `const res = await fetch("${tabUrl}");
              const parser = new DOMParser();
              const url = parser
              .parseFromString(await res.text(), "text/html")
              .querySelector("iframe#pdf")
              .src.replace("chrome-extension", "https")
              .replace(/#.*/g, "");
              const response = await fetch(url)`
            : `const response = await fetch("${tabUrl}")`
        }
        if (response.ok) {
          const url = URL.createObjectURL(await response.blob())
          chrome.runtime.sendMessage({action: "sendPdf", url})
        } else {
          throw "bad response: " + response.status
        }
      } catch (error) {
        chrome.runtime.sendMessage({action: "sendPdf", error })
      }
    })();`;

    chrome.tabs.executeScript(tab.id, { code });
  });
}

async function savePdfToIpfs(MfsFilename, metadata, data) {
  const cid = (await ipfs.add(data)).cid.string;
  console.log("cid: ", cid);

  //Add pdf to MFS
  const mfsPdfPath = PDF_FILES_DIR + MfsFilename + ".pdf";
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
    PAPERS_DIR + MfsFilename,
    JSON.stringify(newMetadata),
    {
      create: "true",
      parents: "true",
    }
  );

  console.log("Saved PDF to IPFS");
  displayPopupMessage("Saved PDF to IPFS");
}

async function downloadPdf(filename, data) {
  chrome.downloads.download({ filename, body: data }, (downloadId) => {
    if (!downloadId) {
      console.log("Failed to download PDF");
      displayPopupMessage("Failed to download PDF");
    }
  });
}

async function extractTextFromPdf(pdfUrl) {
  try {
    pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

    const doc = await pdfjsLib.getDocument(pdfUrl).promise;
    const data = await doc.getMetadata();

    async function getPageText(pageNum) {
      const page = await doc.getPage(pageNum);
      const content = await page.getTextContent();
      const strings = content.items.map((item) => item.str);
      return strings.join(" ");
    }

    return getPageText(1);
  } catch (error) {
    console.log("Failed to extract PDF text");
    throw error;
  }
}

function extractDoi(content) {
  const re = /(10\.\d{4,9}\/[-._;():A-Z0-9]+)\s?/gi;
  const match = re.exec(content);
  return match && match[1];
}

function transformUnpaywallMetadata(metadata) {
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
  const someMetadata = pick(metadataKeys, metadata);

  const authors = pick(
    ["given", "family", "affiliation", "orcid"],
    metadata.z_authors
  );

  const { url_for_landing_page = null, url_for_pdf = null } =
    metadata.best_oa_location || {};

  const allMetadata = {
    ...someMetadata,
    authors,
    url_for_landing_page,
    url_for_pdf,
  };

  return allMetadata;
}

//This function must match that in https://github.com/JaredJacobsen/ipfs-papers-react-native
function getMfsFilenameForPaper(title) {
  const base = title
    .trim()
    .replace(/\s+/g, "-")
    .toLowerCase()
    .replace(/[^\w-]/g, "");

  return base + "-" + uuidv4();
}

function displayPopupMessage(message) {
  popupDocument.body.append(`\n${message}\n`);
}

//#endregion scrape paper

//#region OCR

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

//#endregion

//#region context menu

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

//#endregion
