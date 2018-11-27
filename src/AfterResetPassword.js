import React from 'react';
import Aux from './hoc/Aux';
import './App.css';

const afterResetPassword = (props) => {
    return (
        <Aux>
            <h4>EMAIL SENT</h4>
            <div>An email with instructions for resetting your password has been sent!</div>
            <div>Remember to check your spam folder if you can't find it right away.</div>
            <button onClick={()=>{props.closeModal("")}} className="Submit-button">OK</button>
        </Aux>
    );
};

export default afterResetPassword;