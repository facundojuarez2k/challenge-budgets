import { createContext, useContext, useReducer } from 'react';
import OperationsReducer from './reducer';
import { 
    ADD_OPERATION, 
    REMOVE_OPERATION, 
    REMOVE_OPERATION_BY_ID,
    UPDATE_OPERATION_BY_ID, 
    ADD_MANY_OPERATIONS,
    SET_OPERATIONS,
    SET_BALANCE
} from './types';

const initialState = {
    operations : [],
    balace: null,
}

export const OperationsContext = createContext(initialState);

export const OperationsProvider = ({ children }) => {
    const [state, dispatch] = useReducer(OperationsReducer, initialState);

    function addOperation(item) {
        dispatch({
            type: ADD_OPERATION,
            payload: item
        });
    }

    function removeOperation(item) {
        dispatch({
            type: REMOVE_OPERATION,
            payload: item
        });
    }

    function removeOperationById(id) {
        dispatch({
            type: REMOVE_OPERATION_BY_ID,
            payload: id
        });
    }

    function updateOperationById(id, item) {
        dispatch({
            type: UPDATE_OPERATION_BY_ID,
            payload: {id, item}
        });
    }

    function addManyOperations(items) {
        dispatch({
            type: ADD_MANY_OPERATIONS,
            payload: items
        });
    }

    function setOperations(items) {
        dispatch({
            type: SET_OPERATIONS,
            payload: items
        });
    }

    function setBalance(value) {
        dispatch({
            type: SET_BALANCE,
            payload: value
        });
    }

   return(
        <OperationsContext.Provider 
            value = {
                {
                    operations : state.operations,
                    balance: state.balance, 
                    addOperation,
                    removeOperation,
                    removeOperationById,
                    updateOperationById,
                    addManyOperations,
                    setOperations,
                    setBalance
                }
            }
        > 
            {children} 
        </OperationsContext.Provider>
   )
}

export const useOperationsContext = () => {
    return useContext(OperationsContext);
}