import React from 'react';
import ReactDOM from 'react-dom';
import 'index.css';
import App from 'App';
import registerServiceWorker from 'registerServiceWorker';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from 'redux-saga';
import rootReducer from "redux/reducers";
import rootSaga from 'redux/sagas';

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
