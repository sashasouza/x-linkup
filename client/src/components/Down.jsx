import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import Friend from './Friend';
import Footer from './Footer';


export default class Down extends Component{
    constructor() {
        super();
        this.state={
            info:[]
        }
        this.handleClick=this.handleClick.bind(this);
    }

    handleClick = () => {
        ReactDOM.render(<div><Header /><br/><br/><Friend /><Footer /></div>,document.getElementById('root'));
    }

    componentDidMount() {
        fetch('/details')
        .then(res => res.json() )
        .then(info=> this.setState({info},() => console.log('requests fetched',info)));
    }
    
    render(){
            return(
                <div class="three" >
                <link rel='stylesheet' href='https://use.fontawesome.com/releases/v5.7.0/css/all.css' integrity='sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ' crossOrigin='anonymous'></link>
                <div class="blockcontainer"> 
                { this.state.info.map(details => 
            <div class="about" style={{padding:"2%",margin:"6px",height:"20%",width: "50%",boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
            <h3 align="center"> About</h3>
           
            <p key={details.UN}> <i class="fa fa-home w"></i> {details.address} </p>
            
            <p key={details.UN}> <i class="fa fa-birthday-cake w"></i> {details.DOB}</p>

            <p key={details.UN}> <i class="fa fa-book" > </i> {details.subj} </p>

            <p key={details.UN}> <i class="fa fa-book" > </i> {details.gender} </p>


            </div> )}

            
            <div class="friends" onClick={this.handleClick} style={{margin:"6px",height:"20%",width: "50%",boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
            <h3 align="center"> Friends</h3>
                    
            </div>
            </div>
                              
                
                </div>
            );
    }}