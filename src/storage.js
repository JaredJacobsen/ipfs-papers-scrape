import { toString } from "lodash/fp";

const storage = {
  set: (key, value) => {
    key = toString(key);
    return new Promise((resolve) =>
      chrome.storage.local.set({ [key]: value }, resolve)
    );
  },

  get: (key) => {
    key = toString(key);
    return new Promise((resolve) =>
      chrome.storage.local.get([key], ({ [key]: value }) => resolve(value))
    );
  },
};

export default storage;
