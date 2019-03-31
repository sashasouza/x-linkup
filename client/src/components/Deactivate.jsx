import React, { Component } from "react";
import ReactDOM from "react-dom";
import Logout from "./Logout";

export default class Deactivate extends Component{
    componentDidMount() {
        let id='201606721';
        fetch(`/deactivate`)
        .then(res => res.json());
    }

    render() {
        return(
            <div>
            <Logout />
            </div>
        );
    }
}