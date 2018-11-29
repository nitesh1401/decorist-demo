import axios from 'axios';

import * as actionTypes from './actionTypes';

export const signUpStart = () => {
    return {
        type: actionTypes.SIGNUP_START
    };
};

export const signUpSuccess = (token) => {
    return {
        type: actionTypes.SIGNUP_SUCCESS,
        idToken: token
    };
};

export const signUpFail = (error) => {
    return {
        type: actionTypes.SIGNUP_FAIL,
        error: error
    };
};

// export const logout = () => {
//     return {
//         type: actionTypes.AUTH_LOGOUT
//     };
// };

// export const checkAuthTimeout = (expirationTime) => {
//     return dispatch => {
//         setTimeout(() => {
//             dispatch(logout());
//         }, expirationTime * 1000);
//     };
// };

export const signUp = (userName, email, password) => {
    return dispatch => {
        dispatch(signUpStart());
        const signUpData = {
            username: userName,
            email: email,
            password1: password,
            password2: password,
        };
        console.log(signUpData);
        let url = 'https://users.dev.decorist.com/api/v1/accounts/signup/'
        axios.post(url, signUpData)
            .then(response => {
                console.log(response);
                dispatch(signUpSuccess(response.data));
                // dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(err => {
                dispatch(signUpFail("SignUp Failed"));
            });
    };
};

export const clearErrorMessage = () => {
    return dispatch => {
        dispatch({ type: actionTypes.CLEAR_ERROR_MESSAGE });
    }     
}