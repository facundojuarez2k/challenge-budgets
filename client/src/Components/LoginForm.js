import {useState} from 'react';

function LoginForm({onSubmit}) {
    const [fields, setFields] = useState({
        email: {
            type: "email",
            value: ""
        },
        password: {
            type: "password",
            value: ""
        },
    });

    function handleSubmit(event) {
        event.preventDefault();
        
        const data = {};

        for(const key in fields) {
            data[key] = fields[key].value;
        }

        onSubmit(data);
    }

    function onInputChange(event) {
        const fieldKey = event.target.name;
        
        const updatedField = {
            ...fields[fieldKey],        // Copy field data
            value: event.target.value   // Update the value of the field
        }
        
        setFields(prevState => ({
            ...prevState,               // Copy all fields
            [fieldKey]: updatedField    // Update the field that changed
        }));
    }

    return (
        <form>
            {
                Object.keys(fields).map((fieldKey, index) => {
                    return (
                        <div key={index}>
                            <input
                                name={fieldKey}
                                type={fields[fieldKey].type} 
                                value={fields[fieldKey].value}
                                onChange={onInputChange}
                            />
                        </div>
                    )
                })
            }
            <button onClick={handleSubmit}>Enviar</button>
        </form>
    );
}

export default LoginForm;