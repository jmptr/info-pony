import chai from 'chai';
import sinon from 'sinon';
import { Server } from 'mock-socket';
import webSocketsMiddleware from './websockets';

import {
  CONNECTED,
  CPU_STAT_RECEIVED,
} from '../../../../shared/action-types';

chai.should();

describe('websockets middleware', () => {
  let mockServer;
  let mockStore;
  let mw;

  before(() => {
    mockServer = new Server('ws://localhost:8081');
    mockStore = {
      dispatch: sinon.spy(),
    };
    mw = webSocketsMiddleware(mockStore);
  });

  after((done) => {
    mockServer.stop(done);
  });

  describe('on connect', () => {
    it('should dispatch an action CONNECTED when the socket is opened', (done) => {
      setTimeout(() => {
        sinon.assert.calledOnce(mockStore.dispatch);
        sinon.assert.calledWith(mockStore.dispatch.firstCall, { type: CONNECTED });
        done();
      }, 100);
    });
  });

  describe('on message', () => {
    describe('with a message that is not JSON', () => {
      it('should dispatch an action CPU_STAT_RECEIVED with an empty object', (done) => {
        mockServer.send('undefined');

        setTimeout(() => {
          sinon.assert.calledWith(mockStore.dispatch.secondCall, { type: CPU_STAT_RECEIVED, payload: {} });
          done();
        }, 100);
      });
    });
  });

});
