import { toString } from "lodash/fp";
import { MESSAGE_TYPES } from "./constants";

(async () => {
  try {
    const response = await fetch(location.href);

    if (response.ok) {
      chrome.runtime.sendMessage({
        type: MESSAGE_TYPES.NEW_TAB_PDF,
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
