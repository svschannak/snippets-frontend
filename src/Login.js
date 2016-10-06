import React, {Component} from 'react';
import URL from './Conf.js';
import 'whatwg-fetch';

export default class Login extends Component {

  constructor() {
    super();
    this.state = {
      username: '',
      password: ''
    }
  }

  handleClick(e) {
    var self = this;
    e.preventDefault();

    fetch(URL + 'login/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: self.state.username,
        password: self.state.password
      })
    }).then(function(response) {
      return response.text();
    }).then(function(response) {
      self.props.setLoggedInUser(response.replace(/"/g, ""));
    });
  };

  handleUsernameChange(e) {
    this.setState({username: e.target.value});
  };

  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  };

  render() {

    var stylePanel = {
      'marginTop': '30px'
    };

    var styleInput = {
      'marginBottom': '12px'
    };

    return (
      <div>
        <div className="container" style={stylePanel}>
          <div className="col-md-4 col-md-offset-4">
            <div className="panel panel-default login-panel">
              <div className="panel-heading"><h3 className="panel-title"><strong>Sign in </strong></h3></div>
              <div className="panel-body">
                <form>
                  <div className="input-group" style={styleInput}>
                    <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
                    <input type="text" className="form-control login-input" name="username" value={this.state.username}
                           placeholder="username" onChange={this.handleUsernameChange.bind(this)}/>
                  </div>
                  <div className="input-group" style={styleInput}>
                    <span className="input-group-addon"><i className="glyphicon glyphicon-asterisk"></i></span>
                    <input type="password" className="form-control login-input" name="password"
                           value={this.state.password} placeholder="password"
                           onChange={this.handlePasswordChange.bind(this)}/>
                  </div>
                  <button className="btn btn-block control-btn" onClick={this.handleClick.bind(this)}>Login</button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </div>
    )
  }
}
