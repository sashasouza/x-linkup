import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import FriendRequest from './FriendRequest';
import Header from './Header';
import Location from './Location';
import ChatList from './ChatList';
import Profile from './Profile';
import Status from './Status';

export default class Footer extends Component {

    constructor() {
        super();
        this.handleClick=this.handleClick.bind(this);
    }

    handleClick = (link) => () => {
        if(link=='f') ReactDOM.render(<div><Header /><br/><br/><FriendRequest /><Footer /></div>,document.getElementById('root'));
        if(link=='l') ReactDOM.render(<div><Header /><br/><br/><Location /><Footer /></div>,document.getElementById('root'));
        if(link=='c') ReactDOM.render(<div><Header /><br/><br/><ChatList /><Footer /></div>,document.getElementById('root'));
        if(link=='p') ReactDOM.render(<div><Header /><br/><br/><Profile /><Footer /></div>,document.getElementById('root'));
        if(link=='h') ReactDOM.render(<div><Header /><br/><br/><Status /><br/><br/><Footer /></div>,document.getElementById('root'));
    }

    render() {
        return(
            <div className="icon-bar">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
                <a  onClick={this.handleClick('l')}><i className="fa fa-map-marker"></i></a> 
                <a  onClick={this.handleClick('f')}><i className="fa fa-group"></i></a>
                <a  onClick={this.handleClick('h')}><i className="fa fa-home"></i></a>
                <a  onClick={this.handleClick('c')}><i className="fa fa-comment"></i></a> 
                <a  onClick={this.handleClick('p')}><i className="fa fa-user"></i></a>
            </div>
        );
    }

}
