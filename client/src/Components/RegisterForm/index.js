import Form from '../Form';

function RegisterForm({ onSubmit, errorMessage, invalidFields }) {
    
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
            <h1>Sign up</h1>
            <Form 
                fields={fields} 
                onSubmit={onSubmit} 
                buttonText={"Register"} 
                invalidFields={invalidFields} 
            />
            {
                (errorMessage?.length > 0) && <div className="submit-errors">{errorMessage}</div>
            }
        </div>
    );
}

export default RegisterForm;