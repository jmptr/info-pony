const EventEmitter = require('events');

class Agent extends EventEmitter {
  constructor() {
    super();
    this.cache = [];
    this.cacheLimit = 60;
    this.interval = 10000;
    this.alerts = [];
    this.threshold = 140000000;
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
    this.doAlertCheck();
  }

  getAverageHeapUsed() {
    // get the average heap used for the last 1 minutes (6 stats)
    const minItems = 6;
    const len = this.cache.length;
    if (len < minItems) return NaN;

    return this.cache
      .slice(len - minItems)
      .map(stat => stat.heapUsed)
      .reduce((accum, heapUsed) => (accum + heapUsed), 0) / minItems;
  }

  doAlertCheck() {
    const average = this.getAverageHeapUsed();
    if (average === NaN) return;
    const openAlert = this.alerts
      .find((alert) => !alert.closed);
    const captured = new Date();

    if (average > this.threshold && !openAlert) {
      // determine whether there's an ongoing alert before adding a new one
      const alert = { captured, meta: 'Heap Used', message: `Threshold exceeds ${this.threshold} for 1 minute.` };
      this.alerts.push(alert);
      this.emit('alert_created', alert)
    } else if (average < this.threshold && openAlert) {
      // find the open alert and close it
      openAlert.closed = captured;
      this.emit('alert_closed', openAlert);
    }
  }

  onTick() {
    const stat = this.captureStats();
    this.addToCache(stat);
    this.emit('stat_received', stat);
  }

  getCache() {
    return this.cache;
  }
}

module.exports = new Agent;
