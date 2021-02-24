import IpfsHttpClient from "ipfs-http-client";
import getOptions from "./functions/utils/getOptions";
import setupOmnibox from "./functions/setup-omnibox";
import setupContextMenu from "./functions/setup-context-menu";
import setupMessageListeners from "./functions/setup-message-listeners";

const ipfsPromise = getOptions().then(({ ipfsUrl }) => IpfsHttpClient(ipfsUrl));

setupMessageListeners(ipfsPromise);

setupContextMenu(ipfsPromise);

setupOmnibox(ipfsPromise);
