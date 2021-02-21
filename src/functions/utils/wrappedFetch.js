export default async function wrappedFetch(url, options) {
  const response = await fetch(url, options);
  if (response.ok) {
    return response;
  } else {
    throw new Error(response.statusText);
  }
}
