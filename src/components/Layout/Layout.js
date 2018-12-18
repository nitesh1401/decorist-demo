import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import LogIn from '../../container/Auth/LogIn';
import ResetPassword from '../../container/Auth/ResetPassword';
import SignUp from '../../container/Auth/SignUp';
import Modal from '../../components/Modal/Modal';
import AfterResetPassword from '../../container/Auth/AfterResetPassword';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Aux from '../../hoc/Aux';
import * as actions from '../../store/actions/auth';
import Spinner from '../../components/Spinner/Spinner';
import Backdrop from '../Backdrop/Backdrop';

class Layout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            modalContent: null
        }
        this.closeModal = this.closeModal.bind(this);
        this.modalHandler = this.modalHandler.bind(this);
        this.loggedOut = this.loggedOut.bind(this);
    }

    modalHandler(modalContent) {
      this.setState({ showModal: true, modalContent: modalContent });
    }
  
    closeModal(data) {
      this.props.clearAnyErrorMessage();
      this.setState({
        showModal: false,
        modalContent: null
      });
    }

    loggedOut() {
      this.setState({ ...this.state, modalContent: null });
      this.props.history.replace("/");
    }

    render() {
        let modalContent = null;
        switch (this.state.modalContent) {
          case 'logIn':
            modalContent = (
              <LogIn
                openModal={modalContent => {
                  this.modalHandler(modalContent);
                }}
                closeModal={data => {
                  this.closeModal(data);
                }}
              />
            );
            break;
          case 'resetPassword':
            modalContent = (
              <ResetPassword
                openModal={modalContent => {
                  this.modalHandler(modalContent);
                }}
                closeModal={data => {
                  this.closeModal(data);
                }}
              />
            );
            break;
          case 'signUp':
            modalContent = (
              <SignUp
                openModal={modalContent => {
                  this.modalHandler(modalContent);
                }}
                closeModal={data => {
                  this.closeModal(data);
                }}
              />
            );
            break;
          case 'afterResetPassword':
            modalContent = (
              <AfterResetPassword
                closeModal={data => {
                  this.closeModal(data);
                }}
              />
            );
            break;
          default:
            modalContent = null;
        }

        let spinnerBlock = null;
          spinnerBlock = (<div className="backdrop-wrapper">
            <Backdrop
              show={true}
              clicked={() => {
                return;
              }}
            />
            <div style={{width: '100%', height: '100%', margin: 'auto', zIndex: '1050'}}>
              <Spinner />
            </div>
          </div>);

        return (
            <Aux>
              { this.props.loading && this.props.isAuthenticated ? spinnerBlock: null }
              <Modal
                  show={this.state.showModal}
                  modalClosed={emptyString => {
                      this.closeModal(emptyString);
                  }}
              >
                  {modalContent}
              </Modal >
              <Header  
                    modalContent = {this.state.modalContent}
                    userName = {this.props.userName}
                    isAuthenticated = {this.props.isAuthenticated}
                    modalHandler = {(modalType)=>this.modalHandler(modalType)}
                    loggedOut = {this.loggedOut}
                    onTryAutoSignup = {this.props.onTryAutoSignup}/>
              <div>
                  { this.props.children }
              </div>
              <Footer />
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
      loading: state.loading,
      isAuthenticated: state.userName != null,
      userName: state.userName
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState()),
        clearAnyErrorMessage: () => dispatch(actions.clearErrorMessage())
    };
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
  )(Layout));