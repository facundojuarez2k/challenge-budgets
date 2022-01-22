import { useState } from 'react';
import { authenticateUser } from '../Services/auth';
import LoginForm from '../Components/LoginForm';

function LoginFormContainer({ onAuthenticated }) {
    const [errorMessage, setErrorMessage] = useState([]);
    const [invalidFields, setInvalidFields] = useState({});

    async function handleLogin(credentials) {
        setInvalidFields([]);
        try {
            const {success, errorMessage, invalidFields: _invalidFields} = await authenticateUser(credentials);

            if(success) {
                onAuthenticated();
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