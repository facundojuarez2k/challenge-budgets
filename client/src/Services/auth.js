import axios from 'axios';
import {ls, api} from '../Config/constants';

export async function isUserAuthenticated() {
    const bearerToken = localStorage.getItem(ls.BEARER_TOKEN_KEY);
    if(!bearerToken) {
        //return false;
    }
    //Test token
    try {
        const res = await axios.get(api.URL_AUTH_TOKEN_TEST, {
            headers: { Authorization: `Bearer ${bearerToken}` }
        });
        return true;
    } catch(err) {
        console.log(err);
    }
}