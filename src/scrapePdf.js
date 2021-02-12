import { toString } from "lodash/fp";
import { MESSAGE_TYPES } from "./constants";
import getDetails from "./functions/get-details";

(async () => {
  try {
    const details = await getDetails();

    const response = await fetch(
      details && details.indirectFetch ? details.url : location.href
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