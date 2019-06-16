import React, { Component } from 'react';
import SplitPane from 'react-split-pane';

import './App.css';

import Editor from './components/editor/Editor';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pages: [],
    };
  }

  fetchPages = () => {
    fetch('/api/pages')
      .then(res => res.json())
      .then(pages => this.setState({ pages }));
  };

  render() {
    return (
      <div className="App">
        <SplitPane split="vertical" defaultSize="50%">
          <div>
            <Editor />
          </div>
          <div>right panel</div>
        </SplitPane>
      </div>
    );
  }
}

export default App;
