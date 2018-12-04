import axios from 'axios';
import { parseJwt } from '../utility';
import * as actionTypes from './actionTypes';

// Log In starts
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
        let url = 'https://decorist-dsp.appspot.com/api/v1/accounts/login/';
        let config = {
            withCredentials : true
        }
        axios.post(url, logInData, config)
            .then(response => {
                let firstName = parseJwt(response.data).first_name;
                localStorage.setItem("idToken",response.data);
                localStorage.setItem("userName",firstName);
                dispatch(logInSuccess(response.data, firstName));
            })
            .catch(err => {
                dispatch(logInFail("LogIn Failed"));
            });
    };
};
//Login Ends

//Maintain log in while refreshing starts
export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('idToken');
        if (token) {
                const userName = localStorage.getItem('userName');
                dispatch(logInSuccess(token, userName)); 
        } 
    };
};
//Maintain log in while refreshing ends

//Log Out starts
export const logOutSuccess = () => {
    return {
        type: actionTypes.LOGOUT
    };
};

export const logOut = () => {
    return dispatch => {
        localStorage.removeItem('idToken');
        localStorage.removeItem('userName');
        let url = 'https://decorist-dsp.appspot.com/api/v1/accounts/logout/'
        axios.get(url, {withCredentials: true})
            .then(response => {
                dispatch(logOutSuccess());
            })
            .catch(err => {
                // dispatch(resetPasswordFail("SignUp Failed"));
            });
    };
};
//Log Out ends

// Error clean up starts
export const clearErrorMessage = () => {
    return dispatch => {
        dispatch({ type: actionTypes.CLEAR_ERROR_MESSAGE });
    }     
}
// Error clean up ends

// Sign up starts
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
        let url = 'https://decorist-dsp.appspot.com/api/v1/accounts/signup/'
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
// Sign up ends

// Reset Password starts
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
        let url = 'https://decorist-dsp.appspot.com/api/v1/accounts/password/reset/'
        axios.post(url, resetPasswordData)
            .then(response => {
                console.log(response);
                dispatch(resetPasswordSuccess(response.status));
            })
            .catch(err => {
                dispatch(resetPasswordFail("Sending Reset Link Failed"));
            });
    };
};
// Reset Password ends

//Confirm Password starts
export const confirmPasswordSuccess = (status) => {
    return {
        type: actionTypes.CONFIRM_PASSWORD_SUCCESS,
        status: status
    };
};

export const confirmPasswordFail = (error) => {
    return {
        type: actionTypes.CONFIRM_PASSWORD_FAIL,
        error: error
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
        let url = 'https://decorist-dsp.appspot.com/api/v1/accounts/password/reset/confirm/'
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
//Confirm Password ends
