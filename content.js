

const regex = /^https:\/\/github.com\/Bini-Games/i;
console.log('start worker');
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    console.log(tab);
    console.log(regex.test(tab.url));
    if (changeInfo.status === 'complete' && regex.test(tab.url)) {
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ["./foreground.js"]
        });
        chrome.scripting.insertCSS({
            target: { tabId: tabId },
            files: ["styles.css"]
        });
    }
});

// chrome.runtime.onInstalled.addListener((object) => {
//     let internalUrl = chrome.runtime.getURL("installed.html");
//     // default state goes here
//     chrome.tabs.create({ url: internalUrl }, function (tab) {
//         console.log("New tab launched with http://yoursite.com/");
//     });
//     if (object.reason === chrome.runtime.OnInstalledReason.INSTALL) {
//         console.log("New tab launched with http://kek.com/");
//     }
// });