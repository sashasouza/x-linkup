import React, { Component } from "react";

export default class Button extends Component {
  constructor() {
    super();
    this.state = {
      uname: "",
      requests: []
    };
    this.onbuttonclick = this.onbuttonclick.bind(this);
  }

  onbuttonclick(e) {
    e.preventDefault();
    let u = this.state.requests.map(button => button.uname);
    console.log(u);
    let data = u;
    console.log(data);
    fetch(`/button1/${data}`)
      .then(res => res.json())
      .then(requests =>
        this.setState({ requests }, () =>
          console.log("request sent: changed successfully!")
        )
      );
  }

  componentDidMount() {
    fetch("/button")
      .then(res => res.json())
      .then(requests =>
        this.setState({ requests }, () =>
          console.log("requests fetched", requests)
        )
      );
  }

  render() {
    return (
      <div class="outer">
        <button class="button1" onClick={this.onbuttonclick}>
          Add Friend
        </button>
      </div>
    );
  }
}
