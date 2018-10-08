import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import Login from './Login';
import MainContainer from './MainContainer';

class View extends React.Component {
  render() {
    switch (this.props.view.get("template")) {
    case "login":
      return <Login view={this.props.view} />;
    default:
      return <MainContainer view={this.props.view} />;
    }
  }
}

View.propTypes ={
  view: ImmutablePropTypes.map
};

export default View;
