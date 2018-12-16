import React from 'react';
import ReactDOM from 'react-dom';
import 'index.css';
import App from 'App.js';
import registerServiceWorker from 'registerServiceWorker';

// import { createBrowserHistory } from 'history';
import { BrowserRouter as Router } from "react-router-dom";


// const history = createBrowserHistory();

ReactDOM.render(
  <Router>
    <App />
  </Router>, document.getElementById('root')
);

registerServiceWorker();
