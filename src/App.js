import React, {Component} from 'react';
import './App.css';
import Login from './Login'
import SnippetManager from './SnippetManager'

class App extends Component {
  constructor() {
    super();
    this.state = {
      'isLoggedIn': 'not set',
      'currentUser': ''
    }
  }

  componentWillMount(){
    if(sessionStorage.getItem("snippet-user-token")){
      this.setState({
        isLoggedIn: true,
        currentUser: sessionStorage.getItem("snippet-user-token")
      });
    }
  }

  logout(){
    this.setState({
      isLoggedIn: 'not set',
      currentUser: ''
    });
    sessionStorage.removeItem("snippet-user-token");
  }

  setLoggedInUser(token){
    this.setState({
      isLoggedIn: true,
      currentUser: token
    });

    sessionStorage.setItem("snippet-user-token",token);
  }

  render() {
    if (this.state.isLoggedIn == true) {
      return (
        <SnippetManager currentUser={this.state.currentUser} logout={this.logout.bind(this)}/>
      );
    } else {
      return (
        <Login setLoggedInUser={this.setLoggedInUser.bind(this)}/>
      );
    }
  }
}

export default App;
