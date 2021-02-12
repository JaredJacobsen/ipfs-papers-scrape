import { toString } from "lodash/fp";
import { MESSAGE_TYPES } from "./constants";
import getDetails from "./functions/get-details";
import isPdf from "./functions/utils/is-pdf";

(async () => {
  try {
    const details = await getDetails();

    const response = await fetch(
      details && details.indirectFetch ? details.url : location.href
    );

    if (response.ok) {
      const responseClone = response.clone();
      const isUrlAPdf = isPdf(await responseClone.arrayBuffer());

      const message = isUrlAPdf
        ? {
            type: MESSAGE_TYPES.PDF_WITHOUT_SAVED_METADATA,
            pdf: URL.createObjectURL(await response.blob()),
          }
        : {
            type: MESSAGE_TYPES.HTML,
            html: document.documentElement.outerHTML,
          };

      chrome.runtime.sendMessage(message);
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