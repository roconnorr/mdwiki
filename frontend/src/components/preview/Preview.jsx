import React from 'react';
import PropTypes from 'prop-types';

import './Preview.css';

const Preview = ({ content }) => <div>{content}</div>;

Preview.propTypes = {
  content: PropTypes.string.isRequired,
};

export default Preview;
