import axios from 'axios';

import * as actionTypes from './actionTypes';

export const logInStart = () => {
    return {
        type: actionTypes.LOGIN_START
    };
};

export const logInSuccess = (token, userName) => {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        idToken: token,
        userName: userName
    };
};

export const logInFail = (error) => {
    return {
        type: actionTypes.LOGIN_FAIL,
        error: error
    };
};

export const logIn = (userName, password) => {
    return dispatch => {
        dispatch(logInStart());
        //axios.defaults.withCredentials = true;
        const logInData = {
            username: "madhuri.lata+admin@decorist.com",
            password: "Password12"
        };
        let url = '/api/v1/accounts/login/';
        // let withCredentials;
        let config = {
            withCredentials : true
            // "headers" : {
            //     withCredentials: true
            // }
        }
        axios.post(url, logInData, config)
            .then(response => {
                console.log("response", response);
                localStorage.setItem("idToken",response.data);
                localStorage.setItem("userName",userName);
                dispatch(logInSuccess(response.data, userName));
                // dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(err => {
                dispatch(logInFail("SignUp Failed"));
            });
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('idToken');
        if (token) {
                const userName = localStorage.getItem('userName');
                dispatch(logInSuccess(token, userName)); 
        } 
    };
};