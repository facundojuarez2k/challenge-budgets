import { useState } from 'react';
import { authenticateUser } from '../Services/auth';
import LoginForm from '../Components/LoginForm';
import { useAuthContext } from '../Context/Auth';

function LoginFormContainer() {
    const { setIsLoggedIn, autoLogOff } = useAuthContext();
    const [errorMessage, setErrorMessage] = useState([]);
    const [invalidFields, setInvalidFields] = useState({});

    async function handleLogin(credentials) {
        setInvalidFields([]);
        try {
            const {success, expiration, errorMessage, invalidFields: _invalidFields} 
                = await authenticateUser(credentials);

            if(success) {
                const expiresIn = parseInt(expiration) - Date.now();

                setIsLoggedIn(true);
                
                if(expiresIn > 0) {
                    autoLogOff(expiresIn);
                }
            } else {
                setErrorMessage(errorMessage);
                setInvalidFields(_invalidFields);
            }
        } finally {}
    }

    return (    
        <LoginForm 
            onSubmit={ (credentials) => handleLogin(credentials) }
            invalidFields={invalidFields}
            errorMessage={errorMessage}
        />
    )
}

export default LoginFormContainer;