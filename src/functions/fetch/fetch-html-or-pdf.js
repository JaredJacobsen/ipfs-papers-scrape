import isPdfResponse from "../utils/is-pdf-response";

export default async function fetchHtmlOrPdf(url) {
  console.log("Fetching html or pdf");
  try {
    const response = await fetch(url);
    if (response.ok) {
      return isPdfResponse(response)
        ? { pdf: await response.blob() }
        : { html: response.text() };
    }
  } catch (error) {
    console.log(error);
    return {};
  }
}
