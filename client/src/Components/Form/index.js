import {useState, useEffect} from 'react';
import styles from './styles.module.css';

function Form({ fields: propsFields = {}, onSubmit, buttonText, invalidFields }) {
    const [isComponentMounted, setIsComponentMounted] = useState(false);
    const [fields, setFields] = useState({});
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Prevent async functions from updating state after the component is unmounted
    useEffect(() => {
        setIsComponentMounted(true);
        return () => { setIsComponentMounted(false) };
    }, []);

    useEffect(() => {
        setFields(Object.assign(propsFields));
    }, [propsFields]);

    // Add field validation errors passed from the parent component
    useEffect(() => {
        if(invalidFields && (Object.keys(invalidFields).length > 0)) {
            setErrors(invalidFields);
        }
    }, [invalidFields]);

    async function handleSubmit(event) {
        event.preventDefault();
        
        if(validateFields()) {
            const data = {};

            for(const key in fields) {
                data[key] = fields[key].value;
            }
            
            setIsSubmitting(true);
            
            await onSubmit(data);
            
            if(isComponentMounted)
                setIsSubmitting(false);
        }
    }

    function validateFields() {
        const _invalidFields = {};
        let invalidCount = 0;

        for(const key in fields) {
            if(fields[key].required === true && fields[key].value === "") {
                _invalidFields[key] = "This field is required";
                invalidCount++;
            } else {
                _invalidFields[key] = "";
            }
        }
        setErrors(_invalidFields);
        
        return invalidCount === 0;
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
                            {
                                (errors[fieldKey] && errors[fieldKey].length > 0)
                                ?
                                <span className={styles.errors}>{errors[fieldKey]}</span>
                                :
                                null
                            }
                        </div>
                    )
                })
            }
            { 
                isSubmitting 
                ?
                <button disabled>...</button>
                :
                <button onClick={handleSubmit}>{buttonText || "Send"}</button>
            }
        </form>
    );
}

export default Form;