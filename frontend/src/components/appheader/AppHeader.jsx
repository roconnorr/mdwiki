import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Alignment, Button, Navbar, Spinner, Popover, InputGroup,
} from '@blueprintjs/core';

import { updateSelectedPage } from '../../redux/modules/page';

import './AppHeader.css';

import Menu from '../menu/Menu';

const AppHeader = ({
  isSaving,
  pageTitle,
  pages,
  selectedPage,
  onSavePage,
  updateSelectedPage,
  onTitleChange,
}) => (
  <Navbar>
    <Navbar.Group align={Alignment.LEFT}>
      <Popover>
        <Button className="bp3-minimal" icon="menu" />
        <Menu pages={pages} onMenuItemClicked={updateSelectedPage} selectedPageId={selectedPage} />
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

const mapStateToProps = state => ({
  loadingPages: state.page.loading,
  pages: state.page.pages,
  selectedPage: state.page.selectedPage,
});

const mapDispatchToProps = dispatch => bindActionCreators({ updateSelectedPage }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);
