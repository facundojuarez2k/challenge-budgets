import { useEffect, useState } from 'react';
import { isUserAuthenticated, authenticateUser } from './Services/auth';
import styles from './App.module.css';
import './Assets/css/styles.css';
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
    <div className={styles.App}>
      <header>

      </header>
      <main className="container">
        <div className="form-wrapper">
          <span>Sign in</span>
          <LoginForm onSubmit={(data) => console.log(data)} />
        </div>
      </main>
    </div>
  );
}

export default App;
