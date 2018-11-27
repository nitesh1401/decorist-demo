import React, {Component} from 'react';
import { connect } from 'react-redux';
import {
    Container, Col, Form,
    FormGroup, Input,
    Button,
    } from 'reactstrap';
import './App.css';
import * as actions from './store/actions/resetPassword';

class ResetPassword extends Component{
    constructor(props) {
        super(props);
        this.state = {
            email: ""
        };
        this.sendLinkHanler = this.sendLinkHanler.bind(this);
        this.inputHandler = this.inputHandler.bind(this);
    }

    sendLinkHanler(event) {
        event.preventDefault();
        this.props.onResetPassword(this.state.email);
    }

    inputHandler(event) {
        this.setState({email: event.target.value});
    }

    componentDidUpdate(prevProps) {
        if(this.props.status !== prevProps.status) {
            this.props.openModal("afterResetPassword");
        }
    }

    render() {
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
                        onChange = {this.inputHandler}
                    />
                    </FormGroup>
                </Col>
                <Col>
                    <Button onClick={this.sendLinkHanler} className="Submit-button">SEND ME A LINK</Button>
                </Col>
                </Form>
            </Container>  
        );
    }
};

const mapStateToProps = state => {
    return {
        status: state.resetPassword.status,
        loading: state.resetPassword.loading,
        error: state.resetPassword.error
    };
};
  
const mapDispatchToProps = dispatch => {
    return {
        onResetPassword: (email) => dispatch( actions.resetPassword(email) )
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);