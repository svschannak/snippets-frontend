import React, {Component} from 'react';
import './Prism.css';
import './SnippetEditor.css';
import {
  Editor,
  EditorState,
  convertToRaw,
  convertFromRaw,
  RichUtils,
  KeyBindingUtil,
  Modifier,
} from 'draft-js';

import 'draft-js/dist/Draft.css';
import PrismDraftDecorator from 'draft-js-prism';
import BlockStyleControls from './BlockStyleControls.js';

export default class SnippetEditor extends Component {
  constructor(){
    super();
    var decorator = new PrismDraftDecorator({ defaultSyntax: 'javascript' });
    this.state = {
      editorState: EditorState.createEmpty(decorator),
      editorEnabled: true,
      placeholder: 'Write your note...',
    };

    this.onChange = (editorState, callback = null) => {

      if (this.state.editorEnabled) {
        this.setState({ editorState }, () => {
          if (callback) {
            callback();
          }
        });
      }

    };
  }

  toggleBlockType(blockType) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    );
  }


  render() {
    const { editorState, editorEnabled } = this.state;
    return (

      <div className="RichEditor-root">
        <BlockStyleControls
          editorState={editorState}
          onToggle={this.toggleBlockType.bind(this)}
        />
        <Editor
          ref="editor"
          editorState={editorState}
          editorEnabled={editorEnabled}
          onChange={this.onChange}
          placeholder={this.state.placeholder}
        />
      </div>
    );
  }
}