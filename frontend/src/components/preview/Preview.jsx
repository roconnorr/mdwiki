import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

import ListItemRenderer from '../elementrenderers/listitem/ListItemRenderer';

import './Preview.css';

let checkboxIdCounter = 0;

const Preview = ({ content, editorRef }) => {
  const onCheckboxClick = (event, checkboxId) => {
    const clickSourcePos = document.getElementById(checkboxId).parentElement.getAttribute('data-sourcepos');

    const split1 = clickSourcePos.split('-');
    const startLine = split1[0].split(':')[0];
    const editorText = editorRef.current.editor.innerText;

    const lines = editorText.split('\n');

    const line = lines[parseInt(startLine - 1, 10)];

    // - [ ] finding regex
    const matches = line.match(/^[>\s-]*[-+*]\s\[([x ])\]/);
  };


  return (
    <ReactMarkdown
      source={content}
      sourcePos
      renderers={{
        link: props => <a href={props.ref} target="_blank" rel="noopener noreferrer">{props.children}</a>,
        listItem: (props) => {
          checkboxIdCounter += 1;
          return <ListItemRenderer onChange={onCheckboxClick} boxId={checkboxIdCounter} checked {...props} />;
        },
      }}
    />
  );
};

Preview.propTypes = {
  content: PropTypes.string.isRequired,
  editorRef: PropTypes.object.isRequired,
};

export default Preview;
