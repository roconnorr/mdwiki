import React, { Component } from 'react';
import { ContentState, EditorState } from 'draft-js';

import Editor from '../Editor';

class EditorContainer extends Component {
  constructor(props) {
    super(props);

    // load previous session content, use it to create an editorstate
    const savedContent = localStorage.getItem('textcontent') || '';
    const editorState = EditorState.createWithContent(ContentState.createFromText(savedContent));

    this.state = {
      editorState,
      editorPlainText: editorState.getCurrentContent().getPlainText(),
    };

    this.editorRef = React.createRef();
  }

  onEditorClick = () => {
    this.editorRef.current.focus();
  };

  onEditorChange = (editorState) => {
    const text = editorState.getCurrentContent().getPlainText();
    this.setState({ editorState, editorPlainText: text });
  };

  pushNewEditorState = (editorState, contentState) => {
    this.onEditorChange(EditorState.push(editorState, contentState));
  };

  render() {
    const { editorState, editorPlainText } = this.state;

    return (
      <Editor
        ref={this.editorRef}
        onEditorClick={this.onEditorClick}
        onEditorChange={this.onEditorChange}
        editorState={editorState}
        editorPlainText={editorPlainText}
        pushNewEditorState={this.pushNewEditorState}
      />
    );
  }
}

export default EditorContainer;
