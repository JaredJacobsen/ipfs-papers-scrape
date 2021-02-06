import { unpaywallApiUrl } from "../../config";
import transformUnpaywallMetadata from "./transform-unpaywall-metadata";

export default async function fetchMetadata(doi) {
  try {
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
    console.log("Failed to fetch Unpaywall metadata");
    throw error;
  }
}
