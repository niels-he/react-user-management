import * as React from 'react';

import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import { compose } from 'recompose';
import Users from './pages/Admin/Users/Users';
import UserEdit from './pages/Admin/Users/UserEdit/UserEdit';
import UserNew from './pages/Admin/Users/UserNew/UserNew';
import Login from './pages/Auth/Login';
import Logout from './pages/Auth/Logout';
import Dashboard from './pages/Core/Dashboard/Dashboard';
import Profile from './pages/Core/Profile/Profile';
import * as actions from './store/actions/index';

// const Dashboard = React.lazy(() => import('./components/Dashboard/Dashboard'));

export interface IDashboardProps {
  isAuthenticated: boolean;
  authRole: string | null;
  onTryAutoSignup: any;
  userModules: object[] | null;
}

export class App extends React.Component<IDashboardProps, any> {
  public componentDidMount() {
    this.props.onTryAutoSignup();
  }

  public renderLazyComponent = (component: any) => {
    return (
      <React.Suspense fallback={<div>Loading...</div>}>
        {component}
      </React.Suspense>
    );
  };

  public render() {
    let routes = (
      <Switch>
        <Route path='/' component={Login} />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      // Admin Routes
      let adminRoutes;
      if (this.props.authRole === 'admin') {
        adminRoutes = [
          <Route path='/admin/users' exact={true} component={Users} key='1' />,
          <Route
            path='/admin/user/new'
            exact={true}
            component={UserNew}
            key='3'
          />,
          <Route
            path='/admin/user/:id'
            exact={true}
            component={UserEdit}
            key='2'
          />
        ];
      }
      // User Routes
      let userRoutes;
      if (this.props.authRole === 'user') {
        userRoutes = <Route path='/test' exact={true} component={Profile} />;
      }

      // Normal Routes
      routes = (
        <Switch>
          <Route path='/login' exact={true} component={Login} />
          <Route path='/dashboard' exact={true} component={Dashboard} />
          <Route path='/profile' exact={true} component={Profile} />
          {adminRoutes}
          {userRoutes}
          <Route path='/logout' component={Logout} />
          <Redirect exact={true} from='/' to='/dashboard' />
          <Redirect to='/' />
          {/* <Route
              path='/dashboard'
              exact={true}
              render={this.renderLazyComponent.bind(this, <Dashboard />)}
            /> */}
        </Switch>
      );
    }
    return <Router>{routes}</Router>;
  }
}

const mapStateToProps = (state: any) => {
  return {
    isAuthenticated: state.auth.token !== null,
    authRole: state.auth.authRole,
    userModules: state.auth.userModules
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(App);
