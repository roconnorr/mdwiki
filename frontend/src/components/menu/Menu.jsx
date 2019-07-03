import React from 'react';
import PropTypes from 'prop-types';
import { Tree } from '@blueprintjs/core';

import './Menu.css';

const treeItem = {
  hasCaret: false,
  icon: 'document',
};

const Menu = ({ pages }) => {
  const data = pages.map(page => ({ id: page.id, label: page.name, ...treeItem }));
  return <Tree contents={data} />;
};

Menu.propTypes = {
  pages: PropTypes.array.isRequired,
};

export default Menu;
