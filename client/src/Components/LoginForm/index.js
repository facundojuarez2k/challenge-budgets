import Form from '../Form';

function LoginForm({onSubmit}) {
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
        <Form fields={fields} onSubmit={onSubmit} buttonText={"Login"} />
    );
}

export default LoginForm;