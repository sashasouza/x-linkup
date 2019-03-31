import React,{Component} from 'react';

export default class AddPost extends Component{
    
    render(){
        return(
            <div className="divStyle">
            
                <link rel='stylesheet' href='https://use.fontawesome.com/releases/v5.7.0/css/all.css' integrity='sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ' crossorigin='anonymous'></link>               
                
                <input type="text" className="inputStyle" placeholder="write something....."/>
                
                <i className="fas fa-image fa-2x" style={{align:"center",margin:"22px 10px 4px",color:"lightgrey",float:"right"}}></i>
            </div>
        );

    }
}