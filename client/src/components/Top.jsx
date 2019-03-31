import React,{Component} from 'react';

export default class Top extends Component{
    constructor() {
        super();
        this.state={
            info:[]
        }
    }
    componentDidMount() {
        fetch('/details')
        .then(res => res.json() )
        .then(info=> this.setState({info},() => console.log('requests fetched',info)));
    }
    render(){
            return(
            <div class="one" >
            <div class="image">
            <img src={require("./46bbd63948f9786f7cecd870324c016c.jpg")} alt="dp" className="pic"/>
            </div>
            { this.state.info.map(details => 
            <div class="header">
                <h1 key={details.UN}> {details.FN} {details.LN} </h1>
                <h3  key={details.UN}> { details.subj} </h3>  
            </div>    
            )}                  
            </div>
        );
    }  
}