import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Editor as DraftJsEditor } from 'draft-js';

import './Editor.css';

class Editor extends Component {
  render() {
    const { innerRef, editorState, updateEditor } = this.props;
    return (
      <DraftJsEditor
        editorState={editorState}
        onChange={updateEditor}
        ref={innerRef}
        textAlignment="left"
      />
    );
  }
}

Editor.propTypes = {
  innerRef: PropTypes.object.isRequired,
  editorState: PropTypes.object.isRequired,
  updateEditor: PropTypes.func.isRequired,
};

export default React.forwardRef((props, ref) => <Editor innerRef={ref} {...props} />);
