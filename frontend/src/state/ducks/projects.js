import { call, put, select, takeLatest } from 'redux-saga/effects';
import * as api from '../../services/api.service';

// Actions
export const MAKE_REQUEST = 'issuedex/projects/MAKE_REQUEST';
export const REQUEST_SUCCESS = 'issuedex/projects/REQUEST_SUCCESS';
export const REQUEST_FAILURE = 'issuedex/projects/REQUEST_FAILURE';
export const LOAD = 'issuedex/projects/LOAD';
export const CLEAR = 'issuedex/projects/CLEAR';
export const LOADED = 'issuedex/projects/LOADED';
export const ADD = 'issuedex/projects/ADD';
export const SAVE = 'issuedex/projects/SAVE';
export const CREATED = 'issuedex/projects/CREATED';
export const UPDATED = 'issuedex/projects/UPDATED';
export const DELETE = 'issuedex/projects/DELETE';
export const DELETED = 'issuedex/projects/DELETED';
export const UPDATE_LIST = 'issuedex/projects/UPDATE_LIST';

// Reducer
export default (state = [], action) => {
  switch (action.type) {
    case UPDATE_LIST:
      return action.projects;
    case CLEAR:
      return [];
    default:
      return state;
  }
};

// Action Creators
export const add = () => ({ type: ADD });
export const save = project => ({ type: SAVE, project });
export const destroy = project => ({ type: DELETE, project });
export const load = () => ({ type: LOAD });
export const clear = () => ({ type: CLEAR });
export const updateList = projects => ({ type: UPDATE_LIST, projects });

// Selectors
export const getProjects = state => state.projects;

// Side Effects
function* saveSaga(action) {
  const { project } = action;
  const projects = yield select(getProjects);

  if (project.id) {
    const json = yield call(api.updateProject, project.id, project);
    yield put(updateList(projects.map(i => (i === project.id ? json : i))));
  } else {
    const json = yield call(api.addProject, project);
    yield put(updateList([...projects, json]));
  }
}

function* loadSaga(action) {
  const json = yield call(api.getProjects);
  yield put(updateList(json));
}

function* deleteSaga(action) {
  const { project } = action;
  const projects = yield select(getProjects);
  yield call(api.deleteProject, project.id);
  yield put(updateList(projects.filter(p => p.id !== project.id)));
}

export const saga = [
  takeLatest(SAVE, saveSaga),
  takeLatest(LOAD, loadSaga),
  takeLatest(DELETE, deleteSaga),
];
