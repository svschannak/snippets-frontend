import React, {Component} from 'react';

import {
  EditorState,
  convertToRaw,
  convertFromRaw,
  KeyBindingUtil,
  Modifier,
} from 'draft-js';

import 'draft-js/dist/Draft.css';
import PrismDecorator from 'draft-js-prism';

export default class SnippetEditor extends Component {
  constructor(){
    super();
    var decorator = new PrismDecorator;
    this.state = {
      editorState: EditorState(decorator),
      editorEnabled: true,
      placeholder: 'Write your note...',
    }
  }

  render() {
    const { editorState, editorEnabled } = this.state;
    return (
      <div>
        <Editor
          ref="editor"
          editorState={editorState}
          editorEnabled={editorEnabled}
          placeholder={this.state.placeholder}
        />
      </div>
    );
  }
}