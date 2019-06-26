import React from 'react';
import PropTypes from 'prop-types';

import { getCoreProps } from '../../../utilities/props';

const { createElement } = React;

const ListItemRenderer = (props) => {
  const { checked, children, onClick } = props;
  let checkbox = null;
  if (checked !== null) {
    checkbox = createElement('input', {
      type: 'checkbox',
      checked,
      readOnly: true,
      onClick: e => onClick(e),
    });
  }
  return createElement('li', getCoreProps(props), checkbox, children);
};

ListItemRenderer.propTypes = {
  checked: PropTypes.bool.isRequired,
  children: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ListItemRenderer;
