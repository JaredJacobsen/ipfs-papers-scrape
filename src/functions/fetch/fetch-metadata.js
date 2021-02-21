import getOptions from "../utils/getOptions";
import transformUnpaywallMetadata from "../metadata/transform-unpaywall-metadata";
import { default as fetch } from "../utils/wrappedFetch";

export default async function fetchMetadata(doi) {
  if (!doi) {
    return null;
  }

  const { unpaywallApiUrl } = await getOptions();
  const url = new URL(unpaywallApiUrl + doi);
  url.searchParams.append("email", "jaredtjacobsen@gmail.com");
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
  });
  const metadata = await response.json();
  return transformUnpaywallMetadata(metadata);
}
