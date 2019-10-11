import { call, put, select, takeLatest } from 'redux-saga/effects';
import * as api from '../../services/api.service';

// Actions
export const MAKE_REQUEST = 'issuedex/issues/MAKE_REQUEST';
export const REQUEST_SUCCESS = 'issuedex/issues/REQUEST_SUCCESS';
export const REQUEST_FAILURE = 'issuedex/issues/REQUEST_FAILURE';
export const LOAD = 'issuedex/issues/LOAD';
export const CLEAR = 'issuedex/issues/CLEAR';
export const LOADED = 'issuedex/issues/LOADED';
export const ADD = 'issuedex/issues/ADD';
export const SAVE = 'issuedex/issues/SAVE';
export const START = 'issuedex/issues/START';
export const CLOSE = 'issuedex/issues/CLOSE';
export const CREATED = 'issuedex/issues/CREATED';
export const UPDATED = 'issuedex/issues/UPDATED';
export const DELETE = 'issuedex/issues/DELETE';
export const DELETED = 'issuedex/issues/DELETED';
export const UPDATE_LIST = 'issuedex/issues/UPDATE_LIST';

// Reducer
export default (state = [], action) => {
  switch (action.type) {
    case UPDATE_LIST:
      return action.issues;
    case CLEAR:
      return [];
    default:
      return state;
  }
};

// Action Creators
export const add = () => ({ type: ADD });
export const save = issue => ({ type: SAVE, issue });
export const destroy = issue => ({ type: DELETE, issue });
export const load = projectId => ({ type: LOAD, projectId });
export const clear = () => ({ type: CLEAR });
export const start = issue => ({ type: START, issue });
export const close = issue => ({ type: CLOSE, issue });
export const updateList = issues => ({ type: UPDATE_LIST, issues });

// Selectors
export const getIssues = state => state.issues;

// Side Effects
function* saveSaga(action) {
  const { issue } = action;
  const issues = yield select(getIssues);

  if (issue.id) {
    const json = yield call(api.updateIssue, issue.projectId, issue.id, issue);
    yield put(updateList(issues.map(i => (i === issue.id ? json : i))));
  } else {
    const json = yield call(api.addIssue, issue.projectId, issue);
    yield put(updateList([...issues, json]));
  }
}

function* loadSaga(action) {
  const { projectId } = action;
  const json = yield call(api.getIssues, projectId);
  yield put(updateList(json));
}

function* deleteSaga(action) {
  const { issue } = action;
  const issues = yield select(getIssues);
  yield call(api.deleteIssue, issue.projectId, issue.id);
  yield put(updateList(issues.filter(i => i.id !== issue.id)));
}

function* startSaga(action) {
  const { issue } = action;
  const issues = yield select(getIssues);
  const json = yield call(api.updateIssue, issue.projectId, issue.id, {
    ...issue,
    state: 'PENDING',
  });
  yield put(updateList(issues.map(i => (i.id === issue.id ? json : i))));
}

function* closeSaga(action) {
  const { issue } = action;
  const issues = yield select(getIssues);
  const json = yield call(api.updateIssue, issue.projectId, issue.id, {
    ...issue,
    state: 'CLOSED',
  });
  yield put(updateList(issues.map(i => (i.id === issue.id ? json : i))));
}

export const saga = [
  takeLatest(SAVE, saveSaga),
  takeLatest(LOAD, loadSaga),
  takeLatest(DELETE, deleteSaga),
  takeLatest(START, startSaga),
  takeLatest(CLOSE, closeSaga),
];
