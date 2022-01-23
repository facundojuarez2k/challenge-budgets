import { useState, useEffect } from 'react';
import { createOperation } from '../Services/operations';
import AddOperationForm from '../Components/AddOperationForm';
import { useOperationsContext } from '../Context/Operations';

function AddOperationFormContainer({ onSuccess }) {
    const [isComponentMounted, setIsComponentMounted] = useState(false);
    const { addOperation } = useOperationsContext();
    const [errorMessage, setErrorMessage] = useState("");
    const [invalidFields, setInvalidFields] = useState({});

    useEffect(() => {
        setIsComponentMounted(true);
        return () => { setIsComponentMounted(false) };
    }, []);

    async function onSubmitForm(data) {
        try {
            const {newOperation, success, errorMessage, invalidFields} = await createOperation(data);
            
            if(success) {
                addOperation(newOperation);
                onSuccess();
            }

            if(isComponentMounted) {
                setErrorMessage(errorMessage);
                setInvalidFields(invalidFields);
            }
        } catch(err) {}
    }

    return (
        <AddOperationForm 
            onSubmit={onSubmitForm}
            errorMessage={errorMessage}
            invalidFields={invalidFields}
        />
    )
}

export default AddOperationFormContainer;