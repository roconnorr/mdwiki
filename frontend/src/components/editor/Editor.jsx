import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Editor as DraftJsEditor } from 'draft-js';
import SplitPane from 'react-split-pane';

import './Editor.css';

import Preview from '../preview/Preview';

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
      innerRef, onEditorClick, editorState, editorPlainText,
    } = this.props;
    return (
      <SplitPane split="vertical" defaultSize="50%" className="SplitPane">
        <div
          className="EditorContainer"
          role="presentation"
          onClick={onEditorClick}
          onKeyDown={onEditorClick}
        >
          <DraftJsEditor
            editorState={editorState}
            onChange={this.onEditorChange}
            ref={innerRef}
            textAlignment="left"
          />
        </div>
        <div className="PreviewContainer">
          <Preview
            content={editorPlainText}
            editorRef={innerRef}
            editorState={editorState}
            pushNewEditorState={this.props.pushNewEditorState}
          />
        </div>
      </SplitPane>
    );
  }
}

Editor.propTypes = {
  onEditorClick: PropTypes.func.isRequired,
  innerRef: PropTypes.object.isRequired,
  onEditorChange: PropTypes.func.isRequired,
  editorState: PropTypes.object.isRequired,
  editorPlainText: PropTypes.string.isRequired,
};

export default React.forwardRef((props, ref) => <Editor innerRef={ref} {...props} />);
