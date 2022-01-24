import { useState } from 'react';
import { authenticateUser } from '../Services/auth';
import LoginForm from '../Components/LoginForm';
import { useAuthContext } from '../Context/Auth';

function LoginFormContainer() {
    const { setIsLoggedIn } = useAuthContext();
    const [errorMessage, setErrorMessage] = useState([]);
    const [invalidFields, setInvalidFields] = useState({});

    async function handleLogin(credentials) {
        setInvalidFields([]);
        try {
            const {success, errorMessage, invalidFields: _invalidFields} = await authenticateUser(credentials);

            if(success) {
                setIsLoggedIn(true);
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