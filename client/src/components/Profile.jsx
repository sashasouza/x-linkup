import React,{Component} from 'react';
import Top from './Top';
import Mid from './Mid';
import Down from './Down';
import Posts from './Posts';


export default class Profile extends Component{
    render(){
            return(
                <div>
                     <h2><font>My Profile</font></h2>
                    <Top />
                    <Mid />
                    <Down />
                    <Posts /><br/><br/>
                </div>
            );
    }
}