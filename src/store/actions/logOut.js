import axios from 'axios';

import * as actionTypes from './actionTypes';

export const logOutSuccess = () => {
    return {
        type: actionTypes.LOGOUT
    };
};

export const logOut = () => {
    return dispatch => {

        localStorage.removeItem('idToken');
        localStorage.removeItem('userName');
        let url = 'http://users.localhost/api/v1/accounts/logout/'
        axios.get(url, {withCredentials: true})
            .then(response => {
                console.log(response);
                // dispatch(logOutSuccess(response.status));
            })
            .catch(err => {
                // dispatch(resetPasswordFail("SignUp Failed"));
            });
    };
};