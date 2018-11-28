import React, { Component } from 'react';
import Aux from './hoc/Aux';
import { connect } from 'react-redux';
import { DropdownItem } from 'reactstrap';
import * as actions from './store/actions/logIn'

class LogOut extends Component {
    constructor(props) {
        super(props);
        this.logOutHandler = this.logOutHandler.bind(this);
    }

    logOutHandler(event) {
        this.props.setAppState();
        this.props.onLogOut();
    }

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

const mapStateToProps = (state, ownProps) => {
    return {
        loading: state.logIn.loading,
        error: state.logIn.error,
        cookies: ownProps.cookies
    };
};
  
const mapDispatchToProps = dispatch => {
    return {
        onLogOut: () => dispatch( actions.logOut() )
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogOut);

