import React, { Component } from 'react';
import SplitPane from 'react-split-pane';
import { Alignment, Button, Navbar } from '@blueprintjs/core';

import './App.css';

import Editor from './components/editor/Editor';
import Preview from './components/preview/Preview';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pages: [],
      textContent: '',
    };

    this.editorRef = React.createRef();
  }

  fetchPages = () => {
    fetch('/api/pages')
      .then(res => res.json())
      .then(pages => this.setState({ pages }));
  };

  onEditorChange = (content) => {
    this.setState({ textContent: content });
  };

  onEditorClick = () => {
    this.editorRef.current.focus();
  };

  render() {
    const { textContent } = this.state;
    return (
      <div className="App">
        <Navbar>
          <Navbar.Group align={Alignment.LEFT}>
            <Navbar.Heading>MdWiki</Navbar.Heading>
            <Navbar.Divider />
            <Button className="bp3-minimal" icon="home" text="Home" />
            <Button className="bp3-minimal" icon="document" text="Files" />
          </Navbar.Group>
        </Navbar>
        <SplitPane split="vertical" defaultSize="50%">
          <div
            className="EditorContainer"
            role="presentation"
            onClick={this.onEditorClick}
            onKeyDown={this.onEditorClick}
          >
            <Editor onChange={this.onEditorChange} ref={this.editorRef} />
          </div>
          <div>
            <Preview content={textContent} />
          </div>
        </SplitPane>
      </div>
    );
  }
}

export default App;
