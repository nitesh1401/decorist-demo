import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    status: null,
    error: null,
    loading: false
};

const logOutSuccess = (state, action) => {
    return updateObject( state, {
        status: action.status,
        error: null,
        loading: false
     } );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.LOGOUT: return logOutSuccess(state, action);
        default:
            return state;
    }
};

export default reducer;