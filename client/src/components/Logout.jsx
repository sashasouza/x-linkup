import React, { Component } from "react";
import ReactDOM from "react-dom";
import SignInForm from "./SignInForm";

export default class Logout extends Component{
    componentDidMount() {
        let id='201606721';
        fetch(`/logout`)
        .then(res => res.json());
    }

    render(){
        return(
            <div>
            <SignInForm />
            </div>
        );
    }
}