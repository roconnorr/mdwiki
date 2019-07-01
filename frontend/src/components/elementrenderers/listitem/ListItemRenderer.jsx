import React from 'react';
import PropTypes from 'prop-types';

import { getCoreProps } from '../../../utilities/props';

const { createElement } = React;

const ListItemRenderer = (props) => {
  const { boxId, checked, children, onChange } = props;
  const elementId = `checkBox${boxId}`;

  let checkbox = null;
  if (checked !== null) {
    checkbox = createElement('input', {
      id: elementId,
      type: 'checkbox',
      checked,
      onChange: e => onChange(e, elementId),
    });
  }
  return createElement('li', getCoreProps(props), checkbox, children);
};

ListItemRenderer.propTypes = {
  boxId: PropTypes.number.isRequired,
  checked: PropTypes.bool,
  children: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ListItemRenderer;
