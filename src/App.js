import React, { Component } from 'react';
import { 
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink } from 'reactstrap';
import { BrowserRouter } from 'react-router-dom';
import LogIn from './LogIn';
import ResetPassword from './ResetPassword';
import SignUp from './SignUp';
import ImgHero from './img-hero.jpg';
import Aux from './hoc/Aux';
import Modal from './components/Modal/Modal'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validate : {
          emailState: "",
          passwordState: ""
      },
      showModal: false,
      isLogIn: false
    }
    this.emailValidator = this.emailValidator.bind(this);
    this.passwordValidator = this.passwordValidator.bind(this);
    this.modalHandler = this.modalHandler.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  
  emailValidator(e) {
    const emailRex = /[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi;
    let message="";
    if (emailRex.test(e.target.value)) {
      message = 'has-success';
    } else {
      message = 'has-failure';
    }
    this.setState({ ...this.state, validate:{...this.state.validate, emailState: message} });
  }

  passwordValidator(e) {
    const pwdRex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[.~!@#$%^&*])[a-zA-Z0-9.~!@#$%^&*]{8,30}$/g;
    let message="";
    if (pwdRex.test(e.target.value)) {
      message = 'has-success';
    } else {
      message = 'has-failure';
    }
    this.setState({ ...this.state, validate:{...this.state.validate, passwordState: message} });
  }

  modalHandler(isLogIn) {
    this.setState({showModal: true, isLogIn: isLogIn});
  }

  closeModal() {
    this.setState({showModal: false});
  }

  render() {
    return (
      // <ResetPassword />
      <BrowserRouter>
          <Aux>
            <Modal show={this.state.showModal} modalClosed={this.closeModal}>
              {this.state.isLogIn ? 
              <LogIn 
                validateEmail={this.emailValidator} 
                validatePassword={this.passwordValidator}
                message={this.state.validate}/> : 
              <SignUp 
                validateEmail={this.emailValidator} 
                validatePassword={this.passwordValidator}
                message={this.state.validate}/>}
            </Modal>
            <div>
              <Navbar fixed='top'  expand="md">
                <NavbarBrand href="/">Decorist Demo</NavbarBrand>
                  <Nav className="ml-auto" navbar>
                    <NavItem className="NavItem">
                      <button className="Button" onClick={() => this.modalHandler(true)} > Log In </button>
                    </NavItem>
                    <NavItem className="NavItem">
                    <button className="Button" onClick={() => this.modalHandler(false)} > Sign Up </button>
                    </NavItem>
                  </Nav>
              </Navbar>

              <div style={{position:'relative'}} >
                <img src={ImgHero} alt="Hero" style={{top: '60px', position: 'absolute', backgroundAttachment: 'fixed', width: '100%'}} />
              </div>
            </div>
          </Aux>
      </BrowserRouter>
     );
  }
}

export default App;
