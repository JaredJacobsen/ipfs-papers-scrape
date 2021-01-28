// import Tesseract from "tesseract.js";
// import * as pdfjsLib from "pdfjs-dist";
// import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
import { pick } from "lodash/fp";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import IpfsHttpClient from "ipfs-http-client";
const ipfs = IpfsHttpClient("http://localhost:5001");

const PAPERS_DIR = "/ipfs-papers/papers/";
const PDF_FILES_DIR = "/ipfs-papers/pdf_files/";
const SCIHUB_URL = "https://sci-hub.do/";
const CORS_PROXY_URL = "http://127.0.0.1:9999/";

//#region scrape paper

async function scrapePaper() {
  try {
    await ipfs.id(); //Checks if IPFS is alive
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
  console.log("scrapepaper");
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, async (tabs) => {
    let url = tabs[0].url;
    console.log("current url: ", url);

    let content;
    if (url.slice(-4) === ".pdf") {
      content = await extractTextFromPdf(url);
      savePdf(content);
    } else {
      chrome.runtime.onMessage.addListener(async function getHtml(
        request,
        sender
      ) {
        chrome.runtime.onMessage.removeListener(getHtml);
        if (request.action == "getHtml") {
          content = request.html;
          await savePdf(content);
        }
      });

      chrome.tabs.executeScript(tabs[0].id, {
        code:
          'chrome.runtime.sendMessage({action: "getHtml", html: document.documentElement.outerHTML});',
      });
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
    console.log("Failed to extract PDF text: ", error);
    throw error;
  }
}

async function savePdf(content) {
  const doi = extractDoi(content);
  popupDocument.body.append("\ndoi: " + doi + "\n");

  const metadata = await fetchAndTransformUnpaywallData(doi);
  console.log(
    "🚀 ~ file: background.js ~ line 85 ~ savePdf ~ metadata",
    metadata
  );

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

async function fetchAndTransformUnpaywallData(doi) {
  const unpaywallBaseUrl = "https://api.unpaywall.org/v2/";

  let data;
  try {
    const response = await axios({
      method: "get",
      url: unpaywallBaseUrl + doi,
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
      params: {
        email: "jaredtjacobsen@gmail.com",
      },
    });

    console.log("fetched data from Unpaywall");
    data = response.data;

    return transformUnpaywallData(data);
  } catch (error) {
    console.log("Failed to fetch or process Unpaywall data: ", error);
    return null;
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
  const someMetadata = pick(metadataKeys, data);

  const authors = pick(
    ["given", "family", "affiliation", "orcid"],
    data.z_authors
  );

  const { url_for_landing_page = null, url_for_pdf = null } =
    data.best_oa_location || {};

  const allMetadata = {
    ...someMetadata,
    authors,
    url_for_landing_page,
    url_for_pdf,
  };

  return allMetadata;
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
  try {
    await ipfs.files.write(PAPERS_DIR + filename, JSON.stringify(obj), {
      create: "true",
      parents: "true",
    });
  } catch (error) {
    console.log("Failed to add scraped paper: ", error);
    throw error;
  }

  console.log("scraping pdf...");
  let cid;
  try {
    const downloadUrl =
      obj.url_for_pdf || (await fetchScihubPdfDownloadUrl(obj.doi));
    console.log(
      "🚀 ~ file: background.js ~ line 190 ~ addPaperToIpfs ~ downloadUrl",
      downloadUrl
    );

    if (downloadUrl) {
      // chrome.tabs.create({ url: downloadUrl, active: false });
      const res = await axios({
        method: "get",
        url: CORS_PROXY_URL + downloadUrl,
        headers: {
          "X-Requested-With": "XMLHttpRequest",
        },
        responseType: "blob",
      });
      console.log(
        "🚀 ~ file: background.js ~ line 198 ~ addPaperToIpfs ~ res",
        res
      );
      const data = res.data;
      cid = (await ipfs.add(data)).cid.string;
      console.log(
        "🚀 ~ file: background.js ~ line 201 ~ addPaperToIpfs ~ cid",
        cid
      );
    }
  } catch (error) {
    console.log("failed to fetch pdf: ", error);
    throw error;
  }

  console.log("cid", cid);

  if (cid) {
    try {
      const mfsPdfPath = PDF_FILES_DIR + filename + ".pdf";
      await ipfs.files.cp("/ipfs/" + cid, mfsPdfPath, {
        create: "true",
        parents: "true",
      });

      //After the pdf has been saved, the metadata should be updated to link to the saved pdf.
      const newObj = { ...obj, pdf: cid, path_to_pdf: mfsPdfPath };
      await ipfs.files.write(PAPERS_DIR + filename, JSON.stringify(newObj), {
        create: "true",
        parents: "true",
      });
    } catch (error) {
      console.log(
        "Failed to copy pdf file to MFS. This may be because the file already exists."
      );
      throw error;
    }
  } else {
    console.log("Failed to fetch pdf");
  }
}

async function fetchScihubPdfDownloadUrl(doi) {
  if (!doi) return null;

  try {
    const res = await axios({
      method: "get",
      url: CORS_PROXY_URL + SCIHUB_URL + doi,
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
      responseType: "text/html",
    });
    const data = res.data;
    console.log(
      "🚀 ~ file: background.js ~ line 238 ~ fetchScihubPdfDownloadUrl ~ data",
      res
    );

    const parser = new DOMParser();
    const doc = parser.parseFromString(data, "text/html");
    const downloadUrl = doc
      .querySelector("iframe#pdf")
      .src.replace("chrome-extension", "https");
    console.log(
      "🚀 ~ file: background.js ~ line 246 ~ fetchScihubPdfDownloadUrl ~ downloadUrl",
      downloadUrl
    );

    return downloadUrl;
  } catch (error) {
    console.log("failed to fetch Scihub pdf download URL: ", error);
    return null;
  }
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
