import React, { Component } from 'react';
import {
  Alignment,
  Button,
  Navbar,
  Spinner,
  Toaster,
  Intent,
  Popover,
  InputGroup,
} from '@blueprintjs/core';

import './App.css';

import Editor from './components/editor/Editor';
import Menu from './components/menu/Menu';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pages: [],
      isSaving: false,
      pageTitle: '',
      selectedPageId: '',
    };

    this.editorRef = React.createRef();
  }

  componentDidMount() {
    this.fetchPages();
  }

  fetchPages = async () => {
    const response = await fetch('http://localhost:8080/api/page');
    const data = await response.json();
    console.log(data);
    this.setState({ pages: data });
  };

  savePage = async () => {
    const { pageTitle } = this.state;

    // temp refhax for testing
    const editorContent = this.editorRef.current.editor.innerText;

    this.setState({ isSaving: true });
    const response = await fetch('http://localhost:8080/api/page', {
      method: 'POST',
      body: JSON.stringify({ name: pageTitle, content: editorContent }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 201) {
      setTimeout(() => {
        this.setState({ isSaving: false });
        Toaster.create().show({
          icon: 'tick',
          intent: Intent.SUCCESS,
          message: 'Saved Successfully!',
          timeout: 3000,
        });
      }, 250);
    } else {
      const data = await response.json();
      console.log(data);
      setTimeout(() => {
        this.setState({ isSaving: false });
        Toaster.create().show({
          icon: 'warning-sign',
          intent: Intent.DANGER,
          message: 'Saving was not successful.',
          timeout: 3000,
        });
      }, 250);
    }

    this.fetchPages();
  };

  onEditorClick = () => {
    this.editorRef.current.focus();
  };

  onTitleChange = (e) => {
    this.setState({ pageTitle: e.target.value });
  };

  onMenuItemClicked = (e) => {
    // also: update editor and preview
    this.setState({ pageTitle: e.label, selectedPageId: e.id });
  };

  render() {
    const {
      isSaving, pageTitle, pages, selectedPageId,
    } = this.state;

    return (
      <div className="App">
        <Navbar>
          <Navbar.Group align={Alignment.LEFT}>
            <Popover>
              <Button className="bp3-minimal" icon="menu" />
              <Menu
                pages={pages}
                onMenuItemClicked={this.onMenuItemClicked}
                selectedPageId={selectedPageId}
              />
            </Popover>
            <Navbar.Divider />
            <Navbar.Heading className="app-header-name">MdWiki</Navbar.Heading>
            <Navbar.Divider />
            <InputGroup placeholder="Name" value={pageTitle} onChange={this.onTitleChange} />
            <Navbar.Divider />
            <Button
              className="bp3-minimal"
              icon={isSaving ? <Spinner size={16} /> : 'document'}
              text="Save"
              onClick={this.savePage}
            />
          </Navbar.Group>
        </Navbar>

        <Editor ref={this.editorRef} onEditorClick={this.onEditorClick} />
      </div>
    );
  }
}

export default App;
