import React from 'react';
import {
    Container, Col, Form,
    FormGroup, Input,
    Button,
    } from 'reactstrap';
import './App.css';

const resetPassword = props => {
    return (
        <Container className="App-header Reset-password">
            <h2 className="text-center">Reset Password</h2>
            <Form className="Form-element">
            <Col>
                <FormGroup>
                <Input
                    type="email"
                    name="email"
                    id="exampleEmail"
                    placeholder="Email"
                />
                </FormGroup>
            </Col>
            <Col>
                <Button className="Submit-button">SEND ME A LINK</Button>
            </Col>
            </Form>
        </Container>  
    );
};

export default resetPassword;