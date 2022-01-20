import {ls} from '../Config/constants';

export function isUserAuthenticated() {
    const bearerToken = localStorage.getItem(ls.BEARER_TOKEN_KEY);
    if(!bearerToken) {
        return false;
    }
    //Test token
}