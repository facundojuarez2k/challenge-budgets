import {useState, useEffect} from 'react';
import styles from './styles.module.css';
import moment from 'moment';

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

    // Add field validation errors passed from the parent component
    useEffect(() => {
        if(invalidFields && (Object.keys(invalidFields).length > 0)) {
            setErrors(invalidFields);
        }
    }, [invalidFields]);

    useEffect(() => {
        handlePropsFields(propsFields);
    }, [propsFields]);

    function handlePropsFields() {
        const flds = {};
        
        for(const key in propsFields) {

            flds[key] = {...propsFields[key]}

            if(propsFields[key].type === "date") {  // Convert date to a format accepted by date input type
                flds[key].value = moment(propsFields[key].value, "YYYY-MM-DD").format("YYYY-MM-DD");
            }
        }
        setFields(flds);
    }

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
                    const field = fields[fieldKey];

                    if(field.type === "textarea") {
                        inputElement = (
                            <textarea
                                name={fieldKey}
                                value={field.value}
                                onChange={onInputChange}
                            />
                        );
                    } else if(field.type === "radio") {
                        inputElement = (
                            <div key={index}>
                                { 
                                    field.options.map((option, index) => {
                                        return (
                                            <div key={`option_${index}`} className={styles.radioButtonGroup}>
                                                <input
                                                    name={fieldKey}
                                                    type="radio"
                                                    value={option.value}
                                                    checked={field.value === option.value}
                                                    onChange={onInputChange}
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
                                type={field.type} 
                                value={field.value}
                                placeholder={field.placeholder}
                                onChange={onInputChange}
                            />
                        );
                    }

                    return (
                        <div key={index} className={styles.inputGroup}>

                            <label>{ field.label || fieldKey }</label>
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