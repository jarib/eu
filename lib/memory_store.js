/**
 * Creates a new in-memory LRU backed storage.
 *
 * @param lru an LRU instance, created by var LRU = require('lru'); lru = new LRU();
 */
 module.exports = function MemoryStore(lru) {
  this.set = function(key, value, ttlMillis, cb) {
    lru.set(key, value);
    setTimeout(function() {
      lru.del(key);
    }, ttlMillis);
    cb();
  };

  this.get = function(key, cb) {
    cb(null, lru.get(key));
  };

  this.flush = function(cb) {
    lru.reset(); 
    cb();
  }
};