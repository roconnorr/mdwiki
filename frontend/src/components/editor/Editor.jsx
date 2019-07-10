import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Editor as DraftJsEditor } from 'draft-js';

import './Editor.css';

class Editor extends Component {
  constructor(props) {
    super(props);

    // trigger onchange to populate preview
    this.onEditorChange(props.editorState);
  }

  onEditorChange = (editorState) => {
    const { onEditorChange } = this.props;
    onEditorChange(editorState);
  };

  render() {
    const {
      innerRef, editorState,
    } = this.props;
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
  innerRef: PropTypes.object.isRequired,
  onEditorChange: PropTypes.func.isRequired,
  editorState: PropTypes.object.isRequired,
  editorPlainText: PropTypes.string.isRequired,
};

export default React.forwardRef((props, ref) => <Editor innerRef={ref} {...props} />);
