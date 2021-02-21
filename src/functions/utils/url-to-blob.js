import { default as fetch } from "./wrappedFetch";

export default function urlToBlob(url) {
  return fetch(url).then((r) => r.blob());
}
