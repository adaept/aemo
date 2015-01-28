var Tween, h;

h = require('./h');

Tween = (function() {
  Tween.prototype.defaults = {
    duration: 600,
    delay: 0,
    repeat: 0,
    yoyo: false,
    durationElapsed: 0,
    delayElapsed: 0,
    onStart: null,
    onComplete: null
  };

  function Tween(o) {
    this.o = o != null ? o : {};
    this.vars();
    this.extendDefaults();
    this;
  }

  Tween.prototype.vars = function() {
    this.h = h;
    this.props = {};
    return this.progress = 0;
  };

  Tween.prototype.extendDefaults = function() {
    this.h.extend(this.o, this.defaults);
    return this.onUpdate = this.o.onUpdate;
  };

  Tween.prototype.start = function() {
    var _ref;
    this.props.startTime = Date.now() + this.o.delay;
    this.props.totalDuration = (this.o.repeat + 1) * (this.o.duration + this.o.delay) - this.o.delay;
    this.props.endTime = this.props.startTime + this.props.totalDuration;
    this.isStarted = true;
    if (!this.isOnStartFired) {
      if ((_ref = this.o.onStart) != null) {
        _ref.apply(this);
      }
      this.isOnStartFired = true;
    }
    return this;
  };

  Tween.prototype.update = function(time) {
    var elapsed, isFlip, start;
    if ((time > this.props.startTime) && (time < this.props.endTime)) {
      elapsed = time - this.props.startTime;
      if (elapsed < this.o.duration) {
        this.progress = elapsed / this.o.duration;
      } else {
        start = this.props.startTime;
        isFlip = false;
        while (start <= time) {
          isFlip = !isFlip;
          start += isFlip ? this.o.duration : this.o.delay;
        }
        if (isFlip) {
          start = start - this.o.duration;
          elapsed = time - start;
          this.progress = elapsed / this.o.duration;
        } else {
          this.progress = 0;
        }
      }
    } else {
      elapsed = this.props.endTime - this.props.startTime;
      this.progress = 1;
    }
    return typeof this.onUpdate === "function" ? this.onUpdate(this.progress) : void 0;
  };

  return Tween;

})();


/* istanbul ignore next */

if ((typeof define === "function") && define.amd) {
  define("Tween", [], function() {
    return Tween;
  });
}

if ((typeof module === "object") && (typeof module.exports === "object")) {
  module.exports = Tween;
}


/* istanbul ignore next */

if (typeof window !== "undefined" && window !== null) {
  if (window.mojs == null) {
    window.mojs = {};
  }
}

if (typeof window !== "undefined" && window !== null) {
  window.mojs.Tween = Tween;
}
