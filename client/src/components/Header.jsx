import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Footer from './Footer';
import ProfileSearch from './ProfileSearch';
import Deactivate from './Deactivate';
import Logout from './Logout';

export default class Header extends Component {
 
  constructor(props) {
    super(props);
    this.state = {visible:false, show:false, options: [], filter: [], input:''};
  this.handleClick = this.handleClick.bind(this);
  this.clicked = this.clicked.bind(this);
  this.handleChange = this.handleChange.bind(this);
  this.handleClick1 = this.handleClick1.bind(this);
  this.action = this.action.bind(this);
  this.action1 = this.action1.bind(this);
  }

  componentDidMount() {
    fetch('/search')
    .then(res => res.json())
    .then(options => this.setState({options}, () => console.log('users fetched',options)));
}

  handleClick = () => {
		this.setState(function(prevState) {
			return {visible: !prevState.visible};
    });
  }

  handleClick1 = (key) => () => {
    this.setState({filter:[]});
    ReactDOM.render(<div><Header /><br/><br/><ProfileSearch /><Footer /></div>,document.getElementById('root'));
  }

  clicked = () => {
    this.setState(function(prevState) {
			return {show: !prevState.show};
		});
  }

  handleChange = (e) => {
    this.setState({input: e.target.value});
    this.setState({filter: this.state.options.filter(item => item.FN.includes(`${this.state.input}`) || item.LN.includes(`${this.state.input}`))});
  }

  action = () => {
    ReactDOM.render(<Deactivate />,document.getElementById('root'));
    }

    action1 = () => {
      ReactDOM.render(<Logout />,document.getElementById('root'));
      }

  render() {
    return (
      <div class="navbar">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
      <div class="dropdown">
    <button class="dropbtn" onClick={this.handleClick}><i className="fa fa-bars"></i>
    </button>
    {this.state.visible && (
    <div class="dropdown-content">
  <a><i className="fa fa-question-circle"></i>&nbsp;&nbsp;Help</a>
  <a onClick={this.action}><i className="fa fa-ban" ></i>&nbsp;&nbsp;Deactivate Account</a>
  <a onClick={this.action1}><i className="fa fa-sign-out" >&nbsp;&nbsp;</i>Logout</a>
</div>)}
  </div> 
  <div class="searchbar">
  <button className="searching" onClick={this.clicked}><i className="fa fa-search"></i>
  </button>
  {this.state.show && (
    <input type="text" className="find" id="content" placeholder="Looking for someone?" onChange={this.handleChange}/>
    )}
    <div className="position">
    {this.state.filter && (this.state.filter.map(results => 
    <div className="res">
      <a key={results.id} onClick={this.handleClick1(results.UN)}><img key={results.id} src={results.DP} alt="Avatar"/> {results.FN} {results.LN}</a>
    </div>
      ))}
    </div>
    </div>
  <div className="logo">LOGO</div>
</div>
    );
  }
}