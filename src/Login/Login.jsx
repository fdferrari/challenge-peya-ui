import React from "react";
import { Button, Form } from "react-bootstrap";
import "./Login.css";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
  }

  _handleSubmit = e => {
    e.preventDefault();
    this.props.handleLogin(this.state.username, this.state.password);
  };

  _validateForm = () => {
    return (
      (!this.state.username || 0 === this.state.username.length) ||
      (!this.state.password || 0 === this.state.password.length)
    );
  };
  render() {
    return (
      <div className="Login">
        <Form onSubmit={this._handleSubmit}>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control autoFocus type="text" placeholder="Enter username" value={this.state.username}
              onChange={e => this.setState({ username: e.target.value })}/>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={this.state.password}
              onChange={e => this.setState({ password: e.target.value })}/>
          </Form.Group>
           <Button variant="primary" type="submit" disabled={this._validateForm()}>
            Login
          </Button>
        </Form>
      </div>
    );
  }
}

export default Login;
