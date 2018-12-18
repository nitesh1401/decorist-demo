import { parseJwt, validate } from '../utility';
import * as actionTypes from './actionTypes';
import axios from '../../axios';

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

export const logInFail = error => {
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
    let url = '/api/v1/accounts/login/';

    axios.get('/api/get-token/').then(resp => {
      let config = {
        withCredentials: true,
        headers: {
          csrftoken: resp.data.csrfToken,
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'application/json'
        }
      };
      axios
        .post(url, logInData, config)
        .then(response => {
          let uuid = null;
          let firstName = parseJwt(response.data.token).first_name;
          if (!firstName) {
            firstName = response.data.first_name;
          }
          uuid = response.data.uuid;
          localStorage.setItem('email', userName);
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('userName', firstName);
          localStorage.setItem('uuid', uuid);
          dispatch(logInSuccess(response.data, firstName));
        })
        .catch(err => {
          dispatch(logInFail('LogIn Failed'));
        });
    });
  };
};
//Login Ends

//Maintain log in while refreshing starts
export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (token) {
      const userName = localStorage.getItem('userName');
      dispatch(logInSuccess(token, userName));
    }
  };
};
//Maintain log in while refreshing ends

//Log Out starts
export const logOutStart = () => {
  return {
    type: actionTypes.LOGOUT_START
  };
};

export const logOutSuccess = () => {
  return {
    type: actionTypes.LOGOUT
  };
};

export const logOut = () => {
  return dispatch => {
    dispatch(logOutStart())
    let url = '/api/v1/accounts/logout/';
    let config = {
      withCredentials: true,
      headers: { Authorization: `JWT ${localStorage.getItem('token')}` },
      params: { uuid: localStorage.getItem('uuid') }
    };
    axios
      .get(url, config)
      .then(response => {
        dispatch(logOutSuccess());
        localStorage.removeItem('token');
        localStorage.removeItem('uuid');
        localStorage.removeItem('userName');
        localStorage.removeItem('email');
        localStorage.removeItem('password');
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
  };
};
// Error clean up ends

// Sign up starts
export const signUpStart = () => {
  return {
    type: actionTypes.SIGNUP_START
  };
};

export const signUpSuccess = token => {
  return {
    type: actionTypes.SIGNUP_SUCCESS,
    idToken: token
  };
};

export const signUpFail = error => {
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

export const signUp = (firstName, lastName, email, password) => {
  return dispatch => {
    dispatch(signUpStart());
    const signUpData = {
      username: email,
      email: email,
      password1: password,
      password2: password,
      firstname: firstName,
      lastname: lastName
    };
    let url = '/api/v1/accounts/signup/';
    axios
      .post(url, signUpData)
      .then(response => {
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
        dispatch(signUpSuccess(response.data));
      })
      .catch(err => {
        dispatch(signUpFail(validate(err.response.data)));
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

export const resetPasswordSuccess = status => {
  return {
    type: actionTypes.RESET_PASSWORD_SUCCESS,
    status: status
  };
};

export const resetPasswordFail = error => {
  return {
    type: actionTypes.RESET_PASSWORD_FAIL,
    error: error
  };
};

export const resetPassword = email => {
  return dispatch => {
    dispatch(resetPasswordStart());
    const resetPasswordData = {
      email: email
    };
    let url = '/api/v1/accounts/password/reset/';
    axios
      .post(url, resetPasswordData)
      .then(response => {
        dispatch(resetPasswordSuccess(response.status));
      })
      .catch(err => {
        dispatch(resetPasswordFail('Sending Reset Link Failed'));
      });
  };
};
// Reset Password ends

//Confirm Password starts

export const confirmPasswordStart = () => {
  return {
    type: actionTypes.CONFIRM_PASSWORD_START
  };
};

export const confirmPasswordSuccess = status => {
  return {
    type: actionTypes.CONFIRM_PASSWORD_SUCCESS,
    status: status
  };
};

export const confirmPasswordFail = error => {
  return {
    type: actionTypes.CONFIRM_PASSWORD_FAIL,
    error: error
  };
};

export const confirmPassword = (pass1, pass2, token, uid) => {
  return dispatch => {
    dispatch(confirmPasswordStart());
    const confirmPasswordData = {
      new_password1: pass1,
      new_password2: pass2,
      uid: uid,
      token: token
    };
    let url = '/api/v1/accounts/password/reset/confirm/';
    axios
      .post(url, confirmPasswordData)
      .then(response => {
        dispatch(confirmPasswordSuccess(response.status));
      })
      .catch(err => {
        dispatch(confirmPasswordFail("Password Doesn't match"));
      });
  };
};
//Confirm Password ends
