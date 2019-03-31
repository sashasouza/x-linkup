import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import Status from './Status';

export default class Comment extends Component{
    constructor(props){
        super(props);
        this.state = {
            txt:'',
            requests:[]
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.logChange=this.logChange.bind(this);
    }
   
    componentDidMount(){
        let v=this.props.id;
        fetch(`commnts/${v}`)
        .then(res =>res.json() )
        .then(requests => this.setState({requests},() => console.log('requests fetched',requests)));
    };
    sty={
        float:"left",
        font:"bold 18px calibri",
        align:"center",
        margin:"4px",
        width:"100%"
    };
    
    
       btnStyl={
        borderRadius:"5px",
        width:"80px",
        height:"40px",
        backgroundColor:"#43B929",
        border: "none",
        textAlign:"center",
        font: "bold 16px Californian FB",
        float:"right",
        margin:"16px 8px 2px"
    };
    
    handleSubmit(event) {
        event.preventDefault();
        var data=this.state.txt;
        let vl=this.props.id;
        console.log(data);
        fetch(`comments/${vl}`)
        .then(res => res.json());
        fetch(`commentss/${data}`)
        .then(res => res.json());
        alert('New comment added');
    }
    logChange(e) {
        this.setState({txt:e.target.value});
    }
    render(){
        return(
            <div>
                
                <div style={{width:"100%",position:"absolute",border:"2px solid #daf9fc"}}>
                <h2><font>Comments</font></h2>
                <div>
                {this.state.requests.map(c =>
                <div style={{width:"100%",display:"inline-block"}}>
                <img src={require("./pexels-photo-414612.jpeg")} alt="dp" className="imgStyle"/>
                <div style={{float:"left",maxWidth:"66%",width:"auto",margin:"4px",backgroundColor:"#fffbd6",borderRadius:"8px"}}>
                <div style={this.sty}>{c.FN} {c.LN}</div>
                <div style={{font:"18px Californian FB",margin:"8px"}}>{c.c_text}</div>
                <div style={{position:"relative",marginLeft:"6px",textAlign:"right",bottom:"2px",font:"14px californian FB",color:"grey",right:"4px"}}>{c.dt}</div>
                </div>
                </div>
                )}
                </div>
                
                </div>
                
                
                <div style={{bottom:"0px",position: "fixed",width:"100%",height:"100px",backgroundColor:"#a19f9f",border:"2px solid #ccc"}}>
                <textarea style={{outline:"none",border:"none",borderRadius:"4px",width:"75%",height:"60px",resize:"none",marginLeft:"16px",marginTop:"14px"}} placeholder="Add a comment.." onChange={this.logChange} name='txt' />
                <button type="button" style={this.btnStyl} onClick={this.handleSubmit}>Send</button>
               
                </div>
                
            </div>
        );
    }
}