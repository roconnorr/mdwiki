import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Editor from 'draft-js-plugins-editor';

import { emojiPlugin, EmojiSuggestions } from './plugins/emojiplugin/EmojiPlugin';

import './InternalEditor.css';

const plugins = [emojiPlugin];

class InternalEditor extends Component {
  render() {
    const { innerRef, editorState, updateEditor } = this.props;
    return (
      <Fragment>
        <Editor
          editorState={editorState}
          onChange={updateEditor}
          ref={innerRef}
          textAlignment="left"
          plugins={plugins}
        />
        <EmojiSuggestions />
      </Fragment>
    );
  }
}

InternalEditor.propTypes = {
  innerRef: PropTypes.object.isRequired,
  editorState: PropTypes.object.isRequired,
  updateEditor: PropTypes.func.isRequired,
};

export default React.forwardRef((props, ref) => <InternalEditor innerRef={ref} {...props} />);
