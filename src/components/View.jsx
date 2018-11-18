import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import Login from './Login';
import MainContainer from './MainContainer';

function View(props) {
  switch (props.view.get("template")) {
  case "login":
    return <Login view={props.view} />;
  default:
    return <MainContainer />;
  }
}

View.propTypes ={
  view: ImmutablePropTypes.map,
};


export default View;
