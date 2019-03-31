import React, {Component} from 'react';

export default class Updateuser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            FN: '',
            LN: '',
            bio:'',
            batch:'',
            subj:''
        }
    

        this.logChange1 = this.logChange1.bind(this); 
        
        this.logChange2 = this.logChange2.bind(this); 
        
        this.logChange3 = this.logChange3.bind(this); 
        
        this.logChange4 = this.logChange4.bind(this); 

        this.logChange = this.logChange.bind(this); // We capture the value and change state as user changes the value here.
        this.handleEdit = this.handleEdit.bind(this); // Function where we submit data
       
    }

    logChange(e) {
        this.setState({
            FN:e.target.value //setting value edited by the admin in state.
        });
    }

    logChange1(e) {
        this.setState({
            LN:e.target.value //setting value edited by the admin in state.
        });
    }
    logChange2(e) {
        this.setState({
            bio:e.target.value //setting value edited by the admin in state.
        });
    }
    logChange3(e) {
        this.setState({
            batch:e.target.value //setting value edited by the admin in state.
        });
    }
    logChange4(e) {
        this.setState({
            subj:e.target.value //setting value edited by the admin in state.
        });
    }
 
    handleEdit(event) {
        //Edit functionality
        event.preventDefault()
        
       
        fetch(`/edit/${this.state.FN}/${this.state.LN}/${this.state.bio}/${this.state.batch}/${this.state.subj}`    )
        .then(function(response) {
            return response.json();
        });

        alert('Details updated');
        
        }

   
    componentDidMount() {
        fetch('/getusers') 
    .then(res => res.json() )
    .then(users=> this.setState({users},() => console.log('requests fetched',users)));
        }
        
    
 
    render() {
        return ( 
        <div className="container"> 
            <div className="panel panel-default p50 uth-panel">

            <h2><font>Update Details </font></h2>
               
                   
                            
                        <form onSubmit={this.handleEdit} method="POST">
                            <label>Name: </label>
                            <input type='text' onChange={this.logChange} class="formcss" name="FN"/>
                            <br />
                            <label>Surname: </label>
                            <input type='text' onChange={this.logChange1} class="formcss" name="LN"/>
                            <br />
                            <label>Bio: </label>
                            <input type='text' onChange={this.logChange2} class="formcss" name="bio"/>
                            <br />
                            <label>Year: </label>
                            <input type='int' onChange={this.logChange3} class="formcss" name="batch"/>
                            <br />
                            <label>Subject: </label>
                            <input type='text' onChange={this.logChange4} class="formcss" name="subj"/>
                            <br />
                            <div className="submit-section">
                            <button type="submit" value="submit" class="formbutton" >Submit</button>
                            </div>
                        </form>
                        
               
            </div>
        </div>
        );
    }
}

