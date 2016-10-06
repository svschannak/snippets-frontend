import React, {Component} from 'react';
import 'whatwg-fetch';

export default class SnippetListItem extends Component {
  render(){
    return(
      <li>
        <span>{this.props.snippet.name}</span>
        <br/>
        <span>{this.props.snippet.content}</span>
        <hr/>
      </li>
    )
  }
}