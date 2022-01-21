import { useState } from 'react';
import { authenticateUser } from '../Services/auth';
import LoginForm from '../Components/LoginForm';

function LoginFormContainer({ onAuthenticated }) {
    const [loginErrors, setLoginErrors] = useState([]);

    async function handleLogin(credentials) {
        try {
            setLoginErrors([]);
            const {success, errorMessage} = await authenticateUser(credentials);

            if(success) {
                onAuthenticated();
            } else {
                setLoginErrors([errorMessage]);
            }
        } finally {}
    }

    return (
        <div>
            <LoginForm 
                onSubmit={ (credentials) => handleLogin(credentials) }
                errors={loginErrors}
            />
        </div>
    )
}

export default LoginFormContainer;