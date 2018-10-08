import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Route, Switch } from "react-router-dom";

import View from 'components/View';

import { connect } from "react-redux";

import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
  root: {
    flexGrow: 1,
  }
});

class App extends React.Component {

  shouldComponentUpdate(nextProps) {
    if (this.props.pathname !== nextProps.pathname) {
      console.log("different");
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
    const {classes, views} = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.mainContainer} >
          {<Switch>
            {this.props.mainMenu.map((route)=>{
              return this.routes(route.toJS());
            })}
            <Route path={"/"} render={()=> <View view={this.props.views.get(views.get("main"))} />} />
          </Switch>}
        </div>
      </div>
    );
  }
}

App.propTypes ={
  views: ImmutablePropTypes.map,
  classes: PropTypes.object,
  mainMenu: ImmutablePropTypes.list,
};

const mapStateToProps = (state) => {
  return {
    views: state.get('views'),
    mainMenu: state.get("mainMenu"),
    pathname: state.getIn(["router", "location", "pathname"])
  };
};

export default connect(mapStateToProps)(withStyles(styles)(App));
