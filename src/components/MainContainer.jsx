import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import ModulesGrid from './internals/ModulesGrid';
import Dialogs from './internals/Dialogs';
import { ViewContext } from 'stores/ViewContext';
import PubSub from "pubsub-js";

import Nav from 'components/Nav';
import TopBar from 'components/TopBar';

import mainMenu from 'data/mainMenu';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

const drawerWidth = 230;

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
  container: {
    marginLeft: drawerWidth + 16,
    marginRight: 16,
    marginTop: 21 + 70
  }
});

function handleAction(view, actions) {
  for(let i = 0; i < actions.length; i++) {
    PubSub.publish(actions[i].action + actions[i].dialog, actions[i]);
  }
}

function MainContainer(props) {
  const { classes } = props;
  const view = useContext(ViewContext);

  return (

    <div className={classes.root}>
      <TopBar />
      <Nav menu={mainMenu} />
      <div className={classes.container} >
        <ModulesGrid />
        <Dialogs />
        {view.actionButton &&
          <Button
            onClick={handleAction.bind(this, view, view.actionButton)}
            variant="fab"
            className={classes.fab}
            color="primary">
            <AddIcon />
          </Button>
        }
      </div>
    </div>
  );
}

MainContainer.propTypes = {
  view: PropTypes.object,
  viewName: PropTypes.string,
  classes: PropTypes.object,
  mainMenu: PropTypes.array,
  modules: PropTypes.array
};

export default withStyles(styles)(MainContainer);
