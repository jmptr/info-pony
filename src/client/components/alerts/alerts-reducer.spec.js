import chai from 'chai';
import sinon from 'sinon';
import { alertsReducer } from './alerts-reducer';

import {
  MEMORY_ALERT_CREATED,
  MEMORY_ALERT_UPDATED,
} from '../../../shared/action-types';

chai.should();

let getNextState = alertsReducer();

describe('alerts reducer', () => {
  describe('initial state', () => {
    it('should be an empty list', () => {
      const result = getNextState(undefined, {});
      result.length.should.equal(0);
    });
  });

  describe('creating an alert', () => {
    it('should add the alert to the state', () => {
      const action = {
        type: MEMORY_ALERT_CREATED,
        payload: { captured: new Date() },
      };
      const result = getNextState(undefined, action);
      result.length.should.equal(1);
      result[0].captured.should.equal(action.payload.captured);
    });
  });

  describe('updating an alert', () => {
    it('should update the alert in state', () => {
      const action1 = {
        type: MEMORY_ALERT_CREATED,
        payload: { captured: new Date() },
      };
      const action2 = Object.assign({}, action1, { type: MEMORY_ALERT_UPDATED });
      action2.payload.closed = new Date();

      let result = getNextState(undefined, action1);
      result = getNextState(result, action2);
      result.length.should.equal(1);
      result[0].closed.should.equal(action2.payload.closed);
    });
  });

});
