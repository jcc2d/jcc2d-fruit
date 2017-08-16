(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.JC = global.JC || {})));
}(this, (function (exports) { 'use strict';

var inModule = typeof require === 'function';
var inBrowser = typeof window !== 'undefined';
var JC = inModule && inBrowser ? require('jcc2d/build/jcc2d.light.js') : inBrowser ? window.JC : {};

/* eslint no-bitwise: 0 */

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

Fruit.prototype.light = function () {
  this.mask.alpha = 1;
};

Fruit.prototype.lightoff = function (duration) {
  if (this.offing) return;
  var This = this;
  this.offing = true;
  this.mask.animate({
    from: { alpha: 1 },
    to: { alpha: 1 },
    duration: duration
  }, true).on('complete', function () {
    This.offing = false;
    This.mask.alpha = 0;
  });
};

/* eslint no-bitwise: 0 */

// import {Utils} from './utils';

/**
 *
 * @param {object} options
 */
function FruitMachine(options) {
  this.images = options.images;
  this.assetBox = JC.loaderUtil(options.images);
  this.mask = options.mask;

  this.doc = new JC.Container();

  this.cursor = 0;
  this.round = 0;
  this.direction = 1;
  this.progress = 0;
  this.step = 800;
  this.firing = 3000;
  this.speed = this.speedMin = 800;
  this.speedMax = this.speed / 10;

  this.fruits = [];

  this.setFruits(options.fruits);

  var This = this;
  this.doc.on('pretimeline', function (snippet) {
    This.update(snippet);
  });
}

FruitMachine.prototype.setFruits = function (fruits) {
  for (var i = 0; i < fruits.length; i++) {
    var fruit = fruits[i];
    fruit.texture = this.assetBox.getById(fruit.ref);
    this.mask.texture = this.assetBox.getById(this.mask.ref);
    var mask = this.mask;
    var fruitDoc = new Fruit({
      fruit: fruit,
      mask: mask
    });
    this.fruits.push(fruitDoc);
    this.doc.adds(fruitDoc.doc);
  }
};

FruitMachine.prototype.update = function (snippet) {
  this.progress += snippet;
  this.step += snippet;
  this.startUp();
  this.checkLight();
};

FruitMachine.prototype.startUp = function () {
  if (this.progress <= this.firing) {
    var rate = this.progress / this.firing;
    this.speed = this.speedMax + (1 - rate) * (this.speedMin - this.speedMax);
  }
};

FruitMachine.prototype.checkLight = function () {
  if (this.step >= this.speed) {
    this.step = JC.Utils.euclideanModulo(this.step, this.speed);
    if (this.spill()) {
      var total = this.fruits.length;
      this.round++;
      this.cursor = JC.Utils.euclideanModulo(this.cursor, total);
      // if (this.round > 2) console.log('object');
    }
    this.lightOne();
    this.cursor = this.cursor + this.direction;
  }
};

FruitMachine.prototype.spill = function () {
  var total = this.fruits.length;
  var bs = this.cursor <= 0 && this.direction === -1;
  var ts = this.cursor >= total && this.direction === 1;
  return bs || ts;
};

FruitMachine.prototype.lightOne = function () {
  var fruit = this.fruits[this.cursor];
  if (fruit) fruit.lightoff(this.speed * 2);
};

FruitMachine.prototype.standTo = function () {};

FruitMachine.prototype.cancle = function () {};

exports.JC = JC;
exports.FruitMachine = FruitMachine;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=index.js.map
