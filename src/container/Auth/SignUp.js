import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Col,
  Form,
  FormGroup,
  Input,
  Button,
  FormFeedback,
  Row
} from 'reactstrap';
import * as actions from '../../store/actions/auth';
import '../../App.css';
import Spinner from '../../components/Spinner/Spinner';
import Aux from '../../hoc/Aux';

//  
//   email: /^[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/gi,
//   password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[.~!@#$%^&*])[a-zA-Z0-9.~!@#$%^&*]{8,30}$/g
// };

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    };
    this.submitHandler = this.submitHandler.bind(this);
    this.logInHandler = this.logInHandler.bind(this);
    this.inputChangedHandler = this.inputChangedHandler.bind(this);
  }

  submitHandler(event) {
    event.preventDefault();
    this.props.onSignUp(
      this.state.firstName,
      this.state.lastName,
      this.state.email,
      this.state.password
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.isSignedIn !== prevProps.isSignedIn) {
      this.props.onLogIn(
        localStorage.getItem('email'),
        localStorage.getItem('password')
      );
    }
    if (this.props.isLoggedIn !== prevProps.isLoggedIn) {
      this.props.closeModal('');
    }
  }

  logInHandler() {
    this.props.clearAnyErrorMessage();
    this.props.openModal('logIn');
  }

  inputChangedHandler(event) {
    const updatedFormValues = { ...this.state };
    updatedFormValues[event.target.name] = event.target.value;
    this.setState(updatedFormValues);
  }

  render() {
    let errorMessage = null;
    let signUpForm = null;
    if (this.props.error) {
      errorMessage = (
        <p style={{ color: 'red', fontSize: '14px' }}>{this.props.error}</p>
      );
    }
    if (this.props.loading) {
      signUpForm = <Spinner />;
    } else {
      signUpForm = (
        <Container className="App-header">
          <h2 className="text-center">Sign Up</h2>
          {errorMessage}
          <Form className="Form-element">
            <Col>
              <FormGroup>
                <Row>
                  <Col xs="6">
                    <Input
                      type="text"
                      name="firstName"
                      id="firstName"
                      placeholder="First Name"
                      className="Name"
                      onChange={this.inputChangedHandler}
                    />
                  </Col>
                  <Col xs="6">
                    <Input
                      type="text"
                      name="lastName"
                      id="lastName"
                      placeholder="Last Name"
                      className="Name"
                      onChange={this.inputChangedHandler}
                    />
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Input
                  type="email"
                  name="email"
                  id="exampleEmail"
                  placeholder="Email"
                  onChange={this.inputChangedHandler}
                  // onChange={this.props.validateEmail}
                  // valid={ this.props.message.email === 'has-success' }
                  // invalid={ this.props.message.email === 'has-failure' }
                />
                <FormFeedback>
                  It's wrong! Please enter a valid Email address.
                </FormFeedback>
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
                  // onChange={this.props.validatePassword}
                  // valid={ this.props.message.password === 'has-success' }
                  // invalid={ this.props.message.password === 'has-failure' }
                />
                <FormFeedback>
                  Password must be a combination of small & capital letters,
                  digits, and special characters! Also minimum length should be
                  8 characters.
                </FormFeedback>
              </FormGroup>
            </Col>
            <Col>
              <Button onClick={this.submitHandler} className="Submit-button">
                SIGN UP
              </Button>
            </Col>
            <p className="text-center Font-14 Para"> OR </p>
            <Col>
              <Button disabled className="Submit-button">
                SIGN UP WITH FACEBOOK
              </Button>
            </Col>
          </Form>
          <Row>
            <Col className="Font-14">
              Already a Member?{' '}
              <a href="#" onClick={this.logInHandler}>
                {' '}
                Log In{' '}
              </a>
            </Col>
          </Row>
        </Container>
      );
    }

    return <Aux>{signUpForm}</Aux>;
  }
}

const mapStateToProps = state => {
  return {
    loading: state.loading,
    error: state.error,
    isSignedIn: state.token !== null,
    isLoggedIn: state.userName !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSignUp: (firstName, lastName, email, password) =>
      dispatch(actions.signUp(firstName, lastName, email, password)),
    onLogIn: (email, password) => dispatch(actions.logIn(email, password)),
    clearAnyErrorMessage: () => dispatch(actions.clearErrorMessage())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
