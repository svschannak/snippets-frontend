import React, {Component} from 'react';
import URL from './Conf.js';
import 'whatwg-fetch';

export default class SnippetManager extends Component {

  componentWillMount(){
    console.log(this.props.currentUser);
    fetch(URL + 'snippets/?token=' + this.props.currentUser).then(function(response) {
      return response.text();
    }).then(function(response) {
      console.log(response);
    });
  }

  render(){
    return(
      <div className="container-fluid">
        <div className="col-md-3">Snippet-Liste</div>
        <div className="col-md-7">Snippet Detail</div>
        <div className="col-md-2">Snippet Menü</div>
      </div>
    )
  }
}