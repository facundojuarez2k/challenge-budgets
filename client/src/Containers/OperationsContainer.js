import { useEffect, useState } from 'react';
import API from '../Services/requests';
import Operations from '../Components/Operations';
import { api as apiConstants } from '../Config/constants';

function OperationsContainer() {
    const [operations, setOperations] = useState([]);

    useEffect(() => {
        fetchOperations();
    }, []);

    async function fetchOperations() {
        try {
            const {data} = await API.get(apiConstants.URL_OPERATIONS);
            setOperations(data);
        } catch(err) {
            // Handle error
        }
    }

    return (
        <Operations data={operations} />
    )
}

export default OperationsContainer;