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
  getDefaultKeyBinding
} from 'draft-js';

import 'draft-js/dist/Draft.css';
import PrismDraftDecorator from 'draft-js-prism';
import BlockStyleControls from './BlockStyleControls.js';
import CodeUtils from 'draft-js-code';

export default class SnippetEditor extends Component {
  constructor(props) {
    super(props);
    // var decorator = new PrismDraftDecorator({defaultSyntax: this.props.language});
    // let current_content = this.state.editorState.getCurrentContent();
    // this.setState({
    //   editorState: EditorState.createWithContent(current_content, decorator)
    // });
    //
    // console.log(this.props);
    var decorator = new PrismDraftDecorator({defaultSyntax: this.props.language});
    this.state = {
      editorState: EditorState.createEmpty(decorator),
      editorEnabled: true,
      placeholder: 'Write your note...',
    };
  }

  onChange = (editorState, callback = null) => {
    if (this.state.editorEnabled) {
      this.setState({editorState}, () => {
        if (callback) {
          callback();
        }
      });
    }

  };

  toggleBlockType(blockType) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    );
  }

  getBlockStyle(block) {
    switch (block.getType()) {
      case 'blockquote':
        return 'RichEditor-blockquote';
      default:
        return null;
    }
  }

  handleKeyCommand = (command) => {
    var editorState = this.state.editorState;
    var newState;

    if (CodeUtils.hasSelectionInBlock(editorState)) {
      newState = CodeUtils.handleKeyCommand(editorState, command);
    }

    if (!newState) {
      newState = RichUtils.handleKeyCommand(editorState, command);
    }

    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  };

  keyBindingFn = (e) => {
    var editorState = this.state.editorState;
    var command;

    if (CodeUtils.hasSelectionInBlock(editorState)) {
      command = CodeUtils.getKeyBinding(e);
    }
    if (command) {
      return command;
    }

    return getDefaultKeyBinding(e);
  };

  handleReturn = (e) => {
    var editorState = this.state.editorState;

    if (!CodeUtils.hasSelectionInBlock(editorState)) {
      return;
    }

    this.onChange(
      CodeUtils.handleReturn(e, editorState)
    );
    return true;
  };

  handleTab = (e) => {
    var editorState = this.state.editorState;

    if (!CodeUtils.hasSelectionInBlock(editorState)) {
      return;
    }

    this.onChange(
      CodeUtils.handleTab(e, editorState)
    );
  };

  componentWillReceiveProps(newProps){
    if(newProps.content != null){
      var decorator = new PrismDraftDecorator({defaultSyntax: this.props.language});
      let content = JSON.parse(newProps.content);
      this.setState({
        editorState: EditorState.createWithContent(convertFromRaw(content), decorator),
      })
    }

    this.is_new = newProps.current_id == null;
  };

  saveSnippet = () => {
    let raw_content = JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()));
    this.props.saveSnippet(raw_content);
  };

  render() {
    const {editorState, editorEnabled} = this.state;
    var styleMap = {
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
      fontSize: 16,
      padding: 2,
    };
    return (

      <div className="RichEditor-root">
        <BlockStyleControls
          editorState={editorState}
          onToggle={this.toggleBlockType.bind(this)}
          saveSnippet={this.saveSnippet}
          is_new={this.is_new}
        />
        <Editor
          blockStyleFn={this.getBlockStyle}
          customStyleMap={styleMap}
          editorState={editorState}
          editorEnabled={editorEnabled}
          onChange={this.onChange}
          placeholder={this.state.placeholder}
          ref="editor"
          spellCheck={false}
          keyBindingFn={this.keyBindingFn}
          handleKeyCommand={this.handleKeyCommand}
          handleReturn={this.handleReturn}
          onTab={this.handleTab}
        />
      </div>
    );
  }
}