import { toString } from "lodash/fp";
import { MESSAGE_TYPES } from "./constants";
import isPdf from "./functions/utils/is-pdf";

(async () => {
  try {
    const response = await fetch(location.href);
    if (response.ok) {
      const responseClone = response.clone();
      const isUrlAPdf = isPdf(await responseClone.arrayBuffer());

      chrome.runtime.sendMessage(
        isUrlAPdf
          ? {
              type: MESSAGE_TYPES.ACTIVE_TAB_PDF,
              pdf: URL.createObjectURL(await response.blob()),
            }
          : {
              type: MESSAGE_TYPES.HTML,
              html: document.documentElement.outerHTML,
            }
      );
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
