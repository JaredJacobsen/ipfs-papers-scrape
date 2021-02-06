import { toString } from "lodash/fp";
import { MESSAGE_TYPES } from "./constants";
import isPdf from "./functions/utils/is-pdf";

(async () => {
  try {
    const response = await fetch(location.href);
    if (response.ok) {
      const responseClone = response.clone();
      const isUrlAPdf = isPdf(await responseClone.arrayBuffer());
      if (isUrlAPdf) {
        const pdf = URL.createObjectURL(await response.blob()); //TODO use storage
        chrome.runtime.sendMessage({ type: MESSAGE_TYPES.PDF, pdf });
      } else {
        chrome.runtime.sendMessage({
          type: MESSAGE_TYPES.HTML,
          html: document.documentElement.outerHTML,
        });
      }
    } else {
      throw "bad response status: " + response.status;
    }
  } catch (error) {
    chrome.runtime.sendMessage({
      type: MESSAGE_TYPES.ERROR,
      error: toString(error),
    });
  }
})();
