import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import Chat from './Chat';
import Footer from './Footer';

export default class ChatList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            requests: []
        };
        this.handleClick=this.handleClick.bind(this);
        this.newChat=this.newChat.bind(this);
    }

    newChat = () => {
        fetch('/new')
        .then(res => res.json())
        .then(requests => this.setState({requests}, () => console.log('requests fetched...',requests)));
    }

    handleClick = (key) => () => {
        ReactDOM.render(<div><Header /><br/><br/><Chat id={key}/><Footer /></div>,document.getElementById('root'));
    }

    componentDidMount() {
        fetch('/messages')
            .then(res => res.json())
            .then(requests => this.setState({requests}, () => console.log('requests fetched...',requests)));
    }

    render() {
        return(<div>
            <h2><font>Chats</font></h2>
            <div onClick={this.newChat}>
            <a><i className="fa fa-plus"></i></a>
            </div>
            {this.state.requests.map(chatlist => 
                         <div className="pos" onClick={this.handleClick(`${chatlist.UN}`)}> 
                    <img key={chatlist.id} src={chatlist.DP} alt="Avatar"/>
                    <div className="username">
                    <p key={chatlist.id} name={chatlist.UN} id="name">{chatlist.FN} {chatlist.LN}</p>                   
                    </div>
                        </div>
                )}
        </div>
        );
    }
}
