import { useEffect, useState } from 'react';
import API from '../Services/requests';
import { createOperation, updateOperation } from '../Services/operations';
import Operations from '../Components/Operations';
import { api as apiConstants } from '../Config/constants';
import { OperationsContext } from '../Context/Operations';

function OperationsContainer() {
    const [operations, setOperations] = useState([]);
    const [isComponentMounted, setIsComponentMounted] = useState(true);
    const [addOperationFormProps, setAddOperationFormProps] = useState({
        onSubmit: (data) => addOperation(data),
        errorMessage: "", 
        invalidFields: {}
    });
    const [editOperationFormProps, setEditOperationFormProps] = useState({
        onSubmit: (id, data) => editOperation(id, data),
        errorMessage: "", 
        invalidFields: {},
        currentValues: {}
    });
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

    async function addOperation(data) {
        try {
            const {newOperation, success, errorMessage, invalidFields} = await createOperation(data);
            
            if(success) {
                setOperations(prev => {
                    const newArray = prev.slice(0, prev.length-1);  // Copy all elements except the last one
                    newArray.unshift(newOperation);                 // Insert new element at the start of the array
                    return newArray;
                });
            }

            setAddOperationFormProps(prev => {
                return {
                    ...prev,
                    errorMessage,
                    invalidFields
                }
            });
        } catch(err) {}
    }

    async function editOperation(id, data) {
        try {
            const {updatedOperation, success, errorMessage, invalidFields} = await updateOperation(id, data);
            
            if(success) {
                setOperations(prev => prev.map(function(op) {
                    return (op.id === id) ? updatedOperation : op
                }));
            }

            setEditOperationFormProps(prev => {
                return {
                    ...prev,
                    errorMessage,
                    invalidFields
                }
            });
        } catch(err) {}
    }

    return (
        <Operations 
            data={operations} 
            applyFilters={applyFilters}
            addOperationFormProps={addOperationFormProps}
            editOperationFormProps={editOperationFormProps}
        />
    )
}

export default OperationsContainer;