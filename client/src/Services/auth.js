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