import tabReady from "./tab-ready";

export default async function createNewTab(url, active) {
  return new Promise(async (resolve) => {
    const newTab = await chrome.tabs.create({
      url,
      active,
    });

    await tabReady(newTab.id);

    resolve(newTab);
  });
}
