import API from './requests';
import { api, apiErrors } from '../Config/constants';
import { validationArrayToObject } from './utils';

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