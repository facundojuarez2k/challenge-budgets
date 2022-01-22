import Form from '../Form';

function LoginForm({ onSubmit, errorMessage, invalidFields = {} }) {

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
            <Form 
                fields={fields} 
                onSubmit={onSubmit} 
                buttonText={"Login"} 
                invalidFields={invalidFields}
            />
            {
                (errorMessage?.length > 0) && <div className="submit-errors">{errorMessage}</div>
            }
        </div>
    );
}

export default LoginForm;