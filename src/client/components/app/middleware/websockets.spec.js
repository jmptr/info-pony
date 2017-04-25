import chai from 'chai';
import sinon from 'sinon';
import { Server } from 'mock-socket';
import webSocketsMiddleware from './websockets';

import {
  CONNECTED,
  INVALID_MESSAGE_RECEIVED,
} from '../../../../shared/action-types';
import config from '../../../../shared/config';

chai.should();

describe('websockets middleware', () => {
  let mockServer;
  let mockStore;
  let mw;

  before(() => {
    mockServer = new Server(config.websockets.address);
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
      it('should dispatch an action INVALID_MESSAGE_RECEIVED with an empty object', (done) => {
        mockServer.send('undefined');

        setTimeout(() => {
          sinon.assert.calledWith(mockStore.dispatch.secondCall, { type: INVALID_MESSAGE_RECEIVED, payload: {} });
          done();
        }, 100);
      });
    });
  });

});
