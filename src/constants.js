const PAPERS_DIR = "/ipfs-papers/papers/";
const PDF_FILES_DIR = "/ipfs-papers/pdf_files/";
const SCIHUB_URL = "https://sci-hub.do/";
const UNPAYWALL_URL = "https://api.unpaywall.org/v2/";
const SAVE_OPTIONS = { IPFS: "ipfs", DOWNLOADS: "downloads", BOTH: "both" };
const MESSAGE_TYPES = {
  START_SCRAPE: "START_SCRAPE",
  HTML: "HTML",
  PDF: "PDF",
  ERROR: "ERROR",
};

export {
  PAPERS_DIR,
  PDF_FILES_DIR,
  SCIHUB_URL,
  UNPAYWALL_URL,
  SAVE_OPTIONS,
  MESSAGE_TYPES,
};
