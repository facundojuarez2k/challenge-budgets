import axios from 'axios';
import { ls, api } from '../Config/constants';

const API = axios.create({
  baseURL: `${api.URL_BASE}`,
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/* Add bearer token to the request */
API.interceptors.request.use((config) => {
    const bearerToken = localStorage.getItem(ls.BEARER_TOKEN_KEY);

    console.log("Token: ", bearerToken)

    if(bearerToken) {
        config.headers.Authorization = `Bearer ${bearerToken}`;
    } else {
        delete API.defaults.headers.common.Authorization;
    }

    return config;
  },
  (err) => Promise.reject(err)
);

export default API;