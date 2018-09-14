import React from 'react';
import { NavLink } from "react-router-dom";

import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

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
    let nestingLevel = 0;
    return (
      this.props.menu.map((item)=>{
        let menu = this.link(item, nestingLevel);
          if (item.type === "collapse") {
            menu = this.collapse(item, nestingLevel);
          }
          return menu;
      })
    );
  }
}

export default withStyles(styles)(Nav);
