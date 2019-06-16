import React, { Component } from 'react';
import SplitPane from 'react-split-pane';

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
  }

  fetchPages = () => {
    fetch('/api/pages')
      .then(res => res.json())
      .then(pages => this.setState({ pages }));
  };

  onEditorChange = (content) => {
    this.setState({ textContent: content });
  };

  render() {
    const { textContent } = this.state;
    return (
      <div className="App">
        <SplitPane split="vertical" defaultSize="50%">
          <div>
            <Editor onChange={this.onEditorChange} />
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
