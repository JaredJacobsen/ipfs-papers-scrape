const bp = chrome.extension.getBackgroundPage();

bp.popupDocument = document;

bp.scrapePaper();
