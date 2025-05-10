import { useEffect, useState } from 'react'
import './App.css'
import { Button } from './components/ui/button';
import { Moon, Sun } from 'lucide-react';

function App() {
  const [tabUrl, setTabUrl] = useState('');
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

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

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="App" style={{ width: '300px' }}>
      <header className="App-header" style={{ position: 'relative' }}>
        <Button
          variant="outline"
          size="sm"
          onClick={toggleTheme}
          style={{ position: 'absolute', top: 0, right: 0 }}
        >
          {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          <span className="sr-only">Toggle theme</span>
        </Button>
        <h1>React Chrome Extension</h1>
        <p>Current Tab URL:</p>
        <p style={{ wordBreak: 'break-all' }}>{tabUrl}</p>
        <Button onClick={sendMessageToBackground}>
          Click Me
        </Button>
      </header>
    </div>
  );
}

export default App
