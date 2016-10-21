import React, {Component} from 'react';
import 'whatwg-fetch';

export default class SnippetListItem extends Component {

  handleClick = () => {
    console.log(this.props.snippet);

    this.props.changeCurrentSnippet(this.props.snippet.pk, this.props.snippet.name, this.props.snippet.content, this.props.snippet.language);
  };

  render(){
    return(
      <li onClick={this.handleClick}>
        <span>{this.props.snippet.name}</span>
        <hr/>
      </li>
    )
  }
}