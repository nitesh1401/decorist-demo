import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    status: null,
    error: null,
    loading: false
};

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

const confirmPasswordSuccess = (state, action) => {
    return updateObject( state, {
        status: action.status,
        error: null,
        loading: false
    });
}

const resetPasswordFail = (state, action) => {
    return updateObject( state, {
        error: action.error,
        loading: false
    });
};

const confirmPasswordFail = (state, action) => {
    return updateObject( state, {
        error: action.error,
        loading: false
    });
};


const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
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