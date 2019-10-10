import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import reducer, { rootSaga } from './ducks';

export default function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware();

  const middleware =
    process.env.NODE_ENV === 'production'
      ? applyMiddleware(sagaMiddleware)
      : composeWithDevTools(applyMiddleware(sagaMiddleware));

  const store = createStore(reducer, initialState, middleware);

  sagaMiddleware.run(rootSaga);

  return store;
}
