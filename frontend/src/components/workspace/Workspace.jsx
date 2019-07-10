import React from 'react';
import SplitPane from 'react-split-pane';

import EditorContainer from '../editor/editorcontainer/EditorContainer';
import Preview from '../preview/Preview';

import './Workspace.css';

const Workspace = () => (
  <SplitPane split="vertical" defaultSize="50%" className="SplitPane">
    <EditorContainer />
    <div className="PreviewContainer">
      <Preview />
    </div>
  </SplitPane>
);


export default Workspace;
