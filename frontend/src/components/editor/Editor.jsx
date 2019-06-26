import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ContentState, Editor as DraftJsEditor, EditorState } from 'draft-js';
import SplitPane from 'react-split-pane';

import './Editor.css';

import Preview from '../preview/Preview';

class Editor extends Component {
  constructor(props) {
    super(props);

    // load previous session content, use it to create an editorstate
    const savedContent = localStorage.getItem('textcontent') || '';
    const editorState = EditorState.createWithContent(ContentState.createFromText(savedContent));
    this.state = {
      editorState,
      editorPlainText: editorState.getCurrentContent().getPlainText(),
    };

    // trigger onchange to populate preview
    this.onEditorChange(editorState);
  }

  onEditorChange = (editorState) => {
    const text = editorState.getCurrentContent().getPlainText();
    localStorage.setItem('textcontent', text);
    this.setState({ editorState, editorPlainText: text });
  };

  render() {
    const { editorState, editorPlainText } = this.state;
    const { innerRef, onEditorClick } = this.props;
    return (
      <SplitPane split="vertical" defaultSize="50%">
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
          <Preview content={editorPlainText} editorRef={innerRef} />
        </div>
      </SplitPane>
    );
  }
}

Editor.propTypes = {
  onEditorClick: PropTypes.func.isRequired,
  innerRef: PropTypes.object.isRequired,
};

export default React.forwardRef((props, ref) => <Editor innerRef={ref} {...props} />);
