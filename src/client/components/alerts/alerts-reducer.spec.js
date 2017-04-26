import chai from 'chai';
import sinon from 'sinon';
import { alertsReducer } from './alerts-reducer';

chai.should();

let reducer;

describe('agent', () => {
  beforeEach(() => {
    reducer = alertsReducer();
  });

  describe('initial state', () => {
    it('should be an empty list', () => {
    });
  });
});
