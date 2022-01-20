import { useEffect } from 'react';
import { isUserAuthenticated } from './Services/auth';
import './App.css';

function App() {
  useEffect(() => {
    if(isUserAuthenticated()) {
      // Show data
    } else {
      // Request login credentials
    }
  }, []);

  return (
    <div className="App">
      <header>
        
      </header>
    </div>
  );
}

export default App;
