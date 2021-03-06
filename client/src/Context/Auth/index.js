import { createContext, useContext, useReducer } from 'react';
import AuthReducer from './reducer';
import { SET_IS_LOGGED_IN } from './types';

const initialState = {
    isLoggedIn: false,
}

export const AuthContext = createContext(initialState);

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, initialState);

    function setIsLoggedIn(value) {
        dispatch({
            type: SET_IS_LOGGED_IN,
            payload: value
        });
    }

    function autoLogOff(time) {
        setTimeout(() => dispatch({
            type: SET_IS_LOGGED_IN,
            payload: false
        }), time);
    }

   return(
        <AuthContext.Provider 
            value = {
                {
                    isLoggedIn: state.isLoggedIn,
                    setIsLoggedIn,
                    autoLogOff
                }
            }
        > 
            {children} 
        </AuthContext.Provider>
   )
}

export const useAuthContext = () => {
    return useContext(AuthContext);
}