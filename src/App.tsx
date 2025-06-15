import './App.css'
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

function App() {

  return (
    <div className="App w-[270px]">
      <header className="App-header relative">
        <div className="flex flex-col w-full gap-2">
          <div className="flex justify-between items-center space-x-2">
            <Label htmlFor="theme-mode">Toggle Dark Mode</Label>
            <Switch id="theme-mode" />
          </div>
        </div>
      </header>
    </div>
  );
}

export default App
