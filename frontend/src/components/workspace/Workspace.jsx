import React, { Component } from 'react';
import SplitPane from 'react-split-pane';

import EditorContainer from '../editor/editorcontainer/EditorContainer';
import Preview from '../preview/Preview';

import './Workspace.css';

class Workspace extends Component {
  render() {
    return (
      <SplitPane split="vertical" defaultSize="50%" className="SplitPane">
        <EditorContainer />
        <div className="PreviewContainer">
          <Preview />
        </div>
      </SplitPane>
    );
  }
}

export default Workspace;
