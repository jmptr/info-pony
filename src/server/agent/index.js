const EventEmitter = require('events');

class Agent extends EventEmitter {
  constructor(options = { interval: 10000, cacheLimit: 60 }) {
    const {
      interval,
      cacheLimit,
    } = options;
    super();
    this.events = [];
    this.cache = {};
    this.cacheLimit = cacheLimit;
    this.interval = interval;
  }

  start() {
    if (this.timeout) return;

    const onTick = this.onTick.bind(this)
    this.timeout = setInterval(onTick, this.interval);
  }

  stop() {
    this.timeout && clearInterval(this.timeout);
  }

  onTick() {
    this.events.forEach((event) => {event()});
  }

  addEvent(name, callback) {
    this.cache[name] = [];

    const wrappedCallback = () => {
      const result = callback();
      const cache = this.cache[name];

      if (cache.length === this.cacheLimit) {
        cache.shift();
      }
      cache.push(result);
      this.emit(name, result);
    };
    this.events.push(wrappedCallback);
  }
}

module.exports = Agent;
