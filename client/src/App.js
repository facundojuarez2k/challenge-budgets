import { useEffect } from 'react';
import { handleAuthentication } from './Services/auth';
import './App.css';

function App() {
  useEffect(() => {
    handleAuthentication();
  }, []);

  return (
    <div className="App">
      <header>
        
      </header>
    </div>
  );
}

export default App;
