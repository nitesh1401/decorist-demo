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
        const logInData = {
            username: userName,
            password: password
        };
        let url = 'https://users.dev.decorist.me/api/v1/accounts/login/';
        let config = {
            withCredentials : true
        }
        axios.post(url, logInData, config)
            .then(response => {
                console.log("response", response);
                localStorage.setItem("idToken",response.data);
                localStorage.setItem("userName",userName);
                dispatch(logInSuccess(response.data, userName));
            })
            .catch(err => {
                dispatch(logInFail("LogIn Failed"));
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

export const logOutSuccess = () => {
    return {
        type: actionTypes.LOGOUT
    };
};

export const logOut = () => {
    return dispatch => {

        localStorage.removeItem('idToken');
        localStorage.removeItem('userName');
        let url = 'https://users.dev.decorist.me/api/v1/accounts/logout/'
        axios.get(url, {withCredentials: true})
            .then(response => {
                dispatch(logOutSuccess());
            })
            .catch(err => {
                // dispatch(resetPasswordFail("SignUp Failed"));
            });
    };
};

export const clearErrorMessage = () => {
    return dispatch => {
        dispatch({ type: actionTypes.CLEAR_ERROR_MESSAGE });
    }     
}