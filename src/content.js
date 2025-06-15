// content.js
console.log("Content script loaded!");

// Function to create Sample 1 button
function createSample1Button() {
  const button = document.createElement('button');
  button.setAttribute('aria-label', 'Light/Dark');
  button.setAttribute('role', 'button');
  button.setAttribute('class', 'css-175oi2r r-6koalj r-eqz5dr r-16y2uox r-1habvwh r-cnw61z r-13qz1uu r-1loqt21 r-1ny4l3l');
  button.setAttribute('data-testid', 'AppTabBar_LightDark');
  button.setAttribute('type', 'button');
  button.innerHTML = `
    <style>
      .simple-switch {
        position: relative;
        display: inline-block;
        width: 40px;
        height: 22px;
        vertical-align: middle;
        margin-right: 10px;
        margin-left: 14px;
      }
      .simple-switch input {
        opacity: 0;
        width: 0;
        height: 0;
      }
      .slider {
        position: absolute;
        cursor: pointer;
        top: 0; left: 0; right: 0; bottom: 0;
        background-color: #ccc;
        transition: .4s;
        border-radius: 22px;
      }
      .slider:before {
        position: absolute;
        content: "";
        height: 18px;
        width: 18px;
        left: 2px;
        bottom: 2px;
        background-color: white;
        transition: .4s;
        border-radius: 50%;
      }
      .simple-switch input:checked + .slider {
        background-color: #1da1f2;
      }
      .simple-switch input:checked + .slider:before {
        transform: translateX(18px);
      }
    </style>
    <label class="simple-switch">
      <input type="checkbox" id="theme-mode">
      <span class="slider"></span>
    </label>
  `;
  return button;
}

function insertButtonIntoNav() {
  const nav = document.querySelector('nav[aria-label="Primary"][role="navigation"]');
  if (nav) {
    if (!nav.querySelector('[data-testid="AppTabBar_LightDark"]')) {
      const button = createSample1Button();
      nav.appendChild(button);
      // Add event listener to the checkbox
      const checkbox = button.querySelector('#theme-mode');
      const html = document.documentElement;
      if (checkbox) {
        function recalculateToggleState() {
          const htmlColorScheme = html.style.colorScheme || window.getComputedStyle(html).getPropertyValue('color-scheme');
          if (htmlColorScheme.includes('dark')) {
            checkbox.checked = true;
          } else {
            checkbox.checked = false;
          }
          html.style.colorScheme = checkbox.checked ? 'dark' : 'light';
        }
        // Initial calculation
        recalculateToggleState();
        // Observe changes on <html> and <body>
        const observer = new MutationObserver(() => {
          recalculateToggleState();
        });
        observer.observe(html, { attributes: true, attributeFilter: ['class', 'style'] });
        observer.observe(document.body, { attributes: true, attributeFilter: ['class', 'style'] });
        checkbox.addEventListener('change', function () {
          if (checkbox.checked) {
            document.body.style.backgroundColor = 'rgb(0, 0, 0)';
            document.body.style.scrollbarColor = 'rgb(62, 65, 68) rgb(22, 24, 28)';
            html.style.colorScheme = 'dark';
          } else {
            document.body.style.backgroundColor = 'rgb(255, 255, 255)';
            document.body.style.scrollbarColor = 'rgb(185, 202, 211) rgb(247, 249, 249)';
            html.style.colorScheme = 'light';
          }
        });
      }
      console.log('Dark Mode button injected!');
      return true;
    }
  }
  return false;
}

// Try to insert immediately in case nav is already loaded
if (!insertButtonIntoNav()) {
  // If not found, observe for nav to appear
  const observer = new MutationObserver(() => {
    if (insertButtonIntoNav()) {
      observer.disconnect();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

// Example: Change the background color of the body
// document.body.style.backgroundColor = 'lightblue';

// Example: Add a simple div to the page
// const newDiv = document.createElement('div');
// newDiv.style.position = 'fixed';
// newDiv.style.bottom = '10px';
// newDiv.style.right = '10px';
// newDiv.style.padding = '10px';
// newDiv.style.backgroundColor = 'rgba(0,0,0,0.7)';
// newDiv.style.color = 'white';
// newDiv.style.zIndex = '9999';
// newDiv.textContent = 'React Extension Content Script Active!';
// document.body.appendChild(newDiv);

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