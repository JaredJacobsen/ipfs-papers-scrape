export default async function fetchPdfFromServiceWorker(url) {
  const response = await fetch(url);
  if (response.ok) {
    return response.blob();
  }
  throw "Bad response: " + JSON.stringify(response);
}
