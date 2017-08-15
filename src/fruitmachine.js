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
  this.direction = 1;
}

FruitMachine.prototype.setFruits = function() {

};

FruitMachine.prototype.readGo = function() {

};

FruitMachine.prototype.standTo = function() {

};

export {FruitMachine};
