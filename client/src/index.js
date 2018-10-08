import React from 'react';
import ReactDOM from 'react-dom';
import 'index.css';
import App from 'App';
import registerServiceWorker from 'registerServiceWorker';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from 'redux-saga';
import rootReducer from "redux/reducers";
import rootSaga from 'redux/sagas';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware, ConnectedRouter } from 'connected-react-router/immutable';
// import { ConnectedRouter } from 'connected-react-router'

const sagaMiddleware = createSagaMiddleware();
const history = createBrowserHistory();

export const store = createStore(
  connectRouter(history)(rootReducer),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  compose(
    applyMiddleware(
      routerMiddleware(history),
      sagaMiddleware
    ),
  )
);

sagaMiddleware.run(rootSaga);

const render = () => {
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

if (module.hot) {
  module.hot.accept('./App', () => {
    /* For Webpack 2.x
       Need to disable babel ES2015 modules transformation in .babelrc
       presets: [
         ["es2015", { "modules": false }]
       ]
    */
    render();

    /* For Webpack 1.x
    const NextApp = require('./App').default
    renderWithHotReload(NextApp)
    */
  });
}
