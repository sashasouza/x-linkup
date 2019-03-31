import React, { Component } from 'react';
import './css/App.css';
import './css/styles.css';
import './css/form.css';
import ActivateForm from './components/ActivateForm';
import SignInForm from './components/SignInForm';

class App extends Component {
 
  render() {
    return (
      <div className="App">
      <SignInForm />
      </div>
    )
  }
}

export default App;
