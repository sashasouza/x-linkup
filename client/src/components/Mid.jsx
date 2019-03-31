import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import Updateuser from './UpdateUser';
import Footer from './Footer';

export default class Mid extends Component{
    constructor() {
        super();
        this.state={
            info:[]
        }
        this.handleClick=this.handleClick.bind(this);
        this.handleClick1=this.handleClick1.bind(this);
    }

    handleClick = () => {
        ReactDOM.render(<div><Header /><br/><br/><Updateuser /><br/><Footer /></div>,document.getElementById('root'));
    }

    handleClick1 = () => {
        
    }

    componentDidMount() {
        fetch('/details')
        .then(res => res.json() )
        .then(info=> this.setState({info},() => console.log('requests fetched',info)));
    }

    render(){
            return(
                <div class="two" >
                <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>
                <div class="outer">    
           
            <button class="w3-button w3-green w3-hover-white" onClick={this.handleClick}> Edit profile </button>
            </div>
            <hr class="line" />
            { this.state.info.map(details => 
            <div style={{margin:"2px"}}>
            <p align="center" key={details.UN}>{details.bio}</p> 
            <hr class="line" />
            </div>
            )}
            </div>
                );
            }
        }