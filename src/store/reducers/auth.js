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

const logOutSuccess = (state, action) => {
    return updateObject( state, {
        status: null,
        token: null,
        userName: null,
        error: null,
        loading: false
     } );
};

const clearErrorMessageReducer = (state) => {
    return updateObject( state, {
        error: null
     } );
}

const resetPasswordStart = ( state, action ) => {
    return updateObject( state, { error: null, loading: true } );
};

const resetPasswordSuccess = (state, action) => {
    return updateObject( state, {
        status: action.status,
        error: null,
        loading: false
     } );
};

const resetPasswordFail = (state, action) => {
    return updateObject( state, {
        error: action.error,
        loading: false
    });
};

const confirmPasswordSuccess = (state, action) => {
    return updateObject( state, {
        status: action.status,
        error: null,
        loading: false
    });
}

const confirmPasswordFail = (state, action) => {
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
        case actionTypes.LOGOUT: return logOutSuccess(state, action);
        case actionTypes.CLEAR_ERROR_MESSAGE: return clearErrorMessageReducer(state);

        case actionTypes.SIGNUP_START: return signUpStart(state, action);
        case actionTypes.SIGNUP_SUCCESS: return signUpSuccess(state, action);
        case actionTypes.SIGNUP_FAIL: return signUpFail(state, action);

        case actionTypes.RESET_PASSWORD_START: return resetPasswordStart(state, action);
        case actionTypes.RESET_PASSWORD_SUCCESS: return resetPasswordSuccess(state, action);
        case actionTypes.RESET_PASSWORD_FAIL: return resetPasswordFail(state, action);
        case action.CONFIRM_PASSWORD_SUCCESS: return confirmPasswordSuccess(state, action);
        case action.CONFIRM_PASSWORD_FAIL: return confirmPasswordFail(state, action);
        default:
            return state;
    }
};

export default reducer;