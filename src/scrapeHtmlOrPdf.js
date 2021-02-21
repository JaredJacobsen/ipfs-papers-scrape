import { MESSAGE_TYPES } from "./constants";
import isPdfResponse from "./functions/utils/is-pdf-response";
import log from "./functions/utils/log";
import logTable from "./functions/utils/logTable";
import sendMessage from "./functions/utils/send-message";
import { default as fetch } from "./functions/utils/wrappedFetch";

(async () => {
  try {
    const args = await sendMessage({
      id: "scrapeHtmlOrPdf",
      type: MESSAGE_TYPES.ARGS,
    });

    logTable(args, "Script args", false);

    const response = await fetch((args && args.url) || location.href);
    const type = isPdfResponse(response) ? "pdf" : "html";
    const objectUrl = URL.createObjectURL(await response.blob());
    const result = {
      type,
      objectUrl,
    };

    sendMessage({ id: "test", type: MESSAGE_TYPES.DONE, result });
  } catch (error) {
    log(error);
    sendMessage({ id: "test", type: MESSAGE_TYPES.DONE, error });
  }
})();
