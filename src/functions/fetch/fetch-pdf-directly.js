export default async function fetchPdfDirectly(url) {
  console.log("Fetching doi or pdf directly");
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
}
