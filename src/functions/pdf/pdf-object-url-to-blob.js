export default function pdfObjectUrlToBlob(url) {
  return fetch(url).then((r) => r.blob());
}
