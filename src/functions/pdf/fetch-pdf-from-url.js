import createNewTab from "../tabs/create-new-tab";
import getTabPdf from "../tabs/get-tab-pdf";
import origin from "../utils/origin";

export default async function fetchPdfFromUrl(url) {
  try {
    console.log("Directly fetching pdf from " + url);
    const response = await fetch(url);
    if (response.ok) {
      return response.blob();
    }
  } catch (error) {
    console.log("Direct pdf fetch failed");
    console.log(error);
  }

  try {
    console.log(
      "Creating new tab to fetch pdf from url origin to avoid CORS errors"
    );

    const urlOrigin = origin(url);
    const newTab = await createNewTab(urlOrigin, false);

    console.log("Executing script in new tab");
    return getTabPdf(newTab.id, { url });
  } catch (error) {
    console.log("Failed to fetch pdf in new tab");
  }

  try {
    console.log("Creating new tab at pdf url to fetch pdf directly");

    const urlOrigin = origin(url);
    const newTab = await createNewTab(urlOrigin, false);

    console.log("Executing script in new tab");
    return getTabPdf(newTab.id, { url });
  } catch (error) {
    console.log("Failed to fetch pdf. No more tries");
  }
}
