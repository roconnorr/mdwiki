import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Editor.css';

import { ContentState, Editor as DraftJsEditor, EditorState } from 'draft-js';

class Editor extends Component {
  constructor(props) {
    super(props);

    // load previous session content, use it to create an editorstate
    const savedContent = localStorage.getItem('textcontent');
    const editorState = EditorState.createWithContent(ContentState.createFromText(savedContent));
    this.state = {
      editorState,
    };

    // trigger onchange to populate preview
    this.onEditorChange(editorState);
  }

  onEditorChange = (editorState) => {
    const { onChange } = this.props;
    const text = editorState.getCurrentContent().getPlainText();
    onChange(text);
    localStorage.setItem('textcontent', text);
    this.setState({ editorState });
  };

  render() {
    const { editorState } = this.state;
    const { innerRef } = this.props;
    return (
      <DraftJsEditor
        editorState={editorState}
        onChange={this.onEditorChange}
        ref={innerRef}
        textAlignment="left"
      />
    );
  }
}

Editor.propTypes = {
  onChange: PropTypes.func.isRequired,
  innerRef: PropTypes.object.isRequired,
};

export default React.forwardRef((props, ref) => <Editor innerRef={ref} {...props} />);
