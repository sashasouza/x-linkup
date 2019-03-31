import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class NewConvo extends Component {

    constructor() {
        super();
        this.state = {
            requests:[]
        }
        this.handleClick = this.handleClick.bind();
    }

    componentDidMount() {
        fetch('/new')
            .then(res => res.json())
            .then(requests => this.setState({requests}, () => console.log('requests fetched...',requests)));
    }

    handleClick = (key) => () => {
        ReactDOM.render(<div><Header /><br/><br/><Chat id={key}/><Footer /></div>,document.getElementById('root'));
    }

    render() {
        return(
             <div>
                 <h2><font>New Chat</font></h2>
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