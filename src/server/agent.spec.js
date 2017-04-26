import chai from 'chai';
import sinon from 'sinon';
import agent from './agent';

chai.should();

describe('agent', () => {
  beforeEach(() => {
    agent.start();
  });
  afterEach(() => {
    agent.stop();
  });

  describe('addToCache', () => {
    it('should limit the cache size to 60 stats', () => {
      const items = [...Array(100)]
        .map((n, i) => ({ rss: 1000, heapUsed: i + 1, heapTotal: 1 + 2 }));
      agent.addToCache(items);
      agent.cache.length.should.equal(60);
    });
  });

  describe('getAverageHeapUsed', () => {
    describe('with less than the needed stats', () => {
      it('should return NaN', () => {
        const stats = [...Array(3)]
          .map((n, i) => ({ rss: 1000, heapUsed: 12, heapTotal: 1 + 2 }));
        agent.addToCache(stats);
        agent.getAverageHeapUsed().should.be.NaN;
      });
    });

    describe('with at least the minimum the needed stats', () => {
      it('should return the average heapUsed of the last 12 stats', () => {
        const stats = [...Array(12)]
          .map((n, i) => ({ rss: 1000, heapUsed: 12, heapTotal: 1 + 2 }));
        agent.addToCache(stats);
        agent.getAverageHeapUsed().should.equal(12);
      });
    })
  });

  describe('alerts', () => {
    it('emit an alert when heapUsed is over the threshold', () => {
      const threshold = agent.threshold + 100;
      const items = [...Array(100)]
        .map((n, i) => ({ rss: threshold + 3, heapUsed: threshold + 2, heapTotal: threshold + 1 }));
      
      const onAlertSpy = sinon.spy();
      agent.on('alert_created', onAlertSpy);
      agent.addToCache(items);
      sinon.assert.calledOnce(onAlertSpy);
      agent.alerts.length.should.equal(1);
    });
  });
});
