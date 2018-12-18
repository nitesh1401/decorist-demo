import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import { connect } from 'react-redux';
import { DropdownItem } from 'reactstrap';
import * as actions from '../../store/actions/auth';

class LogOut extends Component {
  constructor(props) {
    super(props);
    this.logOutHandler = this.logOutHandler.bind(this);
  }

  logOutHandler(event) {
    this.props.setAppState();
    this.props.onLogOut();
    this.props.loggingOut();
  }

  render() {
    return (
      <Aux>
        <DropdownItem>
          <div onClick={this.logOutHandler}> Log Out </div>
        </DropdownItem>
      </Aux>
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
    onLogOut: () => dispatch(actions.logOut())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LogOut);
