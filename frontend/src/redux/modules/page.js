import { takeLatest, put, call } from 'redux-saga/effects';

// Actions
const FETCH_PAGES = '@page/FETCH_PAGES';
const SET_PAGES = '@page/SET_PAGES';
const SAVE_PAGE = '@page/SAVE_PAGE';
const UPDATE_SELECTED_PAGE = '@page/UPDATE_SELECTED_PAGE';

// Default state
const defaultState = {
  pages: [],
  loading: false,
  selectedPage: '',
};

// Reducer
export default function reducer(state = defaultState, action = {}) {
  switch (action.type) {
    case FETCH_PAGES:
      return {
        ...state,
        loading: action.loading,
      };
    case SET_PAGES:
      return {
        ...state,
        pages: action.pages,
        loading: action.loading,
      };
    case SAVE_PAGE:
      return {
        ...state,
        pages: action.pages,
      };
    case UPDATE_SELECTED_PAGE:
      return {
        ...state,
        selectedPage: action.selectedPage,
      };
    default:
      return state;
  }
}

// Action Creators
export function fetchPages() {
  return { type: FETCH_PAGES, loading: true };
}

export function setPages(pages) {
  return { type: SET_PAGES, pages, loading: false };
}

export function updateSelectedPage(pageId) {
  return { type: UPDATE_SELECTED_PAGE, selectedPage: pageId };
}

export function* fetchPageWatcher() {
  yield takeLatest(FETCH_PAGES, function* fetchRecords() {
    const response = yield call(fetch, 'http://localhost:8080/api/page');
    const body = yield call([response, response.json]);
    yield put(setPages(body));
  });
}
