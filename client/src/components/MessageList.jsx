import React, { Component } from 'react';

export default class MessageList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: []
        };
        this.handleLoad=this.handleLoad.bind(this);
    }

    handleLoad = (id) => {
            fetch(`/message/${id}`)
            .then(res => res.json())
            .then(messages => this.setState({messages}, () => console.log('requests fetched...',messages)));
    }

    componentDidMount() {
        {this.handleLoad(this.props.msgs)}
    }

    render() {
        if(this.state.messages!=[]) {
        return(
            <div className='message-list'>
                {this.state.messages.map(message => {
                    return(
                        <div className='indivmsg' key={message.id}>
                          <p key={message.id}>  {message.FN} {message.LN}</p>
                          <p key={message.id}> {message.msg} </p>
                          <p key={message.id}>  {message.dt} </p>
                        </div>
                    )
                })}
            </div>
        );
    }
    else 
    return(
        <div>
        </div>
    );
}
}
