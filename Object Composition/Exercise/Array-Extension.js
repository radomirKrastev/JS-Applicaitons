let arr = (function() {
  Array.prototype.last = function() {
    return this[this.length - 1];
  };

  Array.prototype.skip = function(x) {
    return this.slice(x);
  };

  Array.prototype.take = function(x) {
    return this.slice(0, x);
  };

  Array.prototype.sum = function(x) {
    return this.reduce((res, x) => (res += x), 0);
  };

  Array.prototype.average = function(x) {
    return this.sum() / this.length;
  };
})();
