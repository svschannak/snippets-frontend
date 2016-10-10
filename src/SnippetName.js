import React, { Component } from 'react';

export default class SnippetName extends Component {
  constructor(){
    super();
  };

  handleChange(event){
    console.log(event.target.value);
    this.props.editCurrentName(event.target.value);
  };

  render() {

    var styleMap = {
      'padding': '15px',
      'fontSize': '1.2em',
      'width': "100%",
      'fontFamily': "'Scope One', serif"
    };

    return (
      <input type="text" className="form-control" style={styleMap} placeholder="New Snippet" value={this.props.name} onChange={this.handleChange.bind(this)} />
    );
  }
}
