import isPdfResponse from "../utils/is-pdf-response";
import log from "../utils/log";
import { default as fetch } from "../utils/wrappedFetch";

export default async function fetchHtmlOrPdf(url) {
  log("Fetching html or pdf");
  try {
    const response = await fetch(url);
    return isPdfResponse(response)
      ? { pdf: await response.blob() }
      : { html: response.text() };
  } catch (error) {
    log(error);
    return {};
  }
}
