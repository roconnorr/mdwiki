import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

import './Preview.css';

const Preview = ({ content }) => <ReactMarkdown source={content} />;

Preview.propTypes = {
  content: PropTypes.string.isRequired,
};

export default Preview;
