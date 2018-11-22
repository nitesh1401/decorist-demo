import React, { Component } from 'react';
import {
    Container, Col, Form,
    FormGroup, Label, Input,
    Button, Row, FormFeedback
    } from 'reactstrap';
import { Link, Route} from 'react-router-dom';
import './App.css';
import Aux from './hoc/Aux';
import ResetPassword from './ResetPassword'

class LogIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        }
    }

    render() {
        return (
            <Aux>
                <Container className="App-header">
                <h2 className="text-center">Sign In</h2>
                    <Form className="Form-element">
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
                            {/* <FormFeedback valid>
                                Your Email is valid.
                            </FormFeedback> */}
                            <FormFeedback>
                                Invalid Email!
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
                                // onChange={this.props.validatePassword}
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
                                    <Input type="checkbox" />{' '}
                                    Remember Me
                                </Label>
                            </FormGroup>
                        </Col>
                        <Col xs="6" className="Font-14">
                            <Link to="/resetPassword">Forgot Password?</Link>
                        </Col>
                    </Row>
                    <Col>
                        <Button disabled className="Submit-button">LOG IN</Button>
                    </Col>
                    <p className="text-center Font-14 Para"> OR </p>
                    <Col>
                        <Button disabled className="Submit-button">LOG IN WITH FACEBOOK</Button>
                    </Col>
                    </Form>
                </Container>  
                <Route path="/resetPassword" exact Component={ResetPassword} />
            </Aux>
        );
    }
}

export default LogIn;