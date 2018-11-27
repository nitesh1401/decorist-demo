import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

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


const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.LOGIN_START: return logInStart(state, action);
        case actionTypes.LOGIN_SUCCESS: return logInSuccess(state, action);
        case actionTypes.LOGIN_FAIL: return logInFail(state, action);
        default:
            return state;
    }
};

export default reducer;