import { useEffect, useState } from 'react';
import { fetchOperations } from '../Services/operations';
import Operations from '../Components/Operations';
import { useOperationsContext } from '../Context/Operations';

function OperationsContainer() {
    const { operations, setOperations } = useOperationsContext();
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

    return (
        <Operations 
            data={operations} 
            applyFilters={applyFilters}
        />
    )
}

export default OperationsContainer;