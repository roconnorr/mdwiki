import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

import './Preview.css';

const { createElement } = React;

// copied from react-markdown for passing props to element renderers
function getCoreProps(props) {
  return props['data-sourcepos'] ? { 'data-sourcepos': props['data-sourcepos'] } : {};
}

const Preview = ({ content }) => (
  <ReactMarkdown
    source={content}
    renderers={{
      link: props => <a href={props.href} target="_blank" rel="noopener noreferrer">{props.children}</a>,
      listItem: (props) => {
        const { checked, children } = props;
        let checkbox = null;
        if (checked !== null) {
          checkbox = createElement('input', { type: 'checkbox', checked, readOnly: true });
        }
        return createElement('li', getCoreProps(props), checkbox, children);
      },
    }}
  />
);

Preview.propTypes = {
  content: PropTypes.string.isRequired,
};

export default Preview;
