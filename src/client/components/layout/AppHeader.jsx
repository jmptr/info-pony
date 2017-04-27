import React from 'react';
import AppBar from 'material-ui/AppBar';
import customPropTypes from 'material-ui/utils/customPropTypes';
import Toolbar from 'material-ui/Toolbar';
import Text from 'material-ui/Text';
import { createStyleSheet } from 'jss-theme-reactor';

const styleSheet = createStyleSheet('AppHeader', () => ({
  root: {
    position: 'relative',
    width: '100%',
    marginBottom: '15px',
  },
  appBar: {
    position: 'relative',
    backgroundColor: '#4bb9a1',
  },
}));

const AppHeader = (props, context) => {
  const {
    title,
  } = props;
  const classes = context.styleManager.render(styleSheet);
  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Text type="title" colorInherit>{title}</Text>
        </Toolbar>
      </AppBar>
    </div>
  );
};

AppHeader.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};

export default AppHeader;
