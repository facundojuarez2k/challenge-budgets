import API from './requests';
import { api, apiErrors } from '../Config/constants';
import { validationArrayToObject } from './utils';

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

export async function fetchOperations(filters = null, limit=10) {
    const result = {
        operations: [],
        success: false,
        errorMessage: "",
    };
    let url = api.URL_OPERATIONS + "?limit=" + limit;

    if(filters !== null) {
        const qs = _buildFiltersQueryString(filters);
        url += "&" + qs;
    }

    try {
        const {data} = await API.get(url);
        result.success = true;
        result.operations = data;
    } catch(err) {
        let msg = "Failed to fetch operations";
        
        if(err.response && err.response.data) {
            msg = err.response.data.message;
        }
        result.errorMessage = msg;
    }

    return result;
}

export async function createOperation(formData) {
    const result = {
        newOperation: null,
        success: false,
        errorMessage: "",
        invalidFields: {}
    };

    try {
        const { data } = await API.post(api.URL_OPERATIONS, formData);
        result.success = true;
        result.newOperation = data;
    } catch(err) {
        let msg = "Failed to create operation";
        
        if(err.response && err.response.data) {
            msg = err.response.data.message;
            
            if(err.response.data.code === apiErrors.ERRCOD_VALIDATION && err.response.data.errors) {
                result.invalidFields = validationArrayToObject(err.response.data.errors);
            }
        }

        result.errorMessage = msg;
    }

    return result;
}

export async function updateOperation(id, formData) {
    const result = {
        updatedOperation: null,
        success: false,
        errorMessage: "",
        invalidFields: {}
    };

    try {
        const { data } = await API.put(`${api.URL_OPERATIONS}/${id}`, formData);
        result.success = true;
        result.updatedOperation = data;
    } catch(err) {
        let msg = "Failed to update operation";
        
        if(err.response && err.response.data) {
            msg = err.response.data.message;
            
            if(err.response.data.code === apiErrors.ERRCOD_VALIDATION && err.response.data.errors) {
                result.invalidFields = validationArrayToObject(err.response.data.errors);
            }
        }

        result.errorMessage = msg;
    }

    return result;
}

export async function deleteOperation(id) {
    const result = {
        success: false,
        errorMessage: ""
    };

    try {
        const res = await API.delete(`${api.URL_OPERATIONS}/${id}`);
        result.success = true;
    } catch(err) {
        let msg = "Failed to delete operation";
        
        if(err.response && err.response.data) {
            msg = err.response.data.message;
        }

        result.errorMessage = msg;
    }

    return result;
}

export async function fetchBalance() {
    const result = {
        success: false,
        balance: null,
        errorMessage: ""
    };

    try {
        const {data} = await API.get(api.URL_OPERATIONS_BALANCE);
        result.balance = data;
        result.success = true;
    } catch(err) {
        let msg = "Failed to fetch balance";
        
        if(err.response && err.response.data) {
            msg = err.response.data.message;
        }

        result.errorMessage = msg;
    }

    return result;
}