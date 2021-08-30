import React, { Component } from "react";
import { Link } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
  passwordError: "",
  emailError: ""
};

class AuthForm extends Component {
  state = initialState;

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  validate = () => {
    let emailError = "";
    let passwordError = "";
    if (!this.state.email.includes("@")) {
      emailError = "invalid email";
    }
    if (!this.state.password) {
      passwordError = "please enter the passwaord";
    }
    if (emailError || passwordError) {
      this.setState({
        emailError,
        passwordError
      });
      return false;
    }
    return true;
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  validate = () => {
    let emailError = "";
    let passwordError = "";
    if (!this.state.email.includes("@")) {
      emailError = "invalid email";
    }
    if (!this.state.password) {
      passwordError = "please enter the passwaord";
    }

    if (emailError || passwordError) {
      this.setState({
        emailError,
        passwordError
      });
      return false;
    }

    return true;
  };

  handleSubmit = e => {
    e.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      this.props
        .onAuth("signin", this.state)
        .then(() => {
          this.props.history.push("/admin");
        })
        .catch(() => {
          return;
        });
      // clear form
      this.setState(initialState);
    }
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { email, password } = this.state;
    const { buttonText, errors } = this.props;

    return (
      <div className="container" style={{ marginTop: 50 }}>
        <div className="row">
          <div className=" col-md-3 col-lg-4" />
          <div className=" col-md-6 col-lg-4">
            <div
              style={{
                border: "1px solid whitesmoke",
                padding: 20,
                boxShadow: "2.5px 5px 5px whitesmoke"
              }}
            >
              <form onSubmit={this.handleSubmit}>
                <h4>{buttonText}</h4>
                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                />
                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                />
                {errors.message && (
                  <div className="alert alert-danger">{errors.message}</div>
                )}
                <div className={this.state.emptyEmail ? "error" : null}>
                  <small>E-mail</small>
                  <input
                    autoComplete="off"
                    className="form-control"
                    id="email"
                    name="email"
                    onChange={this.handleChange}
                    type="text"
                    value={email}
                  />
                  <div style={{ fontSize: 12, color: "red" }}>
                    {this.state.emailError}
                  </div>
                </div>
                <div
                  className={this.state.emptyReEnterPassword ? "error" : null}
                >
                  <small>Password</small>
                  <input
                    autoComplete="off"
                    className="form-control"
                    id="password"
                    name="password"
                    onChange={this.handleChange}
                    type="password"
                    value={password}
                  />
                  <div style={{ fontSize: 12, color: "red" }}>
                    {this.state.passwordError}
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-block btn-lg"
                  style={{
                    backgroundColor: "black",
                    color: "white",
                    marginTop: 20
                  }}
                >
                  {buttonText}
                </button>
              </form>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: 10
                }}
              />
            </div>
          </div>
          <div className="col-md-3 col-lg-4" />
        </div>
      </div>
    );
  }
}

export default AuthForm;
