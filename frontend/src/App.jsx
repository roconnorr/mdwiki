import React, { Component } from 'react';
import { Toaster, Intent } from '@blueprintjs/core';
import { ContentState, EditorState } from 'draft-js';

import './App.css';

import AppHeader from './components/appheader/AppHeader';
import EditorContainer from './components/editor/editorcontainer/EditorContainer';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pages: [],
      isSaving: false,
      pageTitle: '',
      selectedPageId: '',
    };
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

  onTitleChange = (e) => {
    this.setState({ pageTitle: e.target.value });
  };

  onMenuItemClicked = (e) => {
    const { pages } = this.state;

    const newPageContent = pages.find(page => page.id === e.id).content;

    const editorState = EditorState.createWithContent(ContentState.createFromText(newPageContent));
    this.setState({ pageTitle: e.label, selectedPageId: e.id, editorState });
    this.onEditorChange(editorState);
  };

  render() {
    const {
      isSaving, pageTitle, pages, selectedPageId,
    } = this.state;

    return (
      <div className="App bp3-dark">
        <AppHeader
          isSaving={isSaving}
          pageTitle={pageTitle}
          pages={pages}
          selectedPageId={selectedPageId}
          onSavePage={this.onSavePage}
          onMenuItemClicked={this.onMenuItemClicked}
          onTitleChange={this.onTitleChange}
        />

        <EditorContainer />
      </div>
    );
  }
}

export default App;
