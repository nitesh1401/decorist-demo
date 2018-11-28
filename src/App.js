import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavLink } from 'reactstrap';
import { BrowserRouter, Route } from 'react-router-dom';
import LogIn from './LogIn';
import ResetPassword from './ResetPassword';
import SignUp from './SignUp';
import ImgHero from './img-hero.jpg';
import Aux from './hoc/Aux';
import Modal from './components/Modal/Modal'
import AfterResetPassword from './AfterResetPassword';
import LogOut from './LogOut';
import decoristLogo from './images/decorist-logo.svg';
import ConfirmPassword from './confirmPassword';

import * as actions from './store/actions/logIn';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      modalContent: null,
      userName: null
    }
    this.modalHandler = this.modalHandler.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.loggedOut = this.loggedOut.bind(this);
  }

  componentDidMount () {
    this.props.onTryAutoSignup();
  }  

  modalHandler(modalContent) {
    this.setState({showModal: true, modalContent: modalContent});
  }

  closeModal(data) {
    this.setState({...this.state, showModal: false, userName: data, modalContent:null});
  }

  loggedOut() {
    this.setState({...this.state, modalContent: null, userName: null});
  }

  render() {
    let modalContent = null;
    switch(this.state.modalContent) {
      case "logIn": 
      modalContent = <LogIn
                      openModal = {(modalContent)=>{this.modalHandler(modalContent)}}
                      closeModal = {(data)=>{this.closeModal(data)}} />;
      break;                
      case "signUp": 
      modalContent = <SignUp
                      openModal = {(modalContent)=>{this.modalHandler(modalContent)}}
                      closeModal = {(data)=>{this.closeModal(data)}}/>;
      break;                
      case "resetPassword": 
      modalContent = <ResetPassword
                      openModal = {(modalContent)=>{this.modalHandler(modalContent)}}
                      closeModal = {(data)=>{this.closeModal(data)}} />;
      break;                
      case "afterResetPassword": 
      modalContent = <AfterResetPassword
                      closeModal = {(data)=>{this.closeModal(data)}} />;
      break;                 
      case "logInMessage": 
      modalContent = (<div style={{textAlign: "center", margin:"20px", color:"green"}} >
                        You are successfully loggedIn!
                      </div>);
      break;                       
      default: modalContent = null;
    }

    let navData = null;
    let logInMessage = null;
    if((this.state.modalContent === null || this.props.userName === null) && (!this.props.isAuthenticated)){
      navData = (<NavItem className="NavItem">
                  <button className="Button" onClick={() => this.modalHandler("logIn")} > 
                    Log In 
                  </button>
                </NavItem>);
    } else {
      navData = (<UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Hi {this.props.userName ? this.props.userName : null}
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      Your Projects
                    </DropdownItem>
                    <DropdownItem divider />
                    <LogOut loggingOut={this.loggedOut} setAppState={this.props.onTryAutoSignup}/>
                  </DropdownMenu>
                </UncontrolledDropdown>);
    }
    return (
      <BrowserRouter>
          <Aux>
            <Route path="/" exact render={()=>{
              return (<div>
                <Modal show={this.state.showModal} modalClosed={(emptyString)=>{this.closeModal(emptyString)}}>
              {modalContent}
            </Modal>
            <div>
              <Navbar fixed='top'  expand="md">
                <NavbarBrand href="/">
                  <img src={decoristLogo}></img>
                </NavbarBrand>
                  { logInMessage }
                  <Nav className="ml-auto" navbar>
                  <NavItem>
                <NavLink className="NavItemColor" href="#">Design Services</NavLink></NavItem>
                <NavItem>
                <NavLink className="NavItemColor" href="#">Our Designers</NavLink></NavItem>
                <NavItem>
                <NavLink className="NavItemColor" href="#">Client Projects</NavLink></NavItem>
                <NavItem><NavLink className="NavItemColor" href="#">Design Bar</NavLink></NavItem>
                <NavItem><NavLink className="NavItemColor" href="#" style={{marginRight : 400}}>Blog</NavLink></NavItem>
                    {navData}
                  </Nav>
              </Navbar>

              <div style={{position:'relative'}} >
                <img src={ImgHero} alt="Hero" style={{top: '60px', position: 'absolute', backgroundAttachment: 'fixed', width: '100%'}} />
              </div>
            </div>
              </div>);
            }} />
            <Route path="/reset" component={ConfirmPassword} />
          </Aux>
      </BrowserRouter>
     );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.logIn.userName != null,
    userName: state.logIn.userName
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch( actions.authCheckState() )
  };
};

export default connect( mapStateToProps, mapDispatchToProps )(App);
