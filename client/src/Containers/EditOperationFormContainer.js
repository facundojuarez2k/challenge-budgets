import { useState, useEffect } from 'react';
import { updateOperation } from '../Services/operations';
import EditOperationForm from '../Components/EditOperationForm';
import { useOperationsContext } from '../Context/Operations';

function EditOperationFormContainer({ operation = {}, onSuccess }) {
    const [isComponentMounted, setIsComponentMounted] = useState(false);
    const { updateOperationById: contextUpdateOperationById } = useOperationsContext();
    const [errorMessage, setErrorMessage] = useState("");
    const [invalidFields, setInvalidFields] = useState({});

    useEffect(() => {
        setIsComponentMounted(true);
        return () => { setIsComponentMounted(false) };
    }, []);

    async function onSubmitForm(data) {
        try {
            const {updatedOperation, success, errorMessage, invalidFields} 
                = await updateOperation(operation.id, data);
            
            if(success) {
                contextUpdateOperationById(operation.id, updatedOperation);
                onSuccess();
            }

            if(isComponentMounted) {
                setErrorMessage(errorMessage);
                setInvalidFields(invalidFields);
            }
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <EditOperationForm
            instance={operation}
            onSubmit={onSubmitForm}
            errorMessage={errorMessage}
            invalidFields={invalidFields}
        />
    )
}

export default EditOperationFormContainer;