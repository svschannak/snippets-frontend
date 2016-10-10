import React, {Component} from 'react';
import URL from './Conf.js';
import SnippetList from './SnippetList.js';
import SnippetEditor from './SnippetEditor.js';
import SnippetName from './SnippetName.js';
import 'whatwg-fetch';

export default class SnippetManager extends Component {
  constructor(){
    super();
    this.state = {
      snippet_list: [],
      current_content: [],
      current_name: '',
      current_language: 'javascript'
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

  editCurrentName = (value) => {
    this.setState({
      current_name: value
    })
  };

  saveCurrentSnippet = (snippet_content) => {
    let dataset = {
      'name': this.state.current_name,
      'content': snippet_content,
      'language': this.state.current_language
    };

    fetch(URL + 'snippets/?token=' + this.props.currentUser,{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataset)
    });
  };

  change_language = (e) => {
    this.setState({
      current_language: e.target.value
    })
  };


  render(){

    var styleMap = {
      'marginTop': '10px'
    };

    return(
      <div className="container-fluid" style={styleMap}>
        <div className="col-md-3">
          <SnippetList snippetList={this.state.snippet_list} />
        </div>
        <div className="col-md-7">
          <div className="row">
            <div className="col-md-9">
              <SnippetName name={this.state.current_name} editCurrentName={this.editCurrentName} />
            </div>
            <div className="col-md-3">
              <select className="form-control" value={this.state.current_language} onChange={this.change_language}>
                <option value="css">CSS</option>
                <option value="javascript">JavaScript</option>
              </select>
            </div>
          </div>
          <SnippetEditor saveSnippet={this.saveCurrentSnippet} language={this.state.current_language}/>
        </div>
        <div className="col-md-2">
          <button className="btn btn-block" onClick={this.props.logout.bind(this)}>Logout</button>
        </div>
      </div>
    )
  }
}