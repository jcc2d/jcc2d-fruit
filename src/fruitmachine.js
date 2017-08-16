'use strict';
/* eslint no-bitwise: 0 */

import {JC} from './jc';
import {Fruit} from './fruit';
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

  const This = this;
  this.doc.on('pretimeline', function(snippet) {
    This.update(snippet);
  });
}

FruitMachine.prototype.setFruits = function(fruits) {
  for (let i = 0; i < fruits.length; i++) {
    const fruit = fruits[i];
    fruit.texture = this.assetBox.getById(fruit.ref);
    this.mask.texture = this.assetBox.getById(this.mask.ref);
    const mask = this.mask;
    const fruitDoc = new Fruit({
      fruit,
      mask,
    });
    this.fruits.push(fruitDoc);
    this.doc.adds(fruitDoc.doc);
  }
};

FruitMachine.prototype.update = function(snippet) {
  this.progress += snippet;
  this.step += snippet;
  this.startUp();
  this.checkLight();
};

FruitMachine.prototype.startUp = function() {
  if (this.progress <= this.firing) {
    const rate = this.progress / this.firing;
    this.speed = this.speedMax + (1 - rate) * (this.speedMin - this.speedMax);
  }
};

FruitMachine.prototype.checkLight = function() {
  if (this.step >= this.speed) {
    this.step = JC.Utils.euclideanModulo(this.step, this.speed);
    if (this.spill()) {
      const total = this.fruits.length;
      this.round++;
      this.cursor = JC.Utils.euclideanModulo(this.cursor, total);
      // if (this.round > 2) console.log('object');
    }
    this.lightOne();
    this.cursor = this.cursor + this.direction;
  }
};

FruitMachine.prototype.spill = function() {
  const total = this.fruits.length;
  const bs = this.cursor <= 0 && this.direction === -1;
  const ts = this.cursor >= total && this.direction === 1;
  return bs || ts;
};

FruitMachine.prototype.lightOne = function() {
  const fruit = this.fruits[this.cursor];
  if (fruit) fruit.lightoff(this.speed * 2);
};

FruitMachine.prototype.standTo = function() {

};

FruitMachine.prototype.cancle = function() {

};

export {FruitMachine};
