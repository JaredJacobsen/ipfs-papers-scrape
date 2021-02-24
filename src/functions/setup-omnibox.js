import {
  FETCH_CID_BASE_URL,
  GOOGLE_SCHOLAR_QUERY_BASE_URL,
} from "../constants";
import { lowerCase } from "lodash";
import { DOMParser } from "linkedom";
import getIpfsPapers from "./ipfs/get-ipfs-papers";
import createNewTab from "./tabs/create-new-tab";
import fuzzysearch from "fuzzysearch";
import log from "./utils/log";
global.DOMParser = DOMParser;
global.Node = { TEXT_NODE: 3, ELEMENT_NODE: 1 };

// import DomParser from "dom-parser";
// import { DOMParser } from "xmldom";
// global.DOMParser = DOMParser;
// import jsdom from "jsdom";
// global.DOMParser = DomParser; // eslint-disable-line
// const { JSDOM } = jsdom;
// global.DOMParser = new JSDOM().window.DOMParser;
// console.log("Setting omnibox, domp", DOMParser);

export default function setupOmnibox(ipfsPromise) {
  const papers = new Promise((resolve) => {
    chrome.omnibox.onInputStarted.addListener(async () => {
      resolve(await getIpfsPapers(await ipfsPromise));
    });
  });

  chrome.omnibox.setDefaultSuggestion({
    description: "Search Google Scholar",
  });

  chrome.omnibox.onInputChanged.addListener(async (text, suggest) => {
    log(text);

    const suggestions = (await papers)
      .filter(
        (paper) => !text || fuzzysearch(lowerCase(text), lowerCase(paper.title))
      )
      .flatMap((paper) => {
        const metadataSuggestion = {
          content: FETCH_CID_BASE_URL + paper.metadataCid,
          description: `(Metadata) ${paper.title}`,
          deletable: true,
        };
        return !paper.pdfCid
          ? [metadataSuggestion]
          : [
              metadataSuggestion,
              {
                content: FETCH_CID_BASE_URL + paper.pdfCid,
                description: `(PDF) ${paper.title}`,
                deletable: true,
              },
            ];
      });
    suggest(suggestions);
  });

  chrome.omnibox.onInputEntered.addListener(async (text, disposition) => {
    log(text);
    const url = text.includes(FETCH_CID_BASE_URL)
      ? text
      : GOOGLE_SCHOLAR_QUERY_BASE_URL + encodeURIComponent(text);

    if (disposition === "currentTab") {
      chrome.tabs.update({
        url,
      });
    } else {
      const active = disposition === "newForegroundTab";
      createNewTab(url, active);
    }
  });
}
