import React from 'react';
import { Tree } from '@blueprintjs/core';

import './Menu.css';

const INITIAL_STATE = [
  {
    id: 0,
    hasCaret: true,
    icon: 'folder-close',
    label: 'Folder 0',
  },
];

const Menu = () => <Tree contents={INITIAL_STATE} />;

export default Menu;
