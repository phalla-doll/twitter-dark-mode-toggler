import { useEffect, useState } from 'react'
import './App.css'
import { Button } from './components/ui/button';
import { Moon, QrCode, Sun } from 'lucide-react';

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
    <div className="App w-[300px]">
      <header className="App-header relative">

        <div className="flex justify-between w-full items-center">
          <h1 className='text-base font-medium flex gap-2 items-center'><QrCode className="h-6 w-6 text-muted-foreground" />Presenter QR</h1>
          <Button
            variant="outline"
            size="sm"
            onClick={toggleTheme}
          >
            {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>

        <div className="p-7">
          {/* <p>Current Tab URL:</p>
          <p style={{ wordBreak: 'break-all' }}>{tabUrl}</p> */}
          <div className="my-8 grid grid-cols-1 gap-3">
            <p className='text-left text-muted-foreground text-xs'>Pick an option you want to create:</p>
            <Button variant="default" className='w-full' onClick={sendMessageToBackground}>
              Ask
            </Button>
            <Button variant="secondary" className='w-full' onClick={sendMessageToBackground}>
              Poll
            </Button>
          </div>
          <div>
            <p className='text-left text-muted-foreground text-xs'>Don't know how to use? Click <a href="https://example.com" className='text-blue-500'>here</a></p>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App
