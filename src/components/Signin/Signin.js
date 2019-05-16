import React, { Component } from "react";

class Signin extends Component {
  state = {
    email: "",
    password: ""
  };

  handleChange = e => {
    e.target.name === "email"
      ? this.setState({ email: e.target.value })
      : this.setState({ password: e.target.value });
  };

  onSubmit = event => {
    event.preventDefault();
    fetch("http://localhost:3001/signin", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    })
      .then(response => response.json())
      .then(user => {
        if (user.id) {
          this.props.loadUser(user);
          this.props.onRouteChange("home");
        } else {
          alert("Ops Wrong Email Or Password");
        }
      });
  };
  render() {
    const { onRouteChange } = this.props;

    return (
      <form onSubmit={this.onSubmit}>
        <article className="br3 ba black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
          <main className="pa4 black-80">
            <div className="measure">
              <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    type="email"
                    name="email"
                    id="email"
                    required
                    onChange={this.handleChange}
                  />
                </div>
                <div className="mv3">
                  <label className="db fw6 lh-copy f6" htmlFor="password">
                    Password
                  </label>
                  <input
                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    type="password"
                    name="password"
                    id="password"
                    required
                    onChange={this.handleChange}
                  />
                </div>
              </fieldset>
              <div className="">
                <input
                  className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                  type="submit"
                  value="Sign in"
                />
              </div>
              <div className="lh-copy mt3">
                <p
                  onClick={() => onRouteChange("signUp")}
                  className="f6 link dim black db pointer"
                >
                  Sign up
                </p>
              </div>
            </div>
          </main>
        </article>
      </form>
    );
  }
}

export default Signin;
