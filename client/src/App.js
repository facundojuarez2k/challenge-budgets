import { useEffect, useState } from 'react';
import { isUserAuthenticated, authenticateUser } from './Services/auth';
import './App.css';
import LoginForm from './Components/LoginForm';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    init();
  }, []);

  async function init() {
    /*if(await isUserAuthenticated()) {
      // Request data
    } else {
      // Show login form
      authenticateUser({email: "facu.j.94@gmail.com", password: "audioslave1234"});
    }*/
  }

  return (
    <div className="App">
      <header>

      </header>
      <div>
        <LoginForm onSubmit={(data) => console.log(data)} />
      </div>
    </div>
  );
}

export default App;
