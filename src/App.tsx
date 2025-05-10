import { useEffect, useState } from 'react'
import './App.css'
import { Button } from './components/ui/button';
import { ListCheck, MessageCircle, Moon, QrCode, Sun, PlusCircle, XCircle } from 'lucide-react';
import { Textarea } from './components/ui/textarea';
import { Input } from './components/ui/input';
import { QRCodeSVG } from 'qrcode.react';

function App() {
  // const [tabUrl, setTabUrl] = useState('');
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });
  const [showAskInput, setShowAskInput] = useState(() => {
    return JSON.parse(localStorage.getItem('showAskInput') || 'false');
  });
  const [askInputValue, setAskInputValue] = useState(() => {
    return localStorage.getItem('askInputValue') || '';
  });

  const [showPollInput, setShowPollInput] = useState(() => {
    return JSON.parse(localStorage.getItem('showPollInput') || 'false');
  });
  const [pollQuestion, setPollQuestion] = useState(() => {
    return localStorage.getItem('pollQuestion') || '';
  });
  const [pollOptions, setPollOptions] = useState<string[]>(() => {
    const savedOptions = localStorage.getItem('pollOptions');
    return savedOptions ? JSON.parse(savedOptions) : ['', ''];
  });

  const [showQrCode, setShowQrCode] = useState(() => {
    return JSON.parse(localStorage.getItem('showQrCode') || 'false');
  });
  const [qrCodeValue, setQrCodeValue] = useState(() => {
    return localStorage.getItem('qrCodeValue') || '';
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('showAskInput', JSON.stringify(showAskInput));
  }, [showAskInput]);

  useEffect(() => {
    localStorage.setItem('askInputValue', askInputValue);
  }, [askInputValue]);

  useEffect(() => {
    localStorage.setItem('showPollInput', JSON.stringify(showPollInput));
  }, [showPollInput]);

  useEffect(() => {
    localStorage.setItem('pollQuestion', pollQuestion);
  }, [pollQuestion]);

  useEffect(() => {
    localStorage.setItem('pollOptions', JSON.stringify(pollOptions));
  }, [pollOptions]);

  useEffect(() => {
    localStorage.setItem('showQrCode', JSON.stringify(showQrCode));
  }, [showQrCode]);

  useEffect(() => {
    localStorage.setItem('qrCodeValue', qrCodeValue);
  }, [qrCodeValue]);

  // useEffect(() => {
  //   // Example of using chrome.tabs API (requires "tabs" or "activeTab" permission)
  //   if (chrome.tabs) { // Check if chrome.tabs is available
  //     chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  //       if (tabs && tabs.length > 0 && tabs[0].url) {
  //         setTabUrl(tabs[0].url);
  //       } else {
  //         setTabUrl("Could not retrieve current tab URL.");
  //       }
  //     });
  //   } else {
  //     setTabUrl("Chrome APIs not available in this context (e.g., regular web page).");
  //   }
  // }, []);

  // const sendMessageToBackground = () => {
  //   if (chrome.runtime && chrome.runtime.sendMessage) {
  //     chrome.runtime.sendMessage({ greeting: "hello from popup" }, (response) => {
  //       if (chrome.runtime.lastError) {
  //         console.error("Error sending message:", chrome.runtime.lastError.message);
  //       } else if (response) {
  //         console.log("Response from background:", response.farewell);
  //       }
  //     });
  //   } else {
  //     console.log("chrome.runtime.sendMessage not available.");
  //   }
  // };

  const handleAskClick = () => {
    setShowAskInput(true);
    setShowPollInput(false); // Ensure poll input is hidden
    setShowQrCode(false); // Ensure QR code is hidden
    // Optionally, you can still send a message or do other actions here
    // sendMessageToBackground(); 
  };

  const handlePollClick = () => {
    setShowPollInput(true);
    setShowAskInput(false); // Ensure ask input is hidden
    setShowQrCode(false); // Ensure QR code is hidden
  };

  const handlePollQuestionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPollQuestion(e.target.value);
  };

  const handlePollOptionChange = (index: number, value: string) => {
    const newOptions = [...pollOptions];
    newOptions[index] = value;
    setPollOptions(newOptions);
  };

  const addPollOption = () => {
    setPollOptions([...pollOptions, '']);
  };

  const removePollOption = (index: number) => {
    if (pollOptions.length > 2) { // Keep at least two options
      const newOptions = pollOptions.filter((_, i) => i !== index);
      setPollOptions(newOptions);
    }
  };

  const resetAndHideInputs = () => {
    setShowAskInput(false);
    setAskInputValue('');
    setShowPollInput(false);
    setPollQuestion('');
    setPollOptions(['', '']);
    setShowQrCode(false); // Reset QR code visibility
    setQrCodeValue('');   // Reset QR code value
    // Values will be persisted by their respective useEffect hooks
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="App w-[300px]">
      <header className="App-header relative">

        <div className="flex justify-between w-full items-center">
          <h1 className='text-base font-medium flex gap-2 items-center'>
            <QrCode className="h-6 w-6 text-muted-foreground" />
            Presenter QR
          </h1>
          <Button
            variant="outline"
            size="sm"
            onClick={toggleTheme}
          >
            {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>

        <div className="p-5">
          {/* <p>Current Tab URL:</p>
          <p style={{ wordBreak: 'break-all' }}>{tabUrl}</p> */}
          {showQrCode ? (
            <div className="my-5 grid grid-cols-1 gap-3 text-center">
              <p className='text-left text-muted-foreground text-xs'>Scan the QR code:</p>
              <div className="flex justify-center my-4">
                <QRCodeSVG value={qrCodeValue} size={180} bgColor={"#ffffff"} fgColor={"#000000"} level={"L"} includeMargin={false} />
              </div>
              <Button variant="ghost" onClick={() => {
                navigator.clipboard.writeText(qrCodeValue);
              }}>Copy Link</Button>
              <Button variant="default" onClick={resetAndHideInputs}>Done</Button>
            </div>
          ) : !showAskInput && !showPollInput ? (
            <div className="my-5 grid grid-cols-1 gap-3">
              <p className='text-left text-muted-foreground text-xs'>Pick an option you want to create:</p>
              <Button variant="default" className='w-full flex items-center' onClick={handleAskClick}>
                <MessageCircle className="h-4 w-4 mr-2" />Ask
              </Button>
              <Button variant="secondary" className='w-full flex items-center' onClick={handlePollClick}>
                <ListCheck className="h-4 w-4 mr-2" />Poll
              </Button>
            </div>
          ) : showAskInput ? (
            <div className="my-5 grid grid-cols-1 gap-3">
              <p className='text-left text-muted-foreground text-xs'>Enter your question:</p>
              <Textarea
                placeholder="Type your question here."
                value={askInputValue}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setAskInputValue(e.target.value)}
              />
              {/* You can add a submit button for the textarea here if needed */}
              <Button variant="default" onClick={() => {
                console.log(askInputValue);
                setQrCodeValue(JSON.stringify({ type: 'ask', question: askInputValue }));
                setShowAskInput(false);
                setAskInputValue(''); // Clear input after setting QR value
                setShowQrCode(true);
                /* TODO: Send message */
              }}>Submit Question</Button>
              <Button variant="secondary" onClick={resetAndHideInputs}>Cancel</Button>
            </div>
          ) : showPollInput ? (
            <div className="my-5 grid grid-cols-1 gap-3">
              <p className='text-left text-muted-foreground text-xs'>Enter your poll question:</p>
              <Textarea
                placeholder="Type your poll question here."
                value={pollQuestion}
                onChange={handlePollQuestionChange}
              />
              <p className='text-left text-muted-foreground text-xs'>Poll options:</p>
              {pollOptions.map((option, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    type="text"
                    placeholder={`Option ${index + 1}`}
                    value={option}
                    onChange={(e) => handlePollOptionChange(index, e.target.value)}
                  />
                  {pollOptions.length > 2 && (
                    <Button variant="ghost" size="sm" onClick={() => removePollOption(index)}>
                      <XCircle className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={addPollOption} className="flex items-center gap-2">
                <PlusCircle className="h-4 w-4" /> Add Option
              </Button>
              <Button variant="default" onClick={() => {
                const activeOptions = pollOptions.filter(opt => opt.trim() !== '');
                console.log({ pollQuestion, options: activeOptions });
                setQrCodeValue(JSON.stringify({ type: 'poll', question: pollQuestion, options: activeOptions }));
                setShowPollInput(false);
                setPollQuestion(''); // Clear inputs after setting QR value
                setPollOptions(['', '']);
                setShowQrCode(true);
                /* TODO: Send message */
              }}>Submit Poll</Button>
              <Button variant="secondary" onClick={resetAndHideInputs}>Cancel</Button>
            </div>
          ) : null}
          {!showQrCode && ( // Only show "how to use" if QR is not visible
            <div>
              <p className='text-left text-muted-foreground text-xs'>Don't know how to use? Click <a href="https://example.com" className='text-blue-500'>here</a></p>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App
