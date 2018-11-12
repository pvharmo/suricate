import React from 'react';
import ReactDOM from 'react-dom';
import 'index.css';
import App from 'App.js';
import registerServiceWorker from 'registerServiceWorker';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "redux/reducers";
import rootSaga, { reHydrate } from 'redux/sagas';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware, ConnectedRouter } from 'connected-react-router/immutable';
import storage from 'store';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


const history = createBrowserHistory();





const render = async () => {

  ReactDOM.render(
    <Router history={history}>
      <App />
    </Router>, document.getElementById('root')
  );
};

render();

registerServiceWorker();
