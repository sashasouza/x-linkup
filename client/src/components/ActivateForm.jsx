import React, { Component } from "react";
import ReactDOM from "react-dom";
import SignInForm from "./SignInForm";

const initialState = {
  UN: "",
  pswd: "",
  error: "",
  isactive: "",
  u: [],
  p: [],
  k: "",
  l: "",
  val: "",
  act: [],
  requests: []
};

class ActivateForm extends Component {
  state = initialState;
  constructor() {
    super();

    this.state = {
      UN: "",
      pswd: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    let target = e.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value
    });
  }

  userValidate = () => {
    let error = "";
    let isactive = "";
    let flag1 = 0;
    let flag2 = 0;

    let u = this.state.requests.map(mainpage => mainpage.UN);
    let p = this.state.requests.map(mainpage => mainpage.pswd);

    let k = this.state.UN;
    let l = this.state.pswd;
    let act = this.state.requests.map(mainpage => mainpage.active);

    let q = -1;

    //going in the array
    for (var i = 0; i < u.length; i++) {
      ++q;
      if (u[i] == k) {
        flag1 = 1;

        for (var j = 0; j < p.length; j++) {
          if (p[j] == l) {
            flag2 = 1;

            break;
          } else {
            flag2 = 0;
          }
        }

        break;
      } else {
        flag1 = 0;
      }
    }

    if (i == j) {
      if (
        (flag1 != 1 && flag2 != 1) ||
        (flag1 == 1 && flag2 == 0) ||
        (flag1 == 0 && flag2 == 1)
      ) {
        error = "*Data entered is invalid";
      } else {
        if (act[q] == 1) {
          isactive = "*Account already activated, please sign in";
        } else if (act[q] == 0) {
          isactive = "";
        }
        error = "";
      }
    } else {
      error = "*Data entered is invalid";
    }

    if (error || isactive) {
      this.setState({ error, isactive });
      return false;
    } else {
      return true;
    }
  };

  handleSubmit(e) {
    e.preventDefault();

    const userValid = this.userValidate();

    if (userValid) {
      let data = this.state.UN;
      console.log(data);
      fetch(`/activated/${data}`)
        .then(res => res.json())
        .then(requests =>
          this.setState({ requests }, () =>
            console.log("request sent: changed successfully!")
          )
        );

      //clear
      this.setState(initialState);
      ReactDOM.render(
        <div>
          <SignInForm />
        </div>,
        document.getElementById("root")
      );
    }
  }

  handleClick = link => () => {
    if (link == "s")
      ReactDOM.render(
        <div>
          <SignInForm />
        </div>,
        document.getElementById("root")
      );
  };

  componentDidMount() {
    fetch("/mainpage")
      .then(res => res.json())
      .then(requests =>
        this.setState({ requests }, () => console.log("request fetched"))
      );
  }
  render() {
    return (
      
        <div className="App__Form">
          <div className="FormCenter">
            <br />
            <br />
            <div className="FormTitle">Activate Account</div>
            <br />
            <hr color="grey" size="3" />
            <br />
            <br />

            <form onSubmit={this.handleSubmit} className="FormFields">
              <div className="FormField">
                <label className="FormField__Label" htmlFor="username">
                  User Name
                </label>
                <input
                  type="text"
                  id="username"
                  className="FormField__Input"
                  placeholder="Enter your Username"
                  name="UN"
                  value={this.state.UN}
                  onChange={this.handleChange}
                  required
                />
                {this.state.error ? (
                  <div className="error">{this.state.error}</div>
                ) : null}
              </div>

              <div className="FormField">
                <label className="FormField__Label" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="FormField__Input"
                  placeholder="Enter your Password"
                  name="pswd"
                  value={this.state.pswd}
                  onChange={this.handleChange}
                  required
                />
                {this.state.error ? (
                  <div className="error">{this.state.error}</div>
                ) : null}
              </div>

              <div className="FormField">
                <button
                  type="submit"
                  value="submit"
                  className="FormField__Button mr-20"
                >
                  Activate Account
                </button>
                <br />
                <br />
                <a className="FormField__Link" onClick={this.handleClick("s")}>
                  Already Activated? Sign In
                </a>
                <br />
                <br />
                {this.state.isactive ? (
                  <div className="error">{this.state.isactive}</div>
                ) : null}
              </div>
            </form>
          </div>
        </div>
     
    );
  }
}

export default ActivateForm;