import { MESSAGE_TYPES } from "./constants";

const buttonCssText = `
  display: inline-block;
  position: relative;
  margin-left: 6px;
  background: none;
  box-shadow: none;
  color: DarkOrange;
  font-weight: 700;
  border-radius: 0px;
  border-color: DarkOrange;
`;

[...document.getElementsByClassName("gs_ri")].map((x) => {
  const btn = document.createElement("BUTTON");
  btn.innerHTML = "\u2795 Decent Papers";
  btn.style.cssText = buttonCssText;

  const url = x.getElementsByClassName("gs_rt")[0].getElementsByTagName("a")[0]
    .href;

  btn.addEventListener("click", () => {
    chrome.runtime.sendMessage({
      type: MESSAGE_TYPES.SCRAPE_NEW_TAB,
      url,
    });
  });

  x.getElementsByClassName("gs_a")[0].appendChild(btn);
});
