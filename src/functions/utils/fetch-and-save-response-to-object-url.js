// import isPdfResponse from "./is-pdf-response";

// export default async function fetchAndSaveResponseToObjectUrl(url) {
//   try {
//     const response = await fetch(url);

//     if (response.ok) {
//       const type = isPdfResponse(response) ? "pdf" : "html";
//       return { type, objectUrl: URL.createObjectURL(await response.blob()) };
//     } else {
//       throw "bad response status: " + response.status;
//     }
//   } catch (error) {
//     console.log("error");
//     return { error };
//   }
// }
