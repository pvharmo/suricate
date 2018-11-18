import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const drawerWidth = 230;

const styles = () => ({
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

function TopBar(props) {
  const {classes} = props;

  return (
    <AppBar position="absolute"
      className={classes.appbar}>
      <Toolbar>
        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
          <MenuIcon />
        </IconButton>
        <div className={classes.flex}></div>
      </Toolbar>
    </AppBar>
  );
}

TopBar.propTypes ={
  classes: PropTypes.object,
};

export default withStyles(styles)(TopBar);
