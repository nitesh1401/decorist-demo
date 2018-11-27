import axios from 'axios';

import * as actionTypes from './actionTypes';

export const resetPasswordStart = () => {
    return {
        type: actionTypes.RESET_PASSWORD_START
    };
};

export const resetPasswordSuccess = (status) => {
    return {
        type: actionTypes.RESET_PASSWORD_SUCCESS,
        status: status
    };
};

export const resetPasswordFail = (error) => {
    return {
        type: actionTypes.RESET_PASSWORD_FAIL,
        error: error
    };
};

export const resetPassword = (email) => {
    return dispatch => {
        dispatch(resetPasswordStart());
        const resetPasswordData = {
            email: email
        };
        let url = 'http://users.localhost/api/v1/accounts/password/reset/'
        axios.post(url, resetPasswordData)
            .then(response => {
                console.log(response);
                dispatch(resetPasswordSuccess(response.status));
                // dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(err => {
                dispatch(resetPasswordFail("SignUp Failed"));
            });
    };
};