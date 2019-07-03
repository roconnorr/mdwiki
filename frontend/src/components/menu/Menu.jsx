import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Tree } from '@blueprintjs/core';

import './Menu.css';

const treeItem = {
  hasCaret: false,
  icon: 'document',
};

const Menu = ({ pages, onMenuItemClicked, selectedPageId }) => {
  const [selectedId, setSelectedId] = useState(selectedPageId);

  const onClick = (e) => {
    setSelectedId(e.id);
    onMenuItemClicked(e);
  };

  const data = pages.map(page => ({
    id: page.id,
    label: page.name,
    isSelected: page.id === selectedId,
    ...treeItem,
  }));

  return <Tree contents={data} onNodeClick={onClick} />;
};

Menu.propTypes = {
  pages: PropTypes.array.isRequired,
  onMenuItemClicked: PropTypes.func.isRequired,
  selectedPageId: PropTypes.string.isRequired,
};

export default Menu;
