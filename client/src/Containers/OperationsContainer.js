import { useEffect, useState } from 'react';
import { fetchOperations, deleteOperation } from '../Services/operations';
import Operations from '../Components/Operations';
import { useOperationsContext } from '../Context/Operations';

function OperationsContainer() {
    const { operations, setOperations, removeOperationById } = useOperationsContext();
    const [isComponentMounted, setIsComponentMounted] = useState(true);
    //const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {        
        fetch();
        return () => { setIsComponentMounted(false) };
    }, []);

    async function fetch(filters = null) {
        try {
            const {operations, success, errorMessage} = await fetchOperations(filters, 10);
            
            if(success) 
                setOperations(operations);

            // Alert error message
        } catch(err) {}
    }

    function applyFilters(filters) {
        fetch(filters);
    }

    async function onDeleteOperation(instance) {
        try {
            const {success, errorMessage} = await deleteOperation(instance.id);
            if(success)
                removeOperationById(instance.id);

            // Alert error message
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <Operations 
            data={operations} 
            applyFilters={applyFilters}
            onDeleteOperation={onDeleteOperation}
        />
    )
}

export default OperationsContainer;