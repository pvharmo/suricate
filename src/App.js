import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import { triggerAction } from 'redux/actions';

import View from 'components/View';

import { withStyles } from '@material-ui/core/styles';


const styles = {
  root: {
    flexGrow: 1,
  }
};

class App extends React.Component {

  shouldComponentUpdate(nextProps) {
    if (this.props.pathname !== nextProps.pathname) {
      return true;
    } else {
      return false;
    }
  }

  routes(item) {
    let route = (<Route path={item.link} render={()=> <View view={this.props.views.get(item.name)} />} key={item.name} />);
    if (item.type === "collapse") {
      route = item.submenu.map((submenu)=>{
        let subroute = (<Route path={submenu.link} render={()=> <View view={this.props.views.get(submenu.name)} />} key={submenu.name} />);
        if (submenu.type === "collapse") {
          subroute = this.routes(submenu);
        }
        return subroute;
      });
    }
    return route;
  }

  render() {
    const {classes, views, user, pathname} = this.props;
    if (user.isEmpty() && pathname !== "/login") {
      triggerAction("GO_TO_LOGIN");
      return <div></div>;
    }
    else if (!user.isEmpty() && pathname === "/login") {
      triggerAction("GO_HOME");
      return <div></div>;
    } else {
      return (
        <div className={classes.root}>
          <div className={classes.mainContainer} >
            {<Switch>
              {this.props.mainMenu.map((route)=>{
                return this.routes(route.toJS());
              })}
              <Route exact path={"/"} render={()=> <View view={this.props.views.get(views.get("main"))} />} />
            </Switch>}
          </div>
        </div>
      );
    }

  }
}

App.propTypes ={
  views: ImmutablePropTypes.map,
  classes: PropTypes.object,
  mainMenu: ImmutablePropTypes.list,
  pathname: PropTypes.string,
  user: ImmutablePropTypes.map
};

const mapStateToProps = (state) => {
  return {
    views: state.get('views'),
    mainMenu: state.get("mainMenu"),
    pathname: state.getIn(["router", "location", "pathname"]),
    user: state.get("user")
  };
};

export default connect(mapStateToProps)(withStyles(styles)(App));
