import getOptions from "../utils/getOptions";
import transformUnpaywallMetadata from "../metadata/transform-unpaywall-metadata";
import log from "../utils/log";

export default async function fetchMetadata(doi) {
  log("Fetching metadata from Unpaywall.");
  try {
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
  } catch (error) {
    log("Failed to fetch Unpaywall metadata");
    throw error;
  }
}
