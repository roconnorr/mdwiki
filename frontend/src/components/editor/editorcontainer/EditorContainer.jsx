import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ContentState, EditorState } from 'draft-js';

import { updateEditorState } from '../../../redux/modules/editor';

import Editor from '../Editor';

import './EditorContainer.css';

class EditorContainer extends Component {
  constructor(props) {
    super(props);

    // load previous session content, use it to create an editorstate
    const savedContent = localStorage.getItem('textcontent') || '';
    const editorState = EditorState.createWithContent(ContentState.createFromText(savedContent));

    this.state = {
      editorPlainText: editorState.getCurrentContent().getPlainText(),
    };

    this.editorRef = React.createRef();
  }

  onEditorClick = () => {
    this.editorRef.current.focus();
  };

  onEditorChange = (editorState) => {
    const { updateEditor } = this.props;
    updateEditor(editorState);
    const text = editorState.getCurrentContent().getPlainText();
    this.setState({ editorPlainText: text });
  };

  pushNewEditorState = (editorState, contentState) => {
    this.onEditorChange(EditorState.push(editorState, contentState));
  };

  render() {
    const { editorPlainText } = this.state;
    const { editorState } = this.props;

    return (
      <div
        className="EditorContainer"
        role="presentation"
        onClick={this.onEditorClick}
        onKeyDown={this.onEditorClick}
      >
        <Editor
          ref={this.editorRef}
          onEditorChange={this.onEditorChange}
          editorState={editorState}
          editorPlainText={editorPlainText}
          pushNewEditorState={this.pushNewEditorState}
        />
      </div>
    );
  }
}

EditorContainer.propTypes = {
  editorState: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  editorState: state.editor.editorState,
});

const mapDispatchToProps = dispatch => bindActionCreators({ updateEditor: updateEditorState }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditorContainer);
