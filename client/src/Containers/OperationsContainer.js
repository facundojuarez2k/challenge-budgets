import { useEffect, useState } from 'react';
import API from '../Services/requests';
import Operations from '../Components/Operations';
import { api as apiConstants } from '../Config/constants';

function OperationsContainer() {
    const [operations, setOperations] = useState([]);
    const [isComponentMounted, setIsComponentMounted] = useState(true);
    let isFetching = false;

    useEffect(() => {        
        fetchOperations();
        
        return () => { setIsComponentMounted(false) };
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

    async function fetchOperations(filters = null) {
        let url = apiConstants.URL_OPERATIONS + "?limit=10";

        if(!isFetching) {
            if(filters !== null) {
                const qs = _buildFiltersQueryString(filters);
                url += "&" + qs;
            }

            isFetching = true;
    
            try {
                const {data} = await API.get(url);
                
                if(isComponentMounted)
                    setOperations(data);
    
            } catch(err) {

            } finally {
                if(isComponentMounted) 
                    isFetching = false;
            }
        }
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