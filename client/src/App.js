import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";

import View from 'components/View';

import { connect } from "react-redux";

import { withStyles } from '@material-ui/core/styles';



const hist = createBrowserHistory();

const styles = theme => ({
  root: {
    flexGrow: 1,
  }
});

class App extends React.Component {


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
    const {classes} = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.mainContainer} >
          {<Switch>
            {this.props.mainMenu.map((route)=>{
              return this.routes(route.toJS());
            })}
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
    mainMenu: state.get("mainMenu")
  };
};

export default connect(mapStateToProps)(withStyles(styles)(App));
