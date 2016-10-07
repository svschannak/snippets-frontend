import React, {Component} from 'react';
import URL from './Conf.js';
import SnippetList from './SnippetList.js'
//import PrismEditor from './PrismEditor.js'
import SnippetEditor from './SnippetEditor.js'
import 'whatwg-fetch';
import BlockStyleControls from './BlockStyleControls.js';

export default class SnippetManager extends Component {
  constructor(){
    super();
    this.state = {
      snippet_list: []
    }
  }
  componentWillMount(){
    var self = this;
    fetch(URL + 'snippets/?token=' + this.props.currentUser,)
      .then(function(response) {
        return response.text();
    })
      .then(function(response) {
        var snippet_list = JSON.parse(response)['results'].map(function(snippet) {
          return snippet;
        });
        self.setState({
          snippet_list: snippet_list
        });
    });
  }

  render(){
    return(
      <div className="container-fluid">
        <div className="col-md-3">
          <SnippetList snippetList={this.state.snippet_list} />
        </div>
        <div className="col-md-7"><SnippetEditor/></div>
        <div className="col-md-2">
          <button className="btn btn-block" onClick={this.props.logout.bind(this)}>Logout</button>
        </div>
      </div>
    )
  }
}