const EventEmitter = require('events');

class Agent extends EventEmitter {
  constructor() {
    super();
    this.events = [];
    this.cache = [];
    this.cacheLimit = 60;
    this.interval = 10000;
    this.alerts = [];
  }

  start() {
    if (this.timeout) return;

    const onTick = this.onTick.bind(this)
    this.timeout = setInterval(onTick, this.interval);
    this.onTick();
  }

  stop() {
    this.timeout && clearInterval(this.timeout);
    this.alerts = [];
    this.cache = [];
  }

  captureStats() {
    const captured = new Date();
    const memoryUsage = process.memoryUsage();
    return Object.assign(memoryUsage, { captured });
  }

  addToCache(stat) {
    if (!stat) return;

    this.cache = this.cache.concat(stat);

    // limit the size of the cache
    const len = this.cache.length;
    if (len > this.cacheLimit) {
      const diff = len - this.cacheLimit;
      this.cache.splice(len - diff);
    }
  }

  getAverageHeapUsed() {
    // get the average heap used for the last 2 minutes (12 stats)
    const minItems = 12;
    const len = this.cache.length;
    if (len < minItems) return 0;

    return this.cache
      .slice(len - minItems)
      .map(stat => stat.heapUsed)
      .reduce((accum, heapUsed) => (accum + heapUsed), 0) / minItems;
  }

  doAlertCheck() {
    const average = this.getAverageHeapUsed();
    if (average === 0) return;
  }

  onTick() {
    const stat = this.captureStats();
    this.addToCache(stat);
    this.doAlertCheck();
    this.emit('stat_received', stat);
  }

  getCache() {
    return this.cache;
  }
}

module.exports = new Agent;
