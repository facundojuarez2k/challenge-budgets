import API from './requests';

import {ls, api, apiErrors} from '../Config/constants';

/* Map the errors array to an object containing a key-value pair where the key
    is the field name and the value is the error message
*/
function _validationArrayToObject(array) {
    let obj = {};

    array.forEach(field => {
        obj[field.param] = field.msg;
    });

    return obj;
}

export async function isUserAuthenticated() {    
    /* Test token */
    try {
        await API.get(api.URL_AUTH_TOKEN_TEST);
        return true;
    } catch(err) {
        if(err.response && err.response.status === 401) {
            localStorage.removeItem(ls.BEARER_TOKEN_KEY); // Remove invalid token
        }
        return false;
    }
}

export async function authenticateUser(credentials = {}) {
    const result = {
        success: false,
        errorMessage: "",
        invalidFields: {}
    };

    try {
        const {data} = await API.post(api.URL_AUTH_TOKEN, credentials);
        localStorage.setItem(ls.BEARER_TOKEN_KEY, data.token);
        result.success = true;
    } catch(err) {
        let msg = "Failed to authenticate";
        
        if(err.response && err.response.data) {
            msg = err.response.data.message;
            
            if(err.response.data.code === apiErrors.ERRCOD_VALIDATION && err.response.data.errors) {
                result.invalidFields = _validationArrayToObject(err.response.data.errors);
            }
        }

        result.errorMessage = msg;
    }

    return result;
}

export async function createUser(userInfo = {}) {
    const result = {
        success: false,
        loggedIn: false,
        errorMessage: "",
        invalidFields: {}
    };

    try {
        const { data } = await API.post(api.URL_USERS, userInfo);
        
        if(data && data.token) {
            localStorage.setItem(ls.BEARER_TOKEN_KEY, data.token);
            result.loggedIn = true;
        }
        result.success = true;

    } catch(err) {
        let msg = "Failed to create user";

        if(err.response && err.response.data) {
            msg = err.response.data.message;
            
            if(err.response.data.code === apiErrors.ERRCOD_VALIDATION && err.response.data.errors) {
                result.invalidFields = _validationArrayToObject(err.response.data.errors);
            }
        }

        result.errorMessage = msg;
    }
    
    return result;
}