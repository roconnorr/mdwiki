import React, { Component } from 'react';
import { Alignment, Button, Navbar } from '@blueprintjs/core';

import './App.css';

import Editor from './components/editor/Editor';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pages: [],
    };

    this.editorRef = React.createRef();
  }

  fetchPages = () => {
    fetch('/api/pages')
      .then(res => res.json())
      .then(pages => this.setState({ pages }));
  };

  onEditorClick = () => {
    this.editorRef.current.focus();
  };

  render() {
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

        <Editor ref={this.editorRef} onEditorClick={this.onEditorClick} />
      </div>
    );
  }
}

export default App;
