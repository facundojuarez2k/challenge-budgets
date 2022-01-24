import { 
    ADD_OPERATION, 
    REMOVE_OPERATION, 
    REMOVE_OPERATION_BY_ID,
    UPDATE_OPERATION_BY_ID, 
    ADD_MANY_OPERATIONS,
    SET_OPERATIONS,
    SET_BALANCE
} from './types';

export default (state, action) => {
    switch(action.type) {
        case ADD_OPERATION:
            return {
                ...state,
                operations: [action.payload, ...state.operations]
            }
        case REMOVE_OPERATION:
            return {
                ...state,
                operations: state.operations.filter(item => item !== action.payload)
            }
        case REMOVE_OPERATION_BY_ID:
            return {
                ...state,
                operations: state.operations.filter(item => item.id !== action.payload)
            }
        case UPDATE_OPERATION_BY_ID:
            return {
                ...state,
                operations: state.operations.map(item => {
                    return (item.id === action.payload.id) ? action.payload.item : item;
                })
            }
        case ADD_MANY_OPERATIONS:
            return {
                ...state,
                operations: [...state.operations, ...action.payload]
            }
        case SET_OPERATIONS:
            return {
                ...state,
                operations: [...action.payload]
            }
        case SET_BALANCE:
            return {
                ...state,
                balance: action.payload
            }
        default:
            return state;
    }
} 