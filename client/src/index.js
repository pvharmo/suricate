import React from 'react';
import ReactDOM from 'react-dom';
import 'index.css';
import App from 'App.js';
import registerServiceWorker from 'registerServiceWorker';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from 'redux-saga';
import rootReducer from "redux/reducers";
import rootSaga, { reHydrate } from 'redux/sagas';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware, ConnectedRouter } from 'connected-react-router/immutable';
import storage from 'store';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


const sagaMiddleware = createSagaMiddleware();
const history = createBrowserHistory();

export const store = createStore(
  connectRouter(history)(rootReducer),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  compose(
    applyMiddleware(
      routerMiddleware(history),
      sagaMiddleware
    )
  )
);



sagaMiddleware.run(rootSaga);

const render = async () => {
  await function (){
    if (storage.get('user')) {
      sagaMiddleware.run(reHydrate);
    }
  }();

  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>, document.getElementById('root')
  );
};

render();

registerServiceWorker();
