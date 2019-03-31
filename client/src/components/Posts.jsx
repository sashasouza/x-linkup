import React,{Component} from 'react';
import Comment from './Comment';
import ReactDOM from 'react-dom';
import Header from './Header';
import Footer from './Footer';

export default class Posts extends Component{
    constructor(){
        super();
        this.state={
            postid:'',
            pid:'',
            requests:[]
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleClickk=this.handleClickk.bind(this);
    }

    iconStyle={
        fontSize:"30px",
        margin:"3px",
        padding:"6px"
    };        
    btn={
        width:"35px",
        height:"30px",
        backgroundColor:"white",
        outline:"none",
        float:"right",
        margin:"14px 4px 2px",
        padding:"2px",
        border:"none"
    };

    componentDidMount(){
        fetch('/posts')
        .then(res =>res.json() )
        .then(requests => this.setState({requests},() => console.log('requests fetched',requests)));
    };

    handleClick =(key) => (e) => {
        e.preventDefault();
        fetch(`/lk/${key}`)
        .then(res => res.json());
        fetch(`/like`)
        .then(res => res.json());
    }

    handleClickk =(key) => (e) => {
        this.setState({pid: key});
       ReactDOM.render(<div><Header /><br/><br/><Comment id={key}/><Footer /></div>,document.getElementById('root'));
    }

    render(){
            return(
                <div>
                {this.state.requests.map(stat =>
            <div style={{margin:"6px",width: "auto",boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
            <link rel='stylesheet' href='https://use.fontawesome.com/releases/v5.7.0/css/all.css' integrity='sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ' crossorigin='anonymous'></link>
            <div style={{margin:"5px",marginTop:"12px",width:"70%",height:"80px"}}>
            <img src={require("./pexels-photo-414612.jpeg")} alt="dp" className="pic"/>
            <div style={{width:"auto", margin:"8px 1px 8px",padding:"10px",float:"left"}}>
            <div style={{font:"bold 18px Californian FB"}} key={stat.Pid} id="Nm">{stat.FN} {stat.LN}</div>
            <div style={{font:"18px Cambria"}} key={stat.Pid}>{stat.P_dt}</div>
            </div>
             </div> 
             <div style={{display:"block",margin:"2px"}}>
            {stat.type === 0 ? <div style={{margin:"8px", padding:"6px",width:"auto",font:"italic 18px Cambria"}} key={stat.Pid}>
            {stat.text}
            </div> : <div> <div style={{margin:"5px",padding:"4px",font:"italic 18px Cambria"}}>
            {stat.text}
            </div>   
            <img src={require('./pexels-photo-414612.jpeg')} alt="pic" className="picStyle"/>
            </div>
            }
             </div>                  
            <button onClick={this.handleClick(`${stat.Pid}`)} style={{outline:"none",border:"none",
            backgroundColor:"white",display:'inline-block',marginTop:"2px"}} key={stat.Pid} >
            <i className="far fa-heart iconStyle" ></i></button>           
            <button style={{outline:"none",border:"none",backgroundColor:"white",display:'inline-block',marginTop:"2px"}} id="cmt"
              onClick={this.handleClickk(`${stat.Pid}`)} >
             <i className="far fa-comment iconStyle" style={this.iconStyle}></i>
             </button>
            <div style={{width:"auto",height:"26px",marginBottom:"4px"}}>
            <div style={{float:"left",marginTop:"2px",marginRight:"8px",font:"16px Californian FB"}}>{stat.lk === 1 ? <div>{stat.lk} like</div> : <div>{stat.lk} likes</div>}</div>
            <div style={{float:"left",marginTop:"2px",marginRight:"8px",font:"16px Californian FB"}}>{stat.cmt === 1 ? <div>{stat.cmt} comment</div> : <div>{stat.cmt} comments</div>}</div>
            </div>
            </div>
            )}
                </div>
            );
    }}