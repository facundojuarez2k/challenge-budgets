import { useEffect, useState } from 'react';
import API from '../Services/requests';
import { api } from '../Config/constants';

function OperationsContainer() {
    const [operations, setOperations] = useState([]);

    useEffect(() => {
        fetchOperations();
    }, []);

    async function fetchOperations() {
        try {
            const {data} = await API.get(api.URL_OPERATIONS);
            console.log(data);
        } catch(err) {
            // Handle error
        }
    }

    return (
        <div>Container</div>
    )
}

export default OperationsContainer;