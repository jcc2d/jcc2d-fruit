'use strict';
/* eslint no-bitwise: 0 */

import {JC} from './jc';

/**
 *
 * @param {object} options
 */
function Fruit(options) {
  this.doc = new JC.Container();
  this.fruit = new JC.Sprite({});
  this.mask = new JC.Sprite({});
  this.mask.alpha = 0;
  this.doc.adds(this.fruit, this.mask);
}

Fruit.prototype.light = function() {
  this.mask.alpha = 1;
};

Fruit.prototype.lightoff = function() {
  if (this.offing) return;
  const This = this;
  this.offing = true;
  this.mask.animate({
    from: {alpha: 1},
    to: {alpha: 0},
    duration: 400,
  }, true).on('complete', function() {
    This.offing = false;
  });
};

export {Fruit};
