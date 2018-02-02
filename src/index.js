import ReactDOM from 'react-dom';
import React from 'react';
import App from 'App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from 'actions/reducers';
import logger from 'redux-logger';

const store = createStore(reducer, applyMiddleware(thunk, logger));

ReactDOM.render(
  <Provider store={store}>
		<App />
	</Provider>,
  document.getElementById('empDir')
);