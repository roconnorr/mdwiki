import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

import './Preview.css';

const Preview = ({ content }) => (
  <ReactMarkdown
    source={content}
    renderers={{
      link: props => <a href={props.href} target="_blank" rel="noopener noreferrer">{props.children}</a>
    }}
  />
);

Preview.propTypes = {
  content: PropTypes.string.isRequired,
};

export default Preview;
