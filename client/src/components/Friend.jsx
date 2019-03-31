import React, { Component } from "react";
import ReactDOM from 'react-dom';
import Profile from "./Profile";
import Header from './Header';
import Footer from './Footer';

export default class Friend extends Component {
  constructor() {
    super();
    this.state = {
      info: []
    };
    this.handleClick=this.handleClick.bind(this);
  }

  handleClick = () => {
    ReactDOM.render(<div><Header /><br/><br/><Profile /><Footer /></div>,document.getElementById('root'));
  }

  componentDidMount() {
    fetch("/friends")
      .then(res => res.json())
      .then(info =>
        this.setState({ info }, () => console.log("requests fetched", info))
      );
  }

  render() {
    return (
      <div>
        <h2><font>Friends</font></h2>
        {this.state.info.map(details => (
          <div class="friend">
            <br />
            <img alt="Dp" src={details.dp} />
            <p key={details.id} onClick={this.handleClick}>  {details.FN} {details.LN}  </p>
            <br />
          </div>
        ))}
      </div>
    );
  }
}
