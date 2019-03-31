import React,{Component} from 'react';
import Top from './Top';
import Mid from './Mid';
import Down from './Down';
import Posts from './Posts';


export default class ProfileSearch extends Component{
    render(){
            return(
                <div>
                     <h2><font>Profile</font></h2>
                    <Top />
                    <Mid />
                    <Down />
                    <Posts /><br/><br/>
                </div>
            );
    }
}