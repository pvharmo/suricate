import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const drawerWidth = 230;

const styles = theme => ({
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
  }
});

class TopBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      auth: true,
      anchorEl: null
    };
  }

  handleClose() {
    this.setState({anchorEl: null});
  }

  handleMenu(event) {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleToggle(key) {
    this.setState({[key]: !this.state[key]});
  }

  render() {
    const {classes} = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);
    return (
      <AppBar position="absolute"
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
                onClick={this.handleMenu.bind(this)}
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
    );
  }
}

TopBar.propTypes ={
  classes: PropTypes.object,
};

export default withStyles(styles)(TopBar);
