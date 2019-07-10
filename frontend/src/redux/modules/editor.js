import { EditorState, ContentState } from 'draft-js';

// Actions
const UPDATE_EDITOR_STATE = '@editor/UPDATE_EDITOR_STATE';

// Default state
const defaultState = {
  editorState: EditorState.createEmpty(),
};

// Reducer
export default function reducer(state = defaultState, action = {}) {
  switch (action.type) {
    case UPDATE_EDITOR_STATE:
      return {
        ...state,
        editorState: action.editorState,
      };
    default:
      return state;
  }
}

// Action Creators
export function updateEditorState(editorState) {
  return { type: UPDATE_EDITOR_STATE, editorState };
}

export function updateEditorStatePlainText(text) {
  const editorState = EditorState.createWithContent(ContentState.createFromText(text));
  return { type: UPDATE_EDITOR_STATE, editorState };
}
