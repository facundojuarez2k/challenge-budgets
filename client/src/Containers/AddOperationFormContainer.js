import { useState } from 'react';
import { createOperation } from '../Services/operations';
import AddOperationForm from '../Components/AddOperationForm';
import { useOperationsContext } from '../Context/Operations';

function AddOperationFormContainer() {
    const { addOperation } = useOperationsContext();
    const [errorMessage, setErrorMessage] = useState("");
    const [invalidFields, setInvalidFields] = useState({});

    async function onSubmitForm(data) {
        try {
            const {newOperation, success, errorMessage, invalidFields} = await createOperation(data);
            
            if(success) {
                addOperation(newOperation);
            }

            setErrorMessage(errorMessage);
            setInvalidFields(invalidFields);
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