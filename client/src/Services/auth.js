import API from './requests';
import {ls, api} from '../Config/constants';

export async function isUserAuthenticated() {    
    /* Test token */
    try {
        await API.get(api.URL_AUTH_TOKEN_TEST);
        return true;
    } catch(err) {
        if(err.response.status === 401) {
            localStorage.removeItem(ls.BEARER_TOKEN_KEY); // Remove invalid token
        }
        return false;
    }
}

export async function authenticateUser(credentials = {}) {
    try {
        const {data} = await API.post(api.URL_AUTH_TOKEN, credentials);
        
        localStorage.setItem(ls.BEARER_TOKEN_KEY, data.token);
        
        return {
            success: true
        };
    } catch(err) {
        let msg = "Failed to authenticate";
        
        if(err.response.status === 422 || err.response.status === 400)
            msg = err.response.data.message;
        
            return {
            success: false,
            errorMessage: msg
        };
    }
}