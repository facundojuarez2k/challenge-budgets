import API from './requests';
import {ls, api, apiErrors} from '../Config/constants';
import { validationArrayToObject } from './utils';

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
                result.invalidFields = validationArrayToObject(err.response.data.errors);
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
                result.invalidFields = validationArrayToObject(err.response.data.errors);
            }
        }

        result.errorMessage = msg;
    }
    
    return result;
}