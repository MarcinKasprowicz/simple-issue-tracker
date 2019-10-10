import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './state';
import Root from './screens/Root';
import { BrowserRouter } from 'react-router-dom';
import {init } from './services/auth.service';

init();

setTimeout(() => {
  const store = configureStore({});

  render(
    <Provider store={store}>
      <BrowserRouter>
        <Root />
      </BrowserRouter>
    </Provider>,
    document.getElementById('root'),
  );
}, 500);
