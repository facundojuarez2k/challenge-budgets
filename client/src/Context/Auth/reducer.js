import { 
    SET_IS_LOGGED_IN
} from './types';

export default (state, action) => {
    switch(action.type) {
        case SET_IS_LOGGED_IN:
            return {
                ...state,
                isLoggedIn: action.payload
            }
        default:
            return state;
    }
} 