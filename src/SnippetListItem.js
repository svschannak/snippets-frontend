import React, {Component} from 'react';
import 'whatwg-fetch';

export default class SnippetListItem extends Component {
  render(){
    return(
      <li>
        <span>{this.props.snippet.name}</span>
        <hr/>
      </li>
    )
  }
}