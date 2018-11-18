import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from "react-router-dom";

import View from 'components/View';

import { withStyles } from '@material-ui/core/styles';


const styles = {
  root: {
    flexGrow: 1,
  }
};


function routes(item, views) {
  let route = (<Route path={item.link} render={() => <View view={views.get(item.name)} />} key={item.name} />);
  if (item.type === "collapse") {
    route = item.submenu.map((submenu) => {
      let subroute = (<Route path={submenu.link} render={() => <View view={views.get(submenu.name)} />} key={submenu.name} />);
      if (submenu.type === "collapse") {
        subroute = routes(submenu);
      }
      return subroute;
    });
  }
  return route;
}

function App(props) {
  const { classes, views, user, pathname, mainMenu } = props;
  if (user.isEmpty() && pathname !== "/login") {
    return <Redirect to='/login' />;
  }
  else if (!user.isEmpty() && pathname === "/login") {
    return <Redirect to='/' />;
  } else {
    return (
      <div className={classes.root}>
        <div className={classes.mainContainer} >
          {<Switch>
            {mainMenu.map((route) => {
              return routes(route.toJS(), views);
            })}
            <Route exact path={"/"} render={() => <View view={views.get(views.get("main"))} />} />
          </Switch>}
        </div>
      </div>
    );
  } 
}

App.propTypes = {
  view: PropTypes.object,
  viewName: PropTypes.string,
  classes: PropTypes.object,
  mainMenu: PropTypes.array
};

export default withStyles(styles)(App);