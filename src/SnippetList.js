import React, {Component} from 'react';
import SnippetListItem from './SnippetListItem.js';
import 'whatwg-fetch';

export default class SnippetList extends Component {
  render(){
    return(
      <ul>
        {this.props.snippetList.map(function(snippet){
          return <SnippetListItem key={snippet.pk} snippet={snippet} changeCurrentSnippet={this.props.changeCurrentSnippet} />
        }, this)}
      </ul>
    )
  }
}