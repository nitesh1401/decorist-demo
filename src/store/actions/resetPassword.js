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

export const confirmPasswordSuccess = (status) => {
    return {
        type: actionTypes.CONFIRM_PASSWORD_SUCCESS,
        status: status
    };
};

export const resetPasswordFail = (error) => {
    return {
        type: actionTypes.RESET_PASSWORD_FAIL,
        error: error
    };
};

export const confirmPasswordFail = (error) => {
    return {
        type: actionTypes.CONFIRM_PASSWORD_FAIL,
        error: error
    };
};

export const resetPassword = (email) => {
    return dispatch => {
        dispatch(resetPasswordStart());
        const resetPasswordData = {
            email: email
        };
        let url = '/api/v1/accounts/password/reset/'
        axios.post(url, resetPasswordData)
            .then(response => {
                console.log(response);
                dispatch(resetPasswordSuccess(response.status));
            })
            .catch(err => {
                dispatch(resetPasswordFail("SignUp Failed"));
            });
    };
};

export const confirmPassword = (pass1, pass2, token, uid) => {
    return dispatch => {
        const confirmPasswordData = {
            "new_password1": pass1,
            "new_password2": pass2,
            "uid": uid,
            "token": token
        };
        let url = '/api/v1/accounts/password/reset/confirm/'
        axios.post(url, confirmPasswordData)
            .then(response => {
                console.log(response);
                dispatch(confirmPasswordSuccess(response.status));
            })
            .catch(err => {
                dispatch(confirmPasswordFail("Reset Failed"));
            });
    };
};