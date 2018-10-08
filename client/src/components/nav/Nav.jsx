import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from "react-router-dom";


import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const drawerWidth = 230;

const styles = theme => ({
  drawerStyle: {
    width: drawerWidth
  }
});

class Nav extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  handleCollapse(item) {
    this.setState({[item]: !this.state[item]});
  }

  link(item, nestingLevel) {
    return(
      <NavLink to={item.link} key={item.name}>
        <List component="div" disablePadding>
          <ListItem button style={{paddingLeft: 8 * nestingLevel + 24}}>
            <ListItemText inset primary={item.label} />
          </ListItem>
        </List>
      </NavLink>
    );
  }

  collapse(item, nestingLevel) {
    ++nestingLevel;
    return(
      <div key={item.name}>
        <ListItem button onClick={this.handleCollapse.bind(this, item.name)} style={{paddingLeft: 8 * (nestingLevel - 1) + 24}}>
          <ListItemText inset primary="Views" />
          {this.state[item.name] ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={this.state[item.name]} timeout="auto" unmountOnExit>
          {item.submenu.map((item)=>{
            let menu = this.link(item, nestingLevel);
            if (item.type === "collapse") {
              menu = this.collapse(item, nestingLevel);
            }
            return menu;
          })}
        </Collapse>
      </div>
    );
  }

  render() {
    const {classes} = this.props;
    let nestingLevel = 0;
    return (
      <Drawer variant="permanent" classes={{paper: classes.drawerStyle}}>
        <List
          component="nav"
          subheader={<ListSubheader component="div">Menu</ListSubheader>}>
          {this.props.menu.map((item)=>{
            let menu = <div key={item.name}></div>;
            if (item.type !== "hidden") {
              menu = this.link(item, nestingLevel);
              if (item.type === "collapse") {
                menu = this.collapse(item, nestingLevel);
              }
            }
            return menu;
          })}
        </List>
      </Drawer>

    );
  }
}

Nav.propTypes ={
  menu: PropTypes.array,
  classes: PropTypes.object,
};

export default withStyles(styles)(Nav);
