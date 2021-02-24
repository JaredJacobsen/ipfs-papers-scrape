import tabReady from "./tab-ready";

export default async function createNewTab(url, active) {
  const newTab = await chrome.tabs.create({
    url,
    active,
  });
  await tabReady(newTab.id);
  return newTab;
}
