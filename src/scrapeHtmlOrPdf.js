import fetchHtmlOrPdf from "./functions/utils/fetch-html-or-pdf";
import sendMessage from "./functions/utils/send-message";

(async () => {
  const args = await sendMessage({ id: "scrapeHtmlOrPdf", type: "start" });
  const result = await fetchHtmlOrPdf(args.url, args.pdfOnly);
  sendMessage({ id: "test", type: "end", result });
})();
