export default function sameOrigin(url1, url2) {
  const { hostname1 } = new URL(url1);
  const { hostname2 } = new URL(url2);
  return hostname1 === hostname2;
}
