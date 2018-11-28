import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    token: null,
    error: null,
    loading: false
};

const signUpStart = ( state, action ) => {
    return updateObject( state, { error: null, loading: true } );
};

const signUpSuccess = (state, action) => {
    return updateObject( state, { 
        token: action.idToken,
        error: null,
        loading: false
     } );
};

const signUpFail = (state, action) => {
    return updateObject( state, {
        error: action.error,
        loading: false
    });
};

// const authLogout = (state, action) => {
//     return updateObject(state, { token: null, userId: null });
// };

const clearErrorMessageReducer = (state) => {
    console.log("clearErrorMessageReducer signup")
    return updateObject( state, {
        error: null
     } );
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.SIGNUP_START: return signUpStart(state, action);
        case actionTypes.SIGNUP_SUCCESS: return signUpSuccess(state, action);
        case actionTypes.SIGNUP_FAIL: return signUpFail(state, action);
        case actionTypes.CLEAR_ERROR_MESSAGE: return clearErrorMessageReducer(state);
        default:
            return state;
    }
};

export default reducer;