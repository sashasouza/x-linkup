import React, { Component } from 'react';

export default class FriendRequest extends Component {

    constructor() {
        super();
        this.state = {
            requests: [],
            value: '',
            update:''
            }
        this.handleClick = this.handleClick.bind(this);
        this.handleClick1 = this.handleClick1.bind(this);
    }

    componentDidMount() {
        fetch('/friendrequests')
        .then(res => res.json())
        .then(requests => this.setState({requests}, () => console.log('requests fetched',requests)));
    }

    handleClick = (key) => (e) => {
           let id =  e.target.value;
            this.setState({update: key});
           this.setState({value: id});
           alert('Request accepted');
}

    handleClick1 = (key) => (e) => {
        let id =  e.target.value;
        this.setState({update: key});
        this.setState({value: id});
        alert('Request declined');
 }

 componentDidUpdate() {
     let val = this.state.value;
     let value = this.state.update;
     fetch(`/response/${val}/${value}`)
     .then(res => res.json());
     if(val==1) {
     fetch(`/responses/${val}/${value}`)
     .then(res => res.json());
     fetch(`/responses1/${val}/${value}`)
     .then(res => res.json());
     }
 }

    render() {
        return(
            <div className="request">
                <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>
                <h2><font>Friend Requests</font></h2>
                {this.state.requests.map(friendRequest => 
                         <div className="pos"> 
                    <img key={friendRequest.id} src={friendRequest.DP} alt="Avatar"/>
                    <div className="name_stream">
                    <p key={friendRequest.id} name={friendRequest.UN} id="name">{friendRequest.FN} {friendRequest.LN}</p>
                    <p key={friendRequest.id} id="stream">{friendRequest.Sname}</p>                    
                    </div>
                    <div className="action" id='change' key={friendRequest.UN}>
                    <button className="w3-button w3-green w3-hover-white" key={friendRequest.UN} id='yes' value='1' onClick={this.handleClick(`${friendRequest.UN}`)}>Accept</button>
                        &nbsp;&nbsp;
                        <button className="w3-button w3-khaki w3-hover-white" key={friendRequest.UN} id='no' value='2' onClick={this.handleClick1(`${friendRequest.UN}`)}>Decline</button>
                        </div>
                        </div>
                )}
                </div>
        );
    }
}