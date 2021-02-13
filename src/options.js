import { reduce, kebabCase, forEach } from "lodash";
import defaultOptions from "./defaultOptions";

document.addEventListener("DOMContentLoaded", restore_options);
document
  .getElementById("save")
  .addEventListener("click", () => save_options(false));
document
  .getElementById("reset")
  .addEventListener("click", () => save_options(true));

function restore_options() {
  chrome.storage.sync.get(defaultOptions, (items) => {
    forEach(items, (v, k) => {
      const x = document.getElementById(kebabCase(k));
      if (x.type === "checkbox") {
        x.checked = v;
      } else if (x.type === "text") {
        x.value = v;
      }
    });
  });
}

function save_options(reset) {
  const newOptions = reduce(
    defaultOptions,
    (acc, v, k) => {
      const x = document.getElementById(kebabCase(k));
      if (x.type === "checkbox") {
        acc[k] = x.checked;
      } else if (x.type === "text") {
        acc[k] = x.value;
      }
      return acc;
    },
    {}
  );

  chrome.storage.sync.set(reset ? defaultOptions : newOptions, () => {
    restore_options();

    var status = document.getElementById("status");
    status.textContent = "options saved";
    setTimeout(function () {
      status.textContent = "";
    }, 750);
  });
}
