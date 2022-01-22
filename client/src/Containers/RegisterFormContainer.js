import { useState } from 'react';
import { createUser } from '../Services/auth';
import RegisterForm from '../Components/RegisterForm';

function RegisterFormContainer({ onSuccess }) {
    const [errorMessage, setErrorMessage] = useState([]);
    const [invalidFields, setInvalidFields] = useState({});

    async function handleRegister(data) {
        setInvalidFields([]);
        try {
            const {success, loggedIn, errorMessage, invalidFields: _invalidFields} = await createUser(data);
            if(success) {
                onSuccess(loggedIn);
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