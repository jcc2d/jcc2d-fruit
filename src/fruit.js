'use strict';
/* eslint no-bitwise: 0 */

import {JC} from './jc';

/**
 *
 * @param {object} options
 */
function Fruit(options) {
  this.doc = new JC.Container();
  this.fruit = new JC.Sprite(options.fruit);
  this.doc.x = options.fruit.x;
  this.doc.y = options.fruit.y;

  this.mask = new JC.Sprite(options.mask);
  this.mask.x = options.mask.x;
  this.mask.y = options.mask.y;

  this.mask.alpha = 0;
  this.doc.adds(this.fruit, this.mask);
}

Fruit.prototype.light = function() {
  this.mask.alpha = 1;
};

Fruit.prototype.lightoff = function(duration) {
  if (this.offing) return;
  const This = this;
  this.offing = true;
  this.mask.animate({
    from: {alpha: 1},
    to: {alpha: 1},
    duration,
  }, true).on('complete', function() {
    This.offing = false;
    This.mask.alpha = 0;
  });
};

export {Fruit};
