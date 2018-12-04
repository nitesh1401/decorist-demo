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
import LogIn from './container/Auth/LogIn';
import ResetPassword from './container/Auth/ResetPassword';
import SignUp from './container/Auth/SignUp';
import ImgHero from './assets/images/img-hero.jpg';
import Aux from './hoc/Aux';
import Modal from './components/Modal/Modal'
import AfterResetPassword from './container/Auth/AfterResetPassword';
import LogOut from './container/Auth/LogOut';
import decoristLogo from './assets/images/decorist-logo.svg';
import ConfirmPassword from './container/Auth/confirmPassword';
import Footer from './components/Footer/Footer';

import * as actions from './store/actions/auth';


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
    this.props.clearAnyErrorMessage();
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
      case "resetPassword": 
      modalContent = <ResetPassword
                      openModal = {(modalContent)=>{this.modalHandler(modalContent)}}
                      closeModal = {(data)=>{this.closeModal(data)}} />;
      break;                
      case "signUp": 
      modalContent = <SignUp
                      openModal = {(modalContent)=>{this.modalHandler(modalContent)}}
                      closeModal = {(data)=>{this.closeModal(data)}} />;
      break;               
      case "afterResetPassword": 
      modalContent = <AfterResetPassword
                      closeModal = {(data)=>{this.closeModal(data)}} />;
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
      // logInMessage = (<div style={{zIndex:"1", textAlign: "center", width: "100%", height: "40px", color:"#fff", backgroundColor: "#008000"}} >
      //                   You are successfully loggedIn!
      //                 </div>);
      navData = (<UncontrolledDropdown nav inNavbar>
                  <DropdownToggle style={{color: "#000"}} nav caret>
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
          <Aux>
            <Route path="/" exact render={()=>{
              return (<div>
                <Modal show={this.state.showModal} modalClosed={(emptyString)=>{this.closeModal(emptyString)}}>
              {modalContent}
            </Modal>
            <div>
                { logInMessage }
              <Navbar fixed="top" expand="md">
                  <Nav className="ml-auto" navbar>
                  <NavbarBrand style={{marginRight:"30px"}} href="/">
                  <img src={decoristLogo} alt="Decorist Logo" ></img>
                </NavbarBrand>
                  <NavItem>
                <NavLink className="NavItemColor" href="#">Design Services</NavLink></NavItem>
                <NavItem>
                <NavLink className="NavItemColor" href="#">Our Designers</NavLink></NavItem>
                <NavItem>
                <NavLink className="NavItemColor" href="#">Client Projects</NavLink></NavItem>
                <NavItem><NavLink className="NavItemColor" href="#">Design Bar</NavLink></NavItem>
                <NavItem><NavLink className="NavItemColor" href="#" style={{marginRight : "265px"}}>Blog</NavLink></NavItem>
                  {navData}
                  <NavItem className="NavItem">
                  <button className="Button" style={{backgroundColor: "#000", color: "#fff", width: "130px"}} > 
                    Start a Project 
                  </button>
                </NavItem>
                  </Nav>
              </Navbar>

              <div style={{position:'relative'}} >
                <img src={ImgHero} alt="Hero" style={{top: '60px', position: 'absolute', backgroundAttachment: 'fixed', width: '100%', height: '600px'}} />
              </div>
            </div>
              <Footer />
              </div>);
            }} />
            <Route path="/reset" component={ConfirmPassword} />
          </Aux>
     );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.userName != null,
    userName: state.userName
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch( actions.authCheckState() ),
    clearAnyErrorMessage: () => dispatch( actions.clearErrorMessage() )
  };
};

export default connect( mapStateToProps, mapDispatchToProps )(App);
