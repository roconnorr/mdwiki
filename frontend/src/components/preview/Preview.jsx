import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

import ListItemRenderer from '../elementrenderers/listitem/ListItemRenderer';

import './Preview.css';

function onCheckboxClick(event) {
  console.log(event.target);
}

const Preview = ({ content }) => (
  <ReactMarkdown
    source={content}
    renderers={{
      link: props => <a href={props.href} target="_blank" rel="noopener noreferrer">{props.children}</a>,
      listItem: props => <ListItemRenderer onClick={onCheckboxClick} {...props} />,
    }}
  />
);

Preview.propTypes = {
  content: PropTypes.string.isRequired,
};

export default Preview;
