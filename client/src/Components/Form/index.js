import {useState, useEffect} from 'react';
import styles from './styles.module.css';

function Form({fields: propsFields = {}, onSubmit, buttonText}) {
    const [fields, setFields] = useState({});

    useEffect(() => {
        setFields(Object.assign(propsFields));
    }, [propsFields]);

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
        <form className={styles.form}>
            {
                fields && Object.keys(fields).map((fieldKey, index) => {
                    return (
                        <div key={index} className={styles.inputGroup}>

                            <label>{ fields[fieldKey].label || fieldKey }</label>
                            
                            {
                                fields[fieldKey].type === "textarea" 
                                ?
                                <textarea
                                    name={fieldKey}
                                    value={fields[fieldKey].value}
                                    onChange={onInputChange}
                                />
                                :
                                <input
                                    name={fieldKey}
                                    type={fields[fieldKey].type} 
                                    value={fields[fieldKey].value}
                                    placeholder={fields[fieldKey].placeholder}
                                    onChange={onInputChange}
                                />
                            }

                        </div>
                    )
                })
            }
            <button onClick={handleSubmit}>{buttonText || "Send"}</button>
        </form>
    );
}

export default Form;