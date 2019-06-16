import React, { Component } from 'react';
import './Editor.css';

import { Editor as DraftJsEditor, EditorState } from 'draft-js';

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
    };
    this.onChange = editorState => this.setState({ editorState });
  }

  render() {
    const { editorState } = this.state;
    return <DraftJsEditor editorState={editorState} onChange={this.onChange} />;
  }
}

export default Editor;
