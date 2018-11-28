import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';
import { clearErrorMessage } from '../actions/logIn';

const initialState = {
    token: null,
    userName: null,
    error: null,
    loading: false
};

const logInStart = ( state, action ) => {
    return updateObject( state, { error: null, loading: true } );
};

const logInSuccess = (state, action) => {
    return updateObject( state, { 
        token: action.idToken,
        userName: action.userName,
        error: null,
        loading: false
     } );
};

const logInFail = (state, action) => {
    return updateObject( state, {
        error: action.error,
        loading: false
    });
};

const logOutSuccess = (state, action) => {
    return updateObject( state, {
        token: null,
        userName: null,
        error: null,
        loading: false
     } );
};

const clearErrorMessageReducer = (state) => {
    console.log("clearErrorMessageReducer")
    return updateObject( state, {
        error: null
     } );
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.LOGIN_START: return logInStart(state, action);
        case actionTypes.LOGIN_SUCCESS: return logInSuccess(state, action);
        case actionTypes.LOGIN_FAIL: return logInFail(state, action);
        case actionTypes.LOGOUT: return logOutSuccess(state, action);
        case actionTypes.CLEAR_ERROR_MESSAGE: return clearErrorMessageReducer(state);
        default:
            return state;
    }
};

export default reducer;