import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import issues, { saga as issuesSaga } from './issues';
import projects, { saga as projectsSaga } from './projects';

export default combineReducers({
  issues,
  projects,
});

export function* rootSaga() {
  yield all([...issuesSaga, ...projectsSaga]);
}
