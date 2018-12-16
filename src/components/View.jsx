import React from 'react';
import PropTypes from 'prop-types';

import Login from './Login';
import MainContainer from './MainContainer';
import { ViewContext } from 'stores/ViewContext';

function ViewSwitch(props) {
  switch (props.template) {
  case "login":
    return <Login />;
  default:
    return <MainContainer />;
  }
}

function View(props) {
  return (
    <ViewContext.Provider value={props.view}>
      <ViewSwitch template={props.view.template} />
    </ViewContext.Provider>
  );
}

View.propTypes ={
  view: PropTypes.object,
};


export default View;
