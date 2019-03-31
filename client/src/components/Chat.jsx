import React, { Component } from 'react';
import MessageList from './MessageList';
import SendMsgFrom from './SendMsgFrom';

export default class Chat extends Component {

    constructor(props) {
        super(props);
        this.state= {
        };
    }

    render() {
        return(
            <div>
                <br/><br/><div className="test"></div>
                <MessageList msgs={this.props.id}/>
                <SendMsgFrom list={this.props.id}/>
            </div>
        );
    }
}