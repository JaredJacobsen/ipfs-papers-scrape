export default function urlOrigin(url) {
  const scheme = url.split("://")[0];
  const { hostname } = new URL(url);
  return scheme + "://" + hostname;
}
