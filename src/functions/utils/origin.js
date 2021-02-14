export default function origin(url) {
  url = new URL(url);
  return url.origin;
}
