import { useEffect, useState } from 'react';
import { isUserAuthenticated, authenticateUser } from './Services/auth';
import LoginForm from './Components/LoginForm';
import styles from './App.module.css';
import './Assets/css/styles.css';
import searchLogo from './Assets/images/magnifying-glass.png';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState("");

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

  async function handleLogin(credentials) {
    try {
      
      setLoginError("");
      const {success, errorMessage} = await authenticateUser(credentials);
      
      if(success) {
        setLoggedIn(true);
      } else {
        setLoginError(errorMessage);
      }

    } catch {}
  }

  return (
    <div className={styles.App}>
      <nav>
        <a href="#">Register operation</a>
        <div className={styles.search}>
          <input type="search" />
          <button><img src={searchLogo} /></button>
        </div>
      </nav>
      <main className="container">
        <div className="form-wrapper">
          <span className="title2">Sign in</span>
          <LoginForm onSubmit={(credentials) => handleLogin(credentials)} />
          {
            loginError !== "" 
            ?
            <div className={styles.errorBox}>{loginError}</div>
            : null
          }
        </div>
      </main>
    </div>
  );
}

export default App;
