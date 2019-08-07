import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { updateEditorState } from '../../../redux/modules/editor';

import InternalEditor from '../InternalEditor';

import './EditorContainer.css';

class EditorContainer extends Component {
  constructor(props) {
    super(props);
    this.editorRef = React.createRef();
  }

  onEditorClick = () => {
    this.editorRef.current.focus();
  };

  render() {
    const { editorState, updateEditor } = this.props;

    return (
      <div
        className="EditorContainer"
        role="presentation"
        onClick={this.onEditorClick}
        onKeyDown={this.onEditorClick}
      >
        <InternalEditor
          ref={this.editorRef}
          updateEditor={updateEditor}
          editorState={editorState}
        />
      </div>
    );
  }
}

EditorContainer.propTypes = {
  editorState: PropTypes.object.isRequired,
  updateEditor: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  editorState: state.editor.editorState,
});

const mapDispatchToProps = dispatch => bindActionCreators({ updateEditor: updateEditorState }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditorContainer);
