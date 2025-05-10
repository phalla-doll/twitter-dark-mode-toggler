// content.js
console.log("Content script loaded!");

// Example: Change the background color of the body
// document.body.style.backgroundColor = 'lightblue';

// Example: Add a simple div to the page
const newDiv = document.createElement('div');
newDiv.style.position = 'fixed';
newDiv.style.bottom = '10px';
newDiv.style.right = '10px';
newDiv.style.padding = '10px';
newDiv.style.backgroundColor = 'rgba(0,0,0,0.7)';
newDiv.style.color = 'white';
newDiv.style.zIndex = '9999';
newDiv.textContent = 'React Extension Content Script Active!';
document.body.appendChild(newDiv);

// To communicate with other parts of your extension (e.g., background script or popup)
// chrome.runtime.sendMessage({ greeting: "hello from content script" }, function(response) {
//   console.log(response.farewell);
// });

// To listen for messages
// chrome.runtime.onMessage.addListener(
//   function(request, sender, sendResponse) {
//     console.log(sender.tab ?
//                 "from a content script:" + sender.tab.url :
//                 "from the extension");
//     if (request.greeting === "hello from popup")
//       sendResponse({ farewell: "goodbye from content script" });
//   }
// );