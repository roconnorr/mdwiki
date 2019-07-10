import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import {EditorState, Modifier, SelectionState} from 'draft-js';

import { updateEditorState } from '../../redux/modules/editor';

import ListItemRenderer from '../elementrenderers/listitem/ListItemRenderer';

import './Preview.css';

let checkboxIdCounter = 0;

const Preview = ({
  content, editorContent, editorState, updateEditor,
}) => {
  const onCheckboxClick = (event, checkboxId) => {
    const clickSourcePos = document
      .getElementById(checkboxId)
      .parentElement.getAttribute('data-sourcepos');

    const split1 = clickSourcePos.split('-');
    const startLine = split1[0].split(':')[0];
    // TODO: Refactor, use draftjs functionality throughout
    // const editorText = editorRef.current.editor.innerText;

    const lines = editorContent.split('\n');

    const line = lines[parseInt(startLine - 1, 10)];

    // "- [ ]" finding regex:
    // https://github.com/hackmdio/codimd/blob/4e596d724dcb1a5a19ab1e75df250767334ebfc9/public/js/extra.js#L704
    const matches = line.match(/^[>\s-]*[-+*]\s\[([x ])\]/);

    if (matches && matches.length >= 2) {
      let checked = null;
      if (matches[1] === 'x') {
        checked = true;
      } else if (matches[1] === ' ') {
        checked = false;
      }
      const replacements = matches[0].match(/(^[>\s-]*[-+*]\s\[)([x ])(\])/);

      const currentContentState = editorState.getCurrentContent();

      const blockMapArray = currentContentState.getBlockMap().toArray();

      const blockKey = blockMapArray[startLine - 1].getKey();

      // create a SelectionState encompassing the checked character
      const blockSelection = SelectionState.createEmpty(blockKey).merge({
        anchorOffset: replacements[1].length,
        focusOffset: replacements[1].length + 1,
      });

      // modify the contentstate by replacing the character inside the selectionstate
      const replaceWithChar = checked ? ' ' : 'x';
      const newContentState = Modifier.replaceText(
        currentContentState,
        blockSelection,
        replaceWithChar,
      );

      updateEditor(EditorState.push(editorState, newContentState));
    }
  };

  return (
    <ReactMarkdown
      source={editorContent}
      sourcePos
      renderers={{
        link: props => (
          <a href={props.ref} target="_blank" rel="noopener noreferrer">
            {props.children}
          </a>
        ),
        listItem: (props) => {
          checkboxIdCounter += 1;
          return (
            <ListItemRenderer
              onChange={onCheckboxClick}
              boxId={checkboxIdCounter}
              checked
              {...props}
            />
          );
        },
      }}
    />
  );
};

Preview.propTypes = {
  editorState: PropTypes.object.isRequired,
  editorContent: PropTypes.string.isRequired,
  updateEditor: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  editorState: state.editor.editorState,
  editorContent: state.editor.editorState.getCurrentContent().getPlainText(),
});

const mapDispatchToProps = dispatch => bindActionCreators({ updateEditor: updateEditorState }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Preview);
