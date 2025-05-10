// background.js
console.log("Background service worker loaded.");

// Example: Listen for when the extension is installed
chrome.runtime.onInstalled.addListener(() => {
    console.log("React Chrome Extension installed!");
    // You can set up initial storage values here
    chrome.storage.local.set({ enabled: true });
});

// Example: Listen for messages from other parts of the extension
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Message received in background:", message);

  if (message.greeting === "hello from popup") {
    // To send a response immediately:
    // sendResponse({ farewell: "goodbye from background" });

    // Or, if you need to do something asynchronous:
    setTimeout(() => {
      sendResponse({ farewell: "goodbye from background after a delay" });
    }, 1000);

    return true; // Important: Keep the message channel open for async response
  }
  // Optional: return false or nothing if you don't send a response for other messages
  // or if the response is synchronous and already sent.
});

// Example: Listening for a tab update
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url && tab.url.includes('http')) {
        console.log(`Tab ${tabId} was updated to ${tab.url}`);
        // You could inject a script programmatically here if needed,
        // using the "scripting" permission.
        // chrome.scripting.executeScript({
        //   target: { tabId: tabId },
        //   files: ["content.js"]
        // });
    }
});
