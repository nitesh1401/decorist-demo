import React, { Component } from 'react';
import Aux from './hoc/Aux';
import { connect } from 'react-redux';
import { DropdownItem } from 'reactstrap';
import * as actions from './store/actions/logOut'

class LogOut extends Component {
    constructor(props) {
        super(props);
        this.logOutHandler = this.logOutHandler.bind(this);
    }

    logOutHandler(event) {
        event.preventDefault();
        this.props.onLogOut();
    }

    // componentDidUpdate(prevProps) {
    //     if(this.props.status !== prevProps.status) {
    //         this.props.loggingOut();
    //     }
    // }

    render() {
        return(
            <Aux>
                <DropdownItem>
                    <div onClick={this.logOutHandler} > Log Out </div>
                </DropdownItem>
            </Aux>
        );
    }

};

const mapStateToProps = state => {
    return {
        status: state.logOut.status,
        loading: state.logOut.loading,
        error: state.logOut.error
    };
};
  
const mapDispatchToProps = dispatch => {
    return {
        onLogOut: () => dispatch( actions.logOut() )
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogOut);

