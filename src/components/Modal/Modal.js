import React from 'react';
import closeBtn from '../../assets/images/close-icon.png';
import Aux from '../../hoc/Aux';
import Backdrop from '../Backdrop/Backdrop';

const modal = props => (
  <Aux>
    <Backdrop
      show={props.show}
      clicked={() => {
        props.modalClosed('');
      }}
    />
    <button
      onClick={() => {
        props.modalClosed('');
      }}
      className="CloseButton"
      style={{
        opacity: props.show ? '1' : '0',
        background: `url(${closeBtn})`
      }}
    />
    <div
      className="Modal"
      style={{
        transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
        opacity: props.show ? '1' : '0'
      }}
    >
      {props.children}
    </div>
  </Aux>
);

export default modal;
