import { useState } from 'react';
import { createUser } from '../Services/auth';
import RegisterForm from '../Components/RegisterForm';
import { useAuthContext } from '../Context/Auth';

function RegisterFormContainer({ onSuccess }) {
    const { setIsLoggedIn, autoLogOff } = useAuthContext();
    const [errorMessage, setErrorMessage] = useState([]);
    const [invalidFields, setInvalidFields] = useState({});

    async function handleRegister(data) {
        setInvalidFields([]);
        try {
            const {success, loggedIn, expiration, errorMessage, invalidFields: _invalidFields} = await createUser(data);
            
            if(success) {
                const expiresIn = parseInt(expiration) - Date.now();

                onSuccess(loggedIn);
                setIsLoggedIn(loggedIn);
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
        <RegisterForm 
            onSubmit={ (data) => handleRegister(data) }
            invalidFields={invalidFields}
            errorMessage={errorMessage}
        />
    )
}

export default RegisterFormContainer;