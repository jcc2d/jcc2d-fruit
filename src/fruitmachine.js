'use strict';
/* eslint no-bitwise: 0 */

import {JC} from './jc';

/**
 *
 * @param {object} options
 */
function FruitMachine(options) {
  this.doc = new JC.Container();
  this.fruits = options.fruits;
  this.cursor = 0;
  this.round = 0;
  this.direction = 1;

  const This = this;
  this.doc.on('pretimeline', function(snippet) {
    This.update(snippet);
  });
}

FruitMachine.prototype.setFruits = function() {

};

FruitMachine.prototype.update = function(snippet) {
  if (this.tt >= this.space) {
    this.tt = JC.Utils.euclideanModulo(this.tt, this.space);
    this.cursor = this.cursor + this.direction;
    if (this.spill()) {
      this.round++;
      this.cursor = JC.Utils.euclideanModulo(this.cursor, total);
      if (this.round > 2) console.log('object');
    }
    const total = this.doc.childs.length;
  }
};

FruitMachine.prototype.spill = function() {
  const total = this.doc.childs.length;
  const bs = this.cursor <= 0 && this.direction === -1;
  const ts = this.cursor >= total && this.direction === 1;
  return bs || ts;
};

FruitMachine.prototype.lightOne = function(idx) {
  const fruit = this.doc.childs[idx];
  if (fruit) fruit.lightoff();
};

FruitMachine.prototype.readGo = function() {

};

FruitMachine.prototype.standTo = function() {

};

export {FruitMachine};
