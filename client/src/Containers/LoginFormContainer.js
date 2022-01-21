import { useState } from 'react';
import { authenticateUser } from '../Services/auth';
import LoginForm from '../Components/LoginForm';

function LoginFormContainer({ onAuthenticated }) {
    const [loginErrors, setLoginErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    async function handleLogin(credentials) {
        try {
            //setIsLoading(true);
            setLoginErrors([]);
            const {success, errorMessage} = await authenticateUser(credentials);

            if(success) {
                onAuthenticated();
            } else {
                setLoginErrors([errorMessage]);
                //setIsLoading(false);
            }
        } finally {}
    }

    return (
        <div>
            {
                isLoading ? <div>Loading..</div> :
                <LoginForm 
                    onSubmit={ (credentials) => handleLogin(credentials) }
                    errors={loginErrors}
                />
            }
        </div>
    )
}

export default LoginFormContainer;