import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import Status from './Status';
import Header from './Header';
import Footer from './Footer';

export default class CreatePost extends Component{
    constructor(){
        super();
        this.state = {
            txt:''
            
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.logChange=this.logChange.bind(this);
    }
    btn={
        float:"right",
        margin:"14px 8px 2px",
        borderRadius:"5px",
        width:"60px",
        height:"30px",
        backgroundColor:"#FFFF51",
        border: "none",
        textAlign:"center",
        font: "18px Californian FB bold"
    };
    handleSubmit(event) {
        event.preventDefault();
        var data=this.state.txt;
        
        console.log(data);
        fetch(`addp/${data}`)
        .then(res => res.json());
    }
    logChange(e) {
        this.setState({txt:e.target.value});
    }
    
    render(){
        return(
            <div>
                          
                <h2><font>Create Post</font></h2>
                
                <div style={{width:"80%",height:"80%",margin:"2px 2px 2px"}}>
               <img src={require("./983794168.jpg")} alt="dp" className="imgStyle"/>
               <form>
            <textarea className="inputStyles" placeholder="write something....." style={{float:"left",height:"auto",width:"90%"}} 
               onChange={this.logChange} name='txt' />
               <button type="button" style={this.btn} onClick={this.handleSubmit}>Post</button>
               </form>
               </div>
               
               
               
            </div>
        );
    }
} 