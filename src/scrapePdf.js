import { toString } from "lodash/fp";
import { MESSAGE_TYPES } from "./constants";
import getOptions from "./functions/get-options";

(async () => {
  try {
    const options = await getOptions();

    const response = await fetch(
      options && options.indirectFetch ? options.url : location.href
    );

    if (response.ok) {
      chrome.runtime.sendMessage({
        type: MESSAGE_TYPES.PDF_WITH_SAVED_METADATA,
        pdf: URL.createObjectURL(await response.blob()),
      });
    } else {
      throw "bad response: " + response.status;
    }
  } catch (error) {
    chrome.runtime.sendMessage({
      type: MESSAGE_TYPES.ERROR,
      error: toString(error),
    });
  }
})();
