import { MESSAGE_TYPES } from "./constants";
import isPdfResponse from "./functions/utils/is-pdf-response";
import log from "./functions/utils/log";
import logTable from "./functions/utils/logTable";
import sendMessage from "./functions/utils/send-message";

(async () => {
  try {
    const args = await sendMessage({
      id: "scrapeHtmlOrPdf",
      type: MESSAGE_TYPES.ARGS,
    });

    logTable(args, "Script args", false);

    const response = await fetch((args && args.url) || location.href);

    if (response.ok) {
      const type = isPdfResponse(response) ? "pdf" : "html";
      const result = {
        type,
        objectUrl: URL.createObjectURL(await response.blob()),
      };

      sendMessage({ id: "test", type: MESSAGE_TYPES.DONE, result });
    } else {
      throw "bad response status: " + response.status;
    }
  } catch (error) {
    log(error);
    sendMessage({ id: "test", type: MESSAGE_TYPES.DONE, error });
  }
})();
