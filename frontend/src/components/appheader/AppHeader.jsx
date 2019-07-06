import React from 'react';
import PropTypes from 'prop-types';
import {
  Alignment, Button, Navbar, Spinner, Popover, InputGroup,
} from '@blueprintjs/core';

import './AppHeader.css';

import Menu from '../menu/Menu';

const AppHeader = ({
  isSaving,
  pageTitle,
  pages,
  selectedPageId,
  onSavePage,
  onMenuItemClicked,
  onTitleChange,
}) => (
  <Navbar>
    <Navbar.Group align={Alignment.LEFT}>
      <Popover>
        <Button className="bp3-minimal" icon="menu" />
        <Menu pages={pages} onMenuItemClicked={onMenuItemClicked} selectedPageId={selectedPageId} />
      </Popover>
      <Navbar.Divider />
      <Navbar.Heading className="app-header-name">MdWiki</Navbar.Heading>
      <Navbar.Divider />
      <InputGroup placeholder="Name" value={pageTitle} onChange={onTitleChange} />
      <Navbar.Divider />
      <Button
        className="bp3-minimal"
        icon={isSaving ? <Spinner size={16} /> : 'document'}
        text="Save"
        onClick={onSavePage}
      />
    </Navbar.Group>
  </Navbar>
);

AppHeader.propTypes = {
  isSaving: PropTypes.bool.isRequired,
  pageTitle: PropTypes.string.isRequired,
  pages: PropTypes.array.isRequired,
  selectedPageId: PropTypes.string.isRequired,
  savePage: PropTypes.func.isRequired,
  onMenuItemClicked: PropTypes.func.isRequired,
  onTitleChange: PropTypes.func.isRequired,
};

export default AppHeader;
