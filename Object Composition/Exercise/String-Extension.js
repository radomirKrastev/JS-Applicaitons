let stringer = (function() {
  String.prototype.ensureStart = function(str) {
    if (this.slice(0, str.length) !== str) {
      return str + this;
    }

    return this.toString();
  };

  String.prototype.ensureEnd = function(str) {
    if (this.slice(-str.length) !== str) {
      return this + str;
    }

    return this.toString();
  };

  String.prototype.isEmpty = function() {
    return this.length <= 0;
  };

  String.prototype.truncate = function(size) {
    if (size < 4) {
      return ".".repeat(size);
    }
    if (this.length <= size) {
      return this.toString();
    }

    let a = this.substr(0, size - 3);
    let b = this.substr(0, size);
    let index = this.substr(0, size - 2).lastIndexOf(" ");
    if (index === -1) {
      return `${this.substr(0, size - 3)}...`;
    }

    return `${this.substr(0, index)}...`;
  };

  String.format = function(form, ...params) {
    return params.reduce((form, x, i) => form.replace(`{${i}}`, x), form);
  };
})();

let str = "my string";
str = str.ensureStart("my");
str = str.ensureStart("hello ");
let t = "the quick brown fox jumps over the lazy dog".truncate(43);
str = str.truncate(16);
str = str.truncate(14);
str = str.truncate(8);
str = str.truncate(4);
str = str.truncate(2);
str = String.format("The {0} {1} fox", "quick", "brown");
str = String.format("jumps {0} {1}", "dog");
