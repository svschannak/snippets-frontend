import React, {Component} from 'react';
import StyleButton from './StyleButton.js'

const BLOCK_TYPES = [
  {label: 'Snippet Block', style: 'code-block'},
  {label: 'H1', style: 'header-one'},
  {label: 'H2', style: 'header-two'},
  {label: 'Blockquote', style: 'blockquote'},
  {label: 'UL', style: 'unordered-list-item'},
  {label: 'OL', style: 'ordered-list-item'},
];

export default class BlockStyleControls extends Component {

  render(){
    return (
      <div className="RichEditor-controls">
        {BLOCK_TYPES.map((type) =>
          <StyleButton
            key={type.label}
            active={type.style === this.props.blockType}
            label={type.label}
            onToggle={this.props.onToggle}
            style={type.style}
          />
        )}

        || <button className="btn" onClick={this.props.saveSnippet}>Save Snippet</button>
      </div>
    );

  }
}