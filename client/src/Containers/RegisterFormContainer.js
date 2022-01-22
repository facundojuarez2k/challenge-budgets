import { useState } from 'react';
import { authenticateUser } from '../Services/auth';
import API from '../Services/requests';
import RegisterForm from '../Components/RegisterForm';
import { api } from '../Config/constants';

function RegisterFormContainer({ onAuthenticated }) {
    const [loginErrors, setLoginErrors] = useState([]);

    async function handleRegister(data) {
        try {
            setLoginErrors([]);
            const res = await API.post(api.URL_USERS, data)

            console.log(res);
        } catch(error) {
            console.log(error)
        }
    }

    return (
        <div>
            <RegisterForm 
                onSubmit={ (data) => handleRegister(data) }
                errors={loginErrors}
            />
        </div>
    )
}

export default RegisterFormContainer;