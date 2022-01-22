import { useState, useEffect } from 'react';
import Form from '../Form';
import styles from './styles.module.css';

function LoginForm({ onSubmit, errors = [] }) {
    const [errorList, setErrorList] = useState(null);

    useEffect(() => {
        if(errors && errors.length > 0) {
            setErrorList(
                <div className="submit-errors">
                    {
                        errors.map((errMsg, index) => <span key={index}>{errMsg}</span>)
                    }
                </div>
            );
        } else {
            setErrorList(null);
        }
    }, [errors]);

    const fields = {
        email: {
            type: "email",
            placeholder: "Email",
            label: "Email",
            required: true,
            value: ""
        },
        password: {
            type: "password",
            placeholder: "Password",
            label: "Password",
            required: true,
            value: ""
        },
    };

    return (
        <div className="form-wrapper">
            <h1>Sign in</h1>
            <Form fields={fields} onSubmit={onSubmit} buttonText={"Login"} />
            {errorList}
        </div>
    );
}

export default LoginForm;