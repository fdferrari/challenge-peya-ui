import React from "react";
import { Route, Redirect } from "react-router-dom";

import "./App.css";
import Login from "./Login/Login";
import authService from "./services/AuthService";
import sessionStorageService from "./services/SessionStorageService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./Dashboard/Dashboard";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoggedIn: false };
  }

  _saveUser = user => sessionStorageService.saveUser(user);
  _saveToken = token => sessionStorageService.saveToken(token);
  _addAuthorizationToken = token => authService.addAuthorizationToken(token);

  _redirectToDashboard = () => {
    //redirect to dashboard
    this.props.history.push({
      pathname: "/search",
      search: this.props.location.search
    });
  };

  _handleLogin = (username, password) => {
    authService
      .login(username, password)
      .then(result => result.data)
      .then(response => {
        this._addAuthorizationToken(response.access_token);
        this._saveToken(response.access_token);
        this._saveUser(response.user);
        this._redirectToDashboard();
        this.setState({ isLoggedIn: true });
        toast.success("User login successfully.");
      })
      .catch(err => {
        console.error(err);
        toast.error(err.response.data.message);
      });
  };

  _handleLogout = () => {
    authService
      .logout()
      .then(result => result.data)
      .then(response => {
        toast.success("User logout successfully.");
        this._addAuthorizationToken(null);
        this._saveToken(null);
        this._saveUser(null);
        this.setState({ isLoggedIn: false });
      })
      .catch(err => {
        console.error(err);
        toast.error(err.response.data.message);
      });
  };

  componentDidMount() {
    toast.configure({
      autoClose: 3000,
      draggable: false
    });
    //find in storage user token and save header
    this._addAuthorizationToken(sessionStorageService.getToken());
    authService
      .checkSession()
      .then(result => result.data)
      .then(response => {
        this._saveUser(response);       
        this._redirectToDashboard();
        this.setState({ isLoggedIn: true });
      })
      .catch(err => {
        console.error(err);
        toast.error(err.response.data.message);
      });
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    if (!isLoggedIn) {
      return <Login handleLogin={this._handleLogin} />;
    }
    return (
      <div className="App">
        <Route
          path="/login"
          exact
          render={props =>
            isLoggedIn ? (
              <Redirect to="/login" />
            ) : (
              <Login {...props} handleLogin={this._handleLogin} />
            )
          }
        />
        <Route
          path="/search"
          exact
          render={props =>
            isLoggedIn ? (
              <Dashboard
                {...props}
                saveUser={this._saveUser}
                logout={this._handleLogout}
                toast={toast}
                user={sessionStorageService.getUser()}
              />
            ) : (
              <Redirect to="/login" />
            )
          }
        />
      </div>
    );
  }
}

export default App;
