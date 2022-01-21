import Form from './Form';

function LoginForm({onSubmit}) {
    const fields = {
        email: {
            type: "email",
            value: ""
        },
        password: {
            type: "password",
            value: ""
        },
    };

    return (
        <Form fields={fields} onSubmit={onSubmit} buttonText={"Login"} />
    );
}

export default LoginForm;