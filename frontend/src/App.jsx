import React, { Component } from 'react';
import './App.css';

import { Editor, EditorState } from 'draft-js';
import SplitPane from 'react-split-pane';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pages: [],
      editorState: EditorState.createEmpty(),
    };
    this.onChange = editorState => this.setState({ editorState });
  }

  fetchPages = () => {
    fetch('/api/pages')
      .then(res => res.json())
      .then(pages => this.setState({ pages }));
  };

  render() {
    return (
      <div className="App">
        {/* />

        <header className="App-header">

          <button onClick={this.fetchPages}>Get Pages</button>

          {this.state.pages.map(page => (
            <p>{page}</p>
          ))}
          {/* <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a> */}
        {/* </header> */}
        <SplitPane split="vertical" defaultSize="50%">
          <div><Editor editorState={this.state.editorState} onChange={this.onChange} /></div>
          <div>bn</div>
        </SplitPane>
      </div>
    );
  }
}

export default App;
