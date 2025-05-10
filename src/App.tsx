import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [tabUrl, setTabUrl] = useState('');

  useEffect(() => {
    // Example of using chrome.tabs API (requires "tabs" or "activeTab" permission)
    if (chrome.tabs) { // Check if chrome.tabs is available
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (tabs && tabs.length > 0 && tabs[0].url) {
          setTabUrl(tabs[0].url);
        } else {
          setTabUrl("Could not retrieve current tab URL.");
        }
      });
    } else {
      setTabUrl("Chrome APIs not available in this context (e.g., regular web page).");
    }
  }, []);

  const sendMessageToBackground = () => {
    if (chrome.runtime && chrome.runtime.sendMessage) {
      chrome.runtime.sendMessage({ greeting: "hello from popup" }, (response) => {
        if (chrome.runtime.lastError) {
          console.error("Error sending message:", chrome.runtime.lastError.message);
        } else if (response) {
          console.log("Response from background:", response.farewell);
        }
      });
    } else {
      console.log("chrome.runtime.sendMessage not available.");
    }
  };

  return (
    <div className="App" style={{ width: '300px', padding: '15px' }}>
      <header className="App-header">
        <h1>React Chrome Extension</h1>
        <p>Current Tab URL:</p>
        <p style={{ wordBreak: 'break-all' }}>{tabUrl}</p>
        <button onClick={sendMessageToBackground}>
          Click Me
        </button>
      </header>
    </div>
  );
}

export default App
