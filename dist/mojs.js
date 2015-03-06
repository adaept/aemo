var Burst, MotionPath, Stagger, Swirl, Timeline, Transit, Tween, burst, path1, path2, path3, paths;

Burst = require('./burst');

Swirl = require('./Swirl');

Transit = require('./transit');

Stagger = require('./stagger');

MotionPath = require('./motion-path');

Timeline = require('./tween/timeline');

Tween = require('./tween/tween');

paths = document.getElementById('js-svg');

path1 = document.getElementById('js-path1');

path2 = document.getElementById('js-path2');

path3 = document.getElementById('js-path3');

console.log(paths);

burst = new Stagger({
  els: paths
});
