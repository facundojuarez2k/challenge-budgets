import { 
    ADD_OPERATION, 
    REMOVE_OPERATION, 
    REMOVE_OPERATION_BY_ID,
    UPDATE_OPERATION_BY_ID, 
    ADD_MANY_OPERATIONS,
    SET_OPERATIONS
} from './types';

export default (state, action) => {
    switch(action.type) {
        case ADD_OPERATION:
            return {
                operations: [action.payload, ...state.operations]
            }
        case REMOVE_OPERATION:
            return {
                operations: state.operations.filter(item => item !== action.payload)
            }
        case REMOVE_OPERATION_BY_ID:
            return {
                operations: state.operations.filter(item => item.id !== action.payload)
            }
        case UPDATE_OPERATION_BY_ID:
            return {
                operations: state.operations.map(item => {
                    return (item.id === action.payload.id) ? action.payload.item : item;
                })
            }
        case ADD_MANY_OPERATIONS:
            return {
                operations: [...state.operations, ...action.payload.items]
            }
        case SET_OPERATIONS:
            return {
                operations: [...action.payload]
            }
        default:
            return state;
    }
} 