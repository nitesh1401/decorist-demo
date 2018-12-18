import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import ConfirmPassword from './container/Auth/confirmPassword';
import Projects from './container/Projects/Projects'
import Layout from './components/Layout/Layout';
import Home from './Home';
import * as actions from './store/actions/auth';
import Aux from './hoc/Aux';

export class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    console.log("Props: ", this.props);
    let routes = (
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/reset/:uid/:token" exact component={ConfirmPassword} />
        <Redirect to="/" /> 
      </Switch>  
    );

    if(this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/your-projects" exact component = {Projects} />
          <Redirect to="/" /> 
        </Switch>  
      );
    }
    let content = this.props.location.pathname.indexOf('/reset') === -1 ?
                    (<Layout>
                      {routes}
                    </Layout>) :  (<Aux> {routes} </Aux>);

    return (
      <Aux>
        {content}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.userName != null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
