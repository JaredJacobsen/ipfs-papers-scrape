//Inspired by https://github.com/kevva/is-pdf/blob/master/index.js

import inServiceWorker from "./in-service-worker";
import isPdfResponse from "./is-pdf-response";

export default async function fetchAndSaveToObjectUrl(url) {
  try {
    const response = await fetch(url);

    if (response.ok) {
      return URL.createObjectURL(await response.blob());
    } else {
      throw "bad response status: " + response.status;
    }
  } catch (error) {
    console.log("error");
    return { error };
  }
}

// if (pdfOnly) {
//   return inServiceWorker()
//     ? { pdf: await response.blob() }
//     : { pdfObjectUrl: URL.createObjectURL(await response.blob()) };
// } else {
//   if (isPdfResponse(response)) {
//     return inServiceWorker()
//       ? { pdf: await response.blob() }
//       : { pdfObjectUrl: URL.createObjectURL(await response.blob()) };
//   } else {
//     return inServiceWorker()
//       ? { html: await response.text() }
//       : { html: document.documentElement.outerHTML };
//   }
// }
