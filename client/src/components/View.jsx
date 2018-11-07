import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import Login from './Login';
import MainContainer from './MainContainer';

import { connect } from "react-redux";

class View extends React.Component {

  render() {
    switch (this.props.view.get("template")) {
    case "login":
      return <Login view={this.props.view} />;
    default:
      return <MainContainer  />;
    }
  }
}

View.propTypes ={
  view: ImmutablePropTypes.map,
};

const mapStateToProps = (state) => ({
  data: state.get("data").toJS(),
  mainMenu: state.get("mainMenu"),
});


export default connect(mapStateToProps, null)(View);
