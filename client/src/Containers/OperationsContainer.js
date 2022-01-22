import { useEffect, useState } from 'react';
import API from '../Services/requests';
import Operations from '../Components/Operations';
import { api as apiConstants } from '../Config/constants';

function OperationsContainer() {
    const [operations, setOperations] = useState([]);

    useEffect(() => {
        fetchOperations();
    }, []);

    function _buildFiltersQueryString(filters) {
        let params = [];
        for(const key in filters) {
            const value = filters[key];
            if(value && value !== "") {
                params.push(`${key}=${value}`);
            }
        }
        const qs = params.join('&');

        return qs;
    }

    async function fetchOperations(filters = {}) {
        try {
            const qs = _buildFiltersQueryString(filters);
            const url = `${apiConstants.URL_OPERATIONS}?${qs}`;
            const {data} = await API.get(url);
            setOperations(data);
        } catch(err) {}
    }

    async function applyFilters(filters) {
        fetchOperations(filters);
    }

    return (
        <Operations 
            data={operations} 
            applyFilters={applyFilters}
        />
    )
}

export default OperationsContainer;