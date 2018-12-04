import React, {Component} from 'react';
import { connect } from 'react-redux';
import {
    Container, Col, Form,
    FormGroup, Input,
    Button,
    } from 'reactstrap';
import '../../App.css';
import * as actions from '../../store/actions/auth';

class ConfirmPassword extends Component{
    constructor(props) {
        super(props);
        this.state = {
            password1: null,
            password2: null
        };
        this.submitHanler = this.submitHanler.bind(this);
        this.inputHandler = this.inputHandler.bind(this);
    }

    submitHanler(event) {
        const token = 'MTA3OA';
        const uid = '51o-ac9739337c7411035dbc';
        event.preventDefault();
        this.props.onConfirmPassword(this.state.password1, this.state.password2, token, uid);
    }

    inputHandler(event) {
        this.setState({password1: event.target.value, password2: event.target.value});
    }

    // componentDidUpdate(prevProps) {
    //     if(this.props.status !== prevProps.status) {
    //         this.props.openModal("afterResetPassword");
    //     }
    // }

    render() {
        let errorMessage = null;
  
        if (this.props.error) {
            errorMessage = (
                <p style={{color:"red"}}>{this.props.error}</p>
            );
        }

        return (
            <Container className="App-header Reset-password">
                <h2 className="text-center">Password Reset Confirmation</h2>
                {errorMessage}
                <Form className="Form-element">
                <Col>
                    <FormGroup>
                    <Input
                        type="password"
                        name="password1"
                        id="password1"
                        placeholder="New Password"
                        onChange = {this.inputHandler}
                    />
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                    <Input
                        type="password"
                        name="password2"
                        id="password2"
                        placeholder="Confirm Password"
                        onChange = {this.inputHandler}
                    />
                    </FormGroup>
                </Col>
                <Col>
                    <Button onClick={this.submitHanler} className="Submit-button">SEND ME A LINK</Button>
                </Col>
                </Form>
            </Container>  
        );
    }
};

const mapStateToProps = state => {
    return {
        error: state.error
    };
};
  
const mapDispatchToProps = dispatch => {
    return {
        onConfirmPassword: (pass1, pass2, token, uid) => dispatch( actions.confirmPassword(pass1, pass2, token, uid) )
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmPassword);