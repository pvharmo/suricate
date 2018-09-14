import React from 'react';
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
// import { socket } from './socket.js';

import mainMenu from './data/mainMenu.js';
import views from './data/views.js';

import Nav from './components/nav/Nav';
import View from './components/view/View';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Drawer from '@material-ui/core/Drawer';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';


const hist = createBrowserHistory();
const drawerWidth = 230;

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  flex: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  appbar: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
  },
  drawerStyle: {
    width: drawerWidth,
  },
  mainContainer: {
    marginLeft: drawerWidth + 16,
    marginRight: 16,
    marginTop: 21
  }
});

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      auth: true,
      anchorEl: null
    };
  }

  handleClose() {
    this.setState({anchorEl: null})
  }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleToggle(key) {
    this.setState({[key]: !this.state[key]});
  }

  routes(item) {
    let route = (<Route path={item.link} render={()=> <View view={views[item.name]} />} key={item.name} />);
    if (item.type === "collapse") {
      route = item.submenu.map((submenu)=>{
        let subroute = (<Route path={submenu.link} render={()=> <View view={views[submenu.name]} />} key={submenu.name} />);
        if (submenu.type === "collapse") {
          subroute = this.routes(submenu);
        }
        return subroute;
      });
    }
    return route;
  }

  render() {
    const { classes } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <Router history={hist}>
        <div className={classes.root}>
          <AppBar position="static"
            className={classes.appbar}>
            <Toolbar>
              <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                <MenuIcon />
              </IconButton>
              <div className={classes.flex}></div>
              {auth && (
                <div>
                  <IconButton
                    aria-owns={open ? 'menu-appbar' : null}
                    aria-haspopup="true"
                    onClick={this.handleMenu}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={open}
                    onClose={this.handleClose.bind(this)}
                  >
                    <MenuItem onClick={this.handleClose.bind(this)}>Profile</MenuItem>
                    <MenuItem onClick={this.handleClose.bind(this)}>My account</MenuItem>
                  </Menu>
                </div>
              )}
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" classes={{paper: classes.drawerStyle}}>
            <List
              component="nav"
              subheader={<ListSubheader component="div">Menu</ListSubheader>}>
              <Nav menu={mainMenu} />
            </List>
          </Drawer>
          <div className={classes.mainContainer} >
            <Switch>
              {mainMenu.map((route)=>{
                return this.routes(route);
              })}
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default withStyles(styles)(App);
