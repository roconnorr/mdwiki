import React, { Component } from 'react';
import SplitPane from 'react-split-pane';
import { PageHeader } from 'antd';

import './App.css';
import 'antd/dist/antd.css';

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
        <PageHeader title="edit me" />
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
