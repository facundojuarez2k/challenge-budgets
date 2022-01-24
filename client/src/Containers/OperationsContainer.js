import { useEffect, useState } from 'react';
import { fetchOperations, deleteOperation, fetchBalance } from '../Services/operations';
import Operations from '../Components/Operations';
import { useOperationsContext } from '../Context/Operations';

function OperationsContainer() {
    const { operations, setOperations, removeOperationById, balance, setBalance } = useOperationsContext();
    const [isComponentMounted, setIsComponentMounted] = useState(true);
    //const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {        
        _fetchOperations();
        _fetchBalance();
        return () => { setIsComponentMounted(false) };
    }, []);

    async function _fetchOperations(filters = null) {
        try {
            const {operations, success, errorMessage} = await fetchOperations(filters, 10);
            
            if(success) 
                setOperations(operations);

            // Alert error message
        } catch(err) {}
    }
    
    async function _fetchBalance() {
        try {
            const {balance, success, errorMessage} = await fetchBalance();
            
            if(success) 
                setBalance(balance);

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
            balance={balance}
        />
    )
}

export default OperationsContainer;