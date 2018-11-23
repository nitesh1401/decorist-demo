import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Container, Col, Form,
    FormGroup, Label, Input,
    Button, FormFeedback
    } from 'reactstrap';
import * as actions from './store/actions/signUp';
import './App.css';

class SignUp extends Component{
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: ""
        }
        this.submitHandler = this.submitHandler.bind(this);
        this.inputChangedHandler = this.inputChangedHandler.bind(this);
    }

    submitHandler(event) {
      event.preventDefault();
      this.props.onSignUp(this.state.firstName+this.state.lastName, this.state.email, this.state.password);
    }

    inputChangedHandler(event) {
      const updatedFormValues = { ...this.state };
      console.log("Input", event.target.name, event.target.value, this.state);
      updatedFormValues[event.target.name] = event.target.value;
      console.log(updatedFormValues);
      this.setState({updatedFormValues}); 
    }

    render() {
      let errorMessage = null;

      if (this.props.error) {
          errorMessage = (
              <p>{this.props.error.message}</p>
          );
      }

      return (
          <Container className="App-header">
          <h2 className="text-center">Sign Up</h2>
          {errorMessage}
          <Form className="Form-element">
            <Col>
              <FormGroup>
                <Label>Name</Label>
                <Input
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder="First Name"
                  className="Name"
                  onChange={this.inputChangedHandler}
                />
                <Input
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="Last Name"
                  className="Name"
                  onChange={this.inputChangedHandler}
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label>Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="exampleEmail"
                  placeholder="Email"
                  onChange={this.inputChangedHandler}
                  // onChange={this.props.validateEmail}
                  valid={ this.props.message.emailState === 'has-success' }
                  invalid={ this.props.message.emailState === 'has-failure' }
                />
                <FormFeedback>
                    It's wrong! Please enter a valid Email address.
                </FormFeedback>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="examplePassword"
                  placeholder="Password"
                  onChange={this.inputChangedHandler}
                  // onChange={this.props.validatePassword}
                  valid={ this.props.message.passwordState === 'has-success' }
                  invalid={ this.props.message.passwordState === 'has-failure' }
                />
                <FormFeedback>
                    Password must a combination of small & capital letters, digits, and special characters!
                    Also minimum length should be 8 characters.
                </FormFeedback>
              </FormGroup>
            </Col>
            <Col>
              <Button onClick={this.submitHandler}
                className="Submit-button">SIGN UP</Button>
            </Col>
            <p className="text-center Font-14 Para"> OR </p>
            <Col>
              <Button disabled className="Submit-button">SIGN UP WITH FACEBOOK</Button>
            </Col>
          </Form>
        </Container>  
      );
    }
}

const mapStateToProps = state => {
  return {
      loading: state.loading,
      error: state.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
      onSignUp: (userName, email, password) => dispatch( actions.signUp(userName, email, password) )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);