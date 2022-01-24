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
            logout();
        }
        return false;
    }
}

export async function authenticateUser(credentials = {}) {
    const result = {
        success: false,
        errorMessage: "",
        expiration: -1,
        invalidFields: {}
    };

    try {
        const {data} = await API.post(api.URL_AUTH_TOKEN, credentials);
        
        localStorage.setItem(ls.BEARER_TOKEN_KEY, data.token);
        localStorage.setItem(ls.BEARER_TOKEN_EXPIRATION, data.expiration);

        result.expiration = data.expiration;
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
        expiration: -1,
        errorMessage: "",
        invalidFields: {}
    };

    try {
        const { data } = await API.post(api.URL_USERS, userInfo);
        
        if(data && data.token) {
            localStorage.setItem(ls.BEARER_TOKEN_KEY, data.token);
            localStorage.setItem(ls.BEARER_TOKEN_EXPIRATION, data.expiration);

            result.expiration = data.expiration;
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

export function logout() {
    localStorage.removeItem(ls.BEARER_TOKEN_KEY);
    localStorage.removeItem(ls.BEARER_TOKEN_EXPIRATION);
}