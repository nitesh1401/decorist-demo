import React, { Component } from 'react';
import {
    Container, Col, Form,
    FormGroup, Label, Input,
    Button, FormFeedback
    } from 'reactstrap';
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
    }

    render() {
        return (
            <Container className="App-header">
            <h2 className="text-center">Sign Up</h2>
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
                  />
                  <Input
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder="Last Name"
                    className="Name"
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
                    onChange={this.props.validateEmail}
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
                    onChange={this.props.validatePassword}
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
                <Button disabled className="Submit-button">SIGN UP</Button>
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

export default SignUp;