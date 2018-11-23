import axios from 'axios';

import * as actionTypes from './actionTypes';

export const signUpStart = () => {
    return {
        type: actionTypes.SIGNUP_START
    };
};

export const signUpSuccess = (token, userId) => {
    return {
        type: actionTypes.SIGNUP_SUCCESS,
        idToken: token,
        userId: userId
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
            username: "atul", //userName,
            email: "abc@xyz.com", //email,
            password1: "Nkt@1234", //password,
            password2: "Nkt@1234", //password,
        };
        console.log(signUpData);
        let url = 'http://users.localhost/api/v1/accounts/signup/'
        axios.post(url, signUpData)
            .then(response => {
                console.log(response);
                // dispatch(signUpSuccess(response.data.idToken, response.data.localId));
                // dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(err => {
                dispatch(signUpFail("SignUp Failed"));
            });
    };
};