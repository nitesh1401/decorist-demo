import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Row,
  FormFeedback
} from 'reactstrap';
import * as actions from '../../store/actions/auth';
import '../../App.css';
import Aux from '../../hoc/Aux';
import Spinner from '../../components/Spinner/Spinner';

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: { value: null, isValid: true },
      password: { value: null, isValid: true },
      formIsValid: false
    };
    // this.validator = this.validator.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.signUpHandler = this.signUpHandler.bind(this);
    this.resetPasswordHandler = this.resetPasswordHandler.bind(this);
    this.inputChangedHandler = this.inputChangedHandler.bind(this);
  }

  submitHandler(event) {
    event.preventDefault();
    this.props.onLogIn(this.state.email.value, this.state.password.value);
  }

  signUpHandler(event) {
    this.props.clearAnyErrorMessage();
    this.props.openModal('signUp');
  }

  resetPasswordHandler(event) {
    this.props.clearAnyErrorMessage();
    this.props.openModal('resetPassword');
  }

  componentDidUpdate(prevProps) {
    if (this.props.isLoggedIn !== prevProps.isLoggedIn) {
      this.props.closeModal('');
    }
  }

  // validator(name, value) {
  //     return regExp[name].test(value);
  // }

  inputChangedHandler(event) {
    const updatedForm = { ...this.state };
    const updatedFormElement = { ...updatedForm[event.target.name] };
    updatedFormElement.value = event.target.value;
    // updatedFormElement.isValid = this.validator(event.target.name, event.target.value);
    updatedForm[event.target.name] = updatedFormElement;
    this.setState(updatedForm);
  }

  render() {
    let errorMessage = null;
    let logInForm = null;
    if (this.props.error) {
      errorMessage = (
        <p style={{ color: 'red', fontSize: '14px' }}>{this.props.error}</p>
      );
    }
    if (this.props.loading) {
      logInForm = <Spinner />;
    } else {
      logInForm = (
        <Container className="App-header">
          <h2 className="text-center">Sign In</h2>
          {errorMessage}
          <Form className="Form-element">
            <Col>
              <FormGroup>
                <Input
                  type="text"
                  name="email"
                  id="exampleEmail"
                  placeholder="Username"
                  onChange={this.inputChangedHandler}
                  // valid={ this.state.email.isValid }
                  // invalid={ !this.state.email.isValid }
                />
                {/* <FormFeedback valid>
                            Your Email is valid.
                        </FormFeedback> */}
                <FormFeedback>Invalid Email!</FormFeedback>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Input
                  type="password"
                  name="password"
                  id="examplePassword"
                  placeholder="Password"
                  onChange={this.inputChangedHandler}
                />
                {/* <FormFeedback invalid>
                            Invalid Email!
                        </FormFeedback> */}
              </FormGroup>
            </Col>
            <Row>
              <Col xs="6">
                <FormGroup check className="Font-14">
                  <Label check>
                    <Input type="checkbox" /> Remember Me
                  </Label>
                </FormGroup>
              </Col>
              <Col xs="6" className="Font-14">
                <a href="#" onClick={this.resetPasswordHandler}>
                  Forgot Password?
                </a>
              </Col>
            </Row>
            <Col>
              <Button onClick={this.submitHandler} className="Submit-button">
                LOG IN
              </Button>
            </Col>
            <p className="text-center Font-14 Para"> OR </p>
            <Col>
              <Button className="Submit-button" disabled>
                LOG IN WITH FACEBOOK
              </Button>
            </Col>
          </Form>
          <Row>
            <Col className="Font-14">
              Don't have an account?{' '}
              <a href="#" onClick={this.signUpHandler}>
                {' '}
                Sign Up
              </a>
            </Col>
          </Row>
        </Container>
      );
    }

    return <Aux>{logInForm}</Aux>;
  }
}
const mapStateToProps = state => {
  return {
    loading: state.loading,
    error: state.error,
    isLoggedIn: state.token != null,
    userName: state.userName
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogIn: (email, password) => dispatch(actions.logIn(email, password)),
    clearAnyErrorMessage: () => dispatch(actions.clearErrorMessage())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LogIn);
