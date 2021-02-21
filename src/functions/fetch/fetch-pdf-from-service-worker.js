import { default as fetch } from "../utils/wrappedFetch";

export default async function fetchPdfFromServiceWorker(url) {
  const response = await fetch(url);
  return response.blob();
}
