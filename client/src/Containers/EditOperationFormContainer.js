import { useState, useEffect } from 'react';
import { updateOperation, fetchBalance } from '../Services/operations';
import EditOperationForm from '../Components/EditOperationForm';
import { useOperationsContext } from '../Context/Operations';

function EditOperationFormContainer({ operation = {}, onSuccess }) {
    const { setBalance } = useOperationsContext();
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
                
                fetchBalance().then(({balance, success}) => {
                    if(success) setBalance(balance)
                });
            }

            if(isComponentMounted) {
                setErrorMessage(errorMessage);
                setInvalidFields(invalidFields);
            }
        } catch(err) {}
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