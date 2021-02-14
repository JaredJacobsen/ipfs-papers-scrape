import origin from "./origin";

export default function sameOrigin(url1, url2) {
  if (!url1 || !url2) {
    return false;
  }
  return origin(url1) === origin(url2);
}
