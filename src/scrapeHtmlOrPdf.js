import isPdfResponse from "./functions/utils/is-pdf-response";
import sendMessage from "./functions/utils/send-message";

(async () => {
  try {
    const args = await sendMessage({ id: "scrapeHtmlOrPdf", type: "start" });

    const response = await fetch((args && args.url) || location.href);

    if (response.ok) {
      const type = isPdfResponse(response) ? "pdf" : "html";
      const result = {
        type,
        objectUrl: URL.createObjectURL(await response.blob()),
      };

      sendMessage({ id: "test", type: "end", result });
    } else {
      throw "bad response status: " + response.status;
    }
  } catch (error) {
    sendMessage({ id: "test", type: "end", error });
  }
})();
