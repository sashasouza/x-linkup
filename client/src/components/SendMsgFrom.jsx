import React, { Component } from 'react';

export default class SendMsgFrom extends Component {

    constructor(props) {
        super(props);
        this.state = {
            msg: '',
            id:'',
            list: []
        };
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleLoad=this.handleLoad.bind(this);
        this.handleChange=this.handleChange.bind(this);
    }

    handleSubmit = (e) => {
        const id='201606721';
        var i;
        if(this.state.list[0].UN2!=id) {
         i=this.state.list[0].UN2;}
        else {i=this.state.list[0].UN1}
        fetch(`/sendmsg/${i}/${this.state.msg}`)
        .then(res => res.json());
        alert('Message sent');
    }

    handleLoad = (id) => {
            
            fetch(`/new/${id}`)
            .then(res => res.json())
            .then(list => this.setState({list}, () => console.log('requests fetched...',list)));

    }

    handleChange = (e) => {
        this.setState({
            msg: e.target.value,
        });
    }

    componentDidMount() {
        {this.handleLoad(this.props.list)}
    }

    render() {
        return(<div className="msgsend">
            <input type="text" className="newmsg" onChange={this.handleChange} value={this.state.msg} placeholder="Type message here"/>
             <button type="submit" onClick={this.handleSubmit}>Send</button>
            </div>
        );
    }
}