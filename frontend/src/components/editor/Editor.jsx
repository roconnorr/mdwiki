import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Editor.css';

import { Editor as DraftJsEditor, EditorState } from 'draft-js';

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
    };
  }

  onEditorChange = (editorState) => {
    const { onChange } = this.props;
    const text = editorState.getCurrentContent().getPlainText();
    onChange(text);
    this.setState({ editorState });
  };

  render() {
    const { editorState } = this.state;
    const { innerRef } = this.props;
    return (
      <DraftJsEditor editorState={editorState} onChange={this.onEditorChange} ref={innerRef} />
    );
  }
}

Editor.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default React.forwardRef((props, ref) => <Editor innerRef={ref} {...props} />);
