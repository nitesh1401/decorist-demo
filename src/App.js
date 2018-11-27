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
  DropdownItem } from 'reactstrap';
import { BrowserRouter } from 'react-router-dom';
import LogIn from './LogIn';
import ResetPassword from './ResetPassword';
import SignUp from './SignUp';
import ImgHero from './img-hero.jpg';
import Aux from './hoc/Aux';
import Modal from './components/Modal/Modal'
import AfterResetPassword from './AfterResetPassword';
import LogOut from './LogOut';

import * as actions from './store/actions/logIn';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      modalContent: "",
      userName: ""
    }
    this.modalHandler = this.modalHandler.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.loggedOut = this.loggedOut.bind(this);
  }

  componentDidMount () {
    this.props.onTryAutoSignup();
  }  

  // componentDidUpdate(prevProps) {
  //   if(this.props.userName) {
  //       this.setState({...this.setState, userName: this.props.userName});
  //   }
  // }

  modalHandler(modalContent) {
    this.setState({showModal: true, modalContent: modalContent});
  }

  closeModal(data) {
    this.setState({...this.state, showModal: false, userName: data});
  }

  loggedOut() {
    this.setState({...this.state, modalContent: ""})
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
      default: modalContent = null;
    }

    let navData = null;
    if((this.state.modalContent === "" || this.state.userName === "") && (!this.props.isAuthenticated)){
      navData = (<NavItem className="NavItem">
                  <button className="Button" onClick={() => this.modalHandler("logIn")} > 
                    Log In 
                  </button>
                </NavItem>);
    } else {
      navData = (<UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Hi {this.state.userName ? this.state.userName : this.props.userName}
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      Your Projects
                    </DropdownItem>
                    <DropdownItem divider />
                    <LogOut loggingOut={this.loggedOut}/>
                  </DropdownMenu>
                </UncontrolledDropdown>);
    }
    return (
      <BrowserRouter>
          <Aux>
            <Modal show={this.state.showModal} modalClosed={(emptyString)=>{this.closeModal(emptyString)}}>
              {modalContent}
            </Modal>
            <div>
              <Navbar fixed='top'  expand="md">
                <NavbarBrand href="/">Decorist Demo</NavbarBrand>
                  <Nav className="ml-auto" navbar>
                    {navData}
                    {/* <NavItem className="NavItem">
                    <button className="Button" onClick={() => this.modalHandler(false)} > Sign Up </button>
                    </NavItem> */}
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

export default connect( mapStateToProps, mapDispatchToProps )( App );
// export default App;
