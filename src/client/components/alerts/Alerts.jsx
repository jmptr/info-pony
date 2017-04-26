import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
} from 'material-ui/Card';
import customPropTypes from 'material-ui/utils/customPropTypes';
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from 'material-ui/List';
import Icon from 'material-ui/Icon';
import Text from 'material-ui/Text';
import { connect } from 'react-redux';

export const Alerts = ({ alerts }) => {
  const toTime = (ref) => (new Date(ref)).toLocaleTimeString()
  const toMessage = (alert) => {
    let message = `${alert.meta} - ${alert.message} @ Opened: ${toTime(alert.captured)}`;
    if (alert.closed) {
      message = `${message} Closed: ${toTime(alert.closed)}`;
    }
    return message;
  };

  return (
    <Text>
      <List>
          <ListItem>
            <ListItemText primary={`Alerts ${alerts.length}`} />
          </ListItem>
        {alerts && alerts.map((alert) => <ListItem key={alert.captured}>
          <ListItemIcon>
            <Icon>memory</Icon>
          </ListItemIcon>
          <ListItemText primary={toMessage(alert)} />
        </ListItem>)}
      </List>
    </Text>
  );
};

export const mapStateToProps = (state) => {
  let {
    alerts,
  } = state;

  return {
    alerts,
  };
};

export default connect(mapStateToProps)(Alerts);
