import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Editor from 'draft-js-plugins-editor';
import createEmojiPlugin from 'draft-js-emoji-plugin';

import './InternalEditor.css';
import '../../../node_modules/draft-js-emoji-plugin/lib/plugin.css';

const emojiPlugin = createEmojiPlugin();
const { EmojiSuggestions } = emojiPlugin;
const plugins = [emojiPlugin];

class InternalEditor extends Component {
  render() {
    const {innerRef, editorState, updateEditor} = this.props;
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

Editor.propTypes = {
  innerRef: PropTypes.object.isRequired,
  editorState: PropTypes.object.isRequired,
  updateEditor: PropTypes.func.isRequired,
};

export default React.forwardRef((props, ref) => <InternalEditor innerRef={ref} {...props} />);
