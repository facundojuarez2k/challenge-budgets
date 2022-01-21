import Form from '../Form';

function LoginForm({onSubmit}) {
    const fields = {
        email: {
            type: "email",
            placeholder: "Email",
            value: ""
        },
        password: {
            type: "password",
            placeholder: "Password",
            value: ""
        },
    };

    return (
        <Form fields={fields} onSubmit={onSubmit} buttonText={"Login"} />
    );
}

export default LoginForm;