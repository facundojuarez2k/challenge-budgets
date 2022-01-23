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

                    let inputElement;
                    const fieldType = fields[fieldKey].type;

                    if(fieldType === "textarea") {
                        inputElement = (
                            <textarea
                                name={fieldKey}
                                value={fields[fieldKey].value}
                                onChange={onInputChange}
                            />
                        );
                    } else if(fieldType === "radio") {
                        inputElement = (
                            <div key={index} onChange={onInputChange}>
                                { 
                                    fields[fieldKey].options.map((option, index) => {
                                        return (
                                            <div key={`option_${index}`} className={styles.radioButtonGroup}>
                                                <input
                                                    name={fieldKey}
                                                    type="radio"
                                                    value={option.value}
                                                    defaultChecked={index===0}
                                                />
                                                <label>{option.label}</label>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        )
                    } else {
                        inputElement = (
                            <input
                                name={fieldKey}
                                type={fields[fieldKey].type} 
                                value={fields[fieldKey].value}
                                placeholder={fields[fieldKey].placeholder}
                                onChange={onInputChange}
                            />
                        );
                    }

                    return (
                        <div key={index} className={styles.inputGroup}>

                            <label>{ fields[fieldKey].label || fieldKey }</label>
                            {inputElement}
                            
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