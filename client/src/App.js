import { useEffect, useState } from 'react';
import { isUserAuthenticated } from './Services/auth';
import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

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
