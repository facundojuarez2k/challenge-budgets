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
        } catch(err) {}
    }
    
    async function _fetchBalance() {
        try {
            const {balance, success} = await fetchBalance();
            
            if(success) setBalance(balance);
        } catch(err) {}
    }


    function applyFilters(filters) {
        _fetchOperations(filters);
    }

    async function onDeleteOperation(instance) {
        try {
            const {success, errorMessage} = await deleteOperation(instance.id);
            if(success) {
                removeOperationById(instance.id);
                _fetchBalance();
            } else {
                console.log(errorMessage);
            }
        } catch(err) {}
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