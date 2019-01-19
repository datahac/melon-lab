require('source-map-support/register')
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/electron/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@babel/runtime/regenerator/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ "./node_modules/regenerator-runtime/runtime-module.js");


/***/ }),

/***/ "./node_modules/iterall/index.mjs":
/*!****************************************!*\
  !*** ./node_modules/iterall/index.mjs ***!
  \****************************************/
/*! exports provided: $$iterator, isIterable, isArrayLike, isCollection, getIterator, getIteratorMethod, createIterator, forEach, $$asyncIterator, isAsyncIterable, getAsyncIterator, getAsyncIteratorMethod, createAsyncIterator, forAwaitEach */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "$$iterator", function() { return $$iterator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isIterable", function() { return isIterable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isArrayLike", function() { return isArrayLike; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isCollection", function() { return isCollection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getIterator", function() { return getIterator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getIteratorMethod", function() { return getIteratorMethod; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createIterator", function() { return createIterator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "forEach", function() { return forEach; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "$$asyncIterator", function() { return $$asyncIterator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isAsyncIterable", function() { return isAsyncIterable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAsyncIterator", function() { return getAsyncIterator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAsyncIteratorMethod", function() { return getAsyncIteratorMethod; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createAsyncIterator", function() { return createAsyncIterator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "forAwaitEach", function() { return forAwaitEach; });
/**
 * Copyright (c) 2016, Lee Byron
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @ignore
 */

/**
 * [Iterator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#iterator)
 * is a *protocol* which describes a standard way to produce a sequence of
 * values, typically the values of the Iterable represented by this Iterator.
 *
 * While described by the [ES2015 version of JavaScript](http://www.ecma-international.org/ecma-262/6.0/#sec-iterator-interface)
 * it can be utilized by any version of JavaScript.
 *
 * @external Iterator
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#iterator|MDN Iteration protocols}
 */

/**
 * [Iterable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#iterable)
 * is a *protocol* which when implemented allows a JavaScript object to define
 * their iteration behavior, such as what values are looped over in a
 * [`for...of`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of)
 * loop or `iterall`'s `forEach` function. Many [built-in types](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#Builtin_iterables)
 * implement the Iterable protocol, including `Array` and `Map`.
 *
 * While described by the [ES2015 version of JavaScript](http://www.ecma-international.org/ecma-262/6.0/#sec-iterable-interface)
 * it can be utilized by any version of JavaScript.
 *
 * @external Iterable
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#iterable|MDN Iteration protocols}
 */

// In ES2015 environments, Symbol exists
var SYMBOL /*: any */ = typeof Symbol === 'function' ? Symbol : void 0

// In ES2015 (or a polyfilled) environment, this will be Symbol.iterator
var SYMBOL_ITERATOR = SYMBOL && SYMBOL.iterator

/**
 * A property name to be used as the name of an Iterable's method responsible
 * for producing an Iterator, referred to as `@@iterator`. Typically represents
 * the value `Symbol.iterator` but falls back to the string `"@@iterator"` when
 * `Symbol.iterator` is not defined.
 *
 * Use `$$iterator` for defining new Iterables instead of `Symbol.iterator`,
 * but do not use it for accessing existing Iterables, instead use
 * {@link getIterator} or {@link isIterable}.
 *
 * @example
 *
 * var $$iterator = require('iterall').$$iterator
 *
 * function Counter (to) {
 *   this.to = to
 * }
 *
 * Counter.prototype[$$iterator] = function () {
 *   return {
 *     to: this.to,
 *     num: 0,
 *     next () {
 *       if (this.num >= this.to) {
 *         return { value: undefined, done: true }
 *       }
 *       return { value: this.num++, done: false }
 *     }
 *   }
 * }
 *
 * var counter = new Counter(3)
 * for (var number of counter) {
 *   console.log(number) // 0 ... 1 ... 2
 * }
 *
 * @type {Symbol|string}
 */
/*:: declare export var $$iterator: '@@iterator'; */
var $$iterator = SYMBOL_ITERATOR || '@@iterator'

/**
 * Returns true if the provided object implements the Iterator protocol via
 * either implementing a `Symbol.iterator` or `"@@iterator"` method.
 *
 * @example
 *
 * var isIterable = require('iterall').isIterable
 * isIterable([ 1, 2, 3 ]) // true
 * isIterable('ABC') // true
 * isIterable({ length: 1, 0: 'Alpha' }) // false
 * isIterable({ key: 'value' }) // false
 * isIterable(new Map()) // true
 *
 * @param obj
 *   A value which might implement the Iterable protocol.
 * @return {boolean} true if Iterable.
 */
/*:: declare export function isIterable(obj: any): boolean; */
function isIterable(obj) {
  return !!getIteratorMethod(obj)
}

/**
 * Returns true if the provided object implements the Array-like protocol via
 * defining a positive-integer `length` property.
 *
 * @example
 *
 * var isArrayLike = require('iterall').isArrayLike
 * isArrayLike([ 1, 2, 3 ]) // true
 * isArrayLike('ABC') // true
 * isArrayLike({ length: 1, 0: 'Alpha' }) // true
 * isArrayLike({ key: 'value' }) // false
 * isArrayLike(new Map()) // false
 *
 * @param obj
 *   A value which might implement the Array-like protocol.
 * @return {boolean} true if Array-like.
 */
/*:: declare export function isArrayLike(obj: any): boolean; */
function isArrayLike(obj) {
  var length = obj != null && obj.length
  return typeof length === 'number' && length >= 0 && length % 1 === 0
}

/**
 * Returns true if the provided object is an Object (i.e. not a string literal)
 * and is either Iterable or Array-like.
 *
 * This may be used in place of [Array.isArray()][isArray] to determine if an
 * object should be iterated-over. It always excludes string literals and
 * includes Arrays (regardless of if it is Iterable). It also includes other
 * Array-like objects such as NodeList, TypedArray, and Buffer.
 *
 * @example
 *
 * var isCollection = require('iterall').isCollection
 * isCollection([ 1, 2, 3 ]) // true
 * isCollection('ABC') // false
 * isCollection({ length: 1, 0: 'Alpha' }) // true
 * isCollection({ key: 'value' }) // false
 * isCollection(new Map()) // true
 *
 * @example
 *
 * var forEach = require('iterall').forEach
 * if (isCollection(obj)) {
 *   forEach(obj, function (value) {
 *     console.log(value)
 *   })
 * }
 *
 * @param obj
 *   An Object value which might implement the Iterable or Array-like protocols.
 * @return {boolean} true if Iterable or Array-like Object.
 */
/*:: declare export function isCollection(obj: any): boolean; */
function isCollection(obj) {
  return Object(obj) === obj && (isArrayLike(obj) || isIterable(obj))
}

/**
 * If the provided object implements the Iterator protocol, its Iterator object
 * is returned. Otherwise returns undefined.
 *
 * @example
 *
 * var getIterator = require('iterall').getIterator
 * var iterator = getIterator([ 1, 2, 3 ])
 * iterator.next() // { value: 1, done: false }
 * iterator.next() // { value: 2, done: false }
 * iterator.next() // { value: 3, done: false }
 * iterator.next() // { value: undefined, done: true }
 *
 * @template T the type of each iterated value
 * @param {Iterable<T>} iterable
 *   An Iterable object which is the source of an Iterator.
 * @return {Iterator<T>} new Iterator instance.
 */
/*:: declare export var getIterator:
  & (<+TValue>(iterable: Iterable<TValue>) => Iterator<TValue>)
  & ((iterable: mixed) => void | Iterator<mixed>); */
function getIterator(iterable) {
  var method = getIteratorMethod(iterable)
  if (method) {
    return method.call(iterable)
  }
}

/**
 * If the provided object implements the Iterator protocol, the method
 * responsible for producing its Iterator object is returned.
 *
 * This is used in rare cases for performance tuning. This method must be called
 * with obj as the contextual this-argument.
 *
 * @example
 *
 * var getIteratorMethod = require('iterall').getIteratorMethod
 * var myArray = [ 1, 2, 3 ]
 * var method = getIteratorMethod(myArray)
 * if (method) {
 *   var iterator = method.call(myArray)
 * }
 *
 * @template T the type of each iterated value
 * @param {Iterable<T>} iterable
 *   An Iterable object which defines an `@@iterator` method.
 * @return {function(): Iterator<T>} `@@iterator` method.
 */
/*:: declare export var getIteratorMethod:
  & (<+TValue>(iterable: Iterable<TValue>) => (() => Iterator<TValue>))
  & ((iterable: mixed) => (void | (() => Iterator<mixed>))); */
function getIteratorMethod(iterable) {
  if (iterable != null) {
    var method =
      (SYMBOL_ITERATOR && iterable[SYMBOL_ITERATOR]) || iterable['@@iterator']
    if (typeof method === 'function') {
      return method
    }
  }
}

/**
 * Similar to {@link getIterator}, this method returns a new Iterator given an
 * Iterable. However it will also create an Iterator for a non-Iterable
 * Array-like collection, such as Array in a non-ES2015 environment.
 *
 * `createIterator` is complimentary to `forEach`, but allows a "pull"-based
 * iteration as opposed to `forEach`'s "push"-based iteration.
 *
 * `createIterator` produces an Iterator for Array-likes with the same behavior
 * as ArrayIteratorPrototype described in the ECMAScript specification, and
 * does *not* skip over "holes".
 *
 * @example
 *
 * var createIterator = require('iterall').createIterator
 *
 * var myArraylike = { length: 3, 0: 'Alpha', 1: 'Bravo', 2: 'Charlie' }
 * var iterator = createIterator(myArraylike)
 * iterator.next() // { value: 'Alpha', done: false }
 * iterator.next() // { value: 'Bravo', done: false }
 * iterator.next() // { value: 'Charlie', done: false }
 * iterator.next() // { value: undefined, done: true }
 *
 * @template T the type of each iterated value
 * @param {Iterable<T>|{ length: number }} collection
 *   An Iterable or Array-like object to produce an Iterator.
 * @return {Iterator<T>} new Iterator instance.
 */
/*:: declare export var createIterator:
  & (<+TValue>(collection: Iterable<TValue>) => Iterator<TValue>)
  & ((collection: {length: number}) => Iterator<mixed>)
  & ((collection: mixed) => (void | Iterator<mixed>)); */
function createIterator(collection) {
  if (collection != null) {
    var iterator = getIterator(collection)
    if (iterator) {
      return iterator
    }
    if (isArrayLike(collection)) {
      return new ArrayLikeIterator(collection)
    }
  }
}

// When the object provided to `createIterator` is not Iterable but is
// Array-like, this simple Iterator is created.
function ArrayLikeIterator(obj) {
  this._o = obj
  this._i = 0
}

// Note: all Iterators are themselves Iterable.
ArrayLikeIterator.prototype[$$iterator] = function() {
  return this
}

// A simple state-machine determines the IteratorResult returned, yielding
// each value in the Array-like object in order of their indicies.
ArrayLikeIterator.prototype.next = function() {
  if (this._o === void 0 || this._i >= this._o.length) {
    this._o = void 0
    return { value: void 0, done: true }
  }
  return { value: this._o[this._i++], done: false }
}

/**
 * Given an object which either implements the Iterable protocol or is
 * Array-like, iterate over it, calling the `callback` at each iteration.
 *
 * Use `forEach` where you would expect to use a `for ... of` loop in ES6.
 * However `forEach` adheres to the behavior of [Array#forEach][] described in
 * the ECMAScript specification, skipping over "holes" in Array-likes. It will
 * also delegate to a `forEach` method on `collection` if one is defined,
 * ensuring native performance for `Arrays`.
 *
 * Similar to [Array#forEach][], the `callback` function accepts three
 * arguments, and is provided with `thisArg` as the calling context.
 *
 * Note: providing an infinite Iterator to forEach will produce an error.
 *
 * [Array#forEach]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
 *
 * @example
 *
 * var forEach = require('iterall').forEach
 *
 * forEach(myIterable, function (value, index, iterable) {
 *   console.log(value, index, iterable === myIterable)
 * })
 *
 * @example
 *
 * // ES6:
 * for (let value of myIterable) {
 *   console.log(value)
 * }
 *
 * // Any JavaScript environment:
 * forEach(myIterable, function (value) {
 *   console.log(value)
 * })
 *
 * @template T the type of each iterated value
 * @param {Iterable<T>|{ length: number }} collection
 *   The Iterable or array to iterate over.
 * @param {function(T, number, object)} callback
 *   Function to execute for each iteration, taking up to three arguments
 * @param [thisArg]
 *   Optional. Value to use as `this` when executing `callback`.
 */
/*:: declare export var forEach:
  & (<+TValue, TCollection: Iterable<TValue>>(
      collection: TCollection,
      callbackFn: (value: TValue, index: number, collection: TCollection) => any,
      thisArg?: any
    ) => void)
  & (<TCollection: {length: number}>(
      collection: TCollection,
      callbackFn: (value: mixed, index: number, collection: TCollection) => any,
      thisArg?: any
    ) => void); */
function forEach(collection, callback, thisArg) {
  if (collection != null) {
    if (typeof collection.forEach === 'function') {
      return collection.forEach(callback, thisArg)
    }
    var i = 0
    var iterator = getIterator(collection)
    if (iterator) {
      var step
      while (!(step = iterator.next()).done) {
        callback.call(thisArg, step.value, i++, collection)
        // Infinite Iterators could cause forEach to run forever.
        // After a very large number of iterations, produce an error.
        /* istanbul ignore if */
        if (i > 9999999) {
          throw new TypeError('Near-infinite iteration.')
        }
      }
    } else if (isArrayLike(collection)) {
      for (; i < collection.length; i++) {
        if (collection.hasOwnProperty(i)) {
          callback.call(thisArg, collection[i], i, collection)
        }
      }
    }
  }
}

/////////////////////////////////////////////////////
//                                                 //
//                 ASYNC ITERATORS                 //
//                                                 //
/////////////////////////////////////////////////////

/**
 * [AsyncIterable](https://tc39.github.io/proposal-async-iteration/#sec-asynciterable-interface)
 * is a *protocol* which when implemented allows a JavaScript object to define
 * an asynchronous iteration behavior, such as what values are looped over in
 * a [`for-await-of`](https://tc39.github.io/proposal-async-iteration/#sec-for-in-and-for-of-statements)
 * loop or `iterall`'s {@link forAwaitEach} function.
 *
 * While described as a proposed addition to the [ES2017 version of JavaScript](https://tc39.github.io/proposal-async-iteration/)
 * it can be utilized by any version of JavaScript.
 *
 * @external AsyncIterable
 * @see {@link https://tc39.github.io/proposal-async-iteration/#sec-asynciterable-interface|Async Iteration Proposal}
 * @template T The type of each iterated value
 * @property {function (): AsyncIterator<T>} Symbol.asyncIterator
 *   A method which produces an AsyncIterator for this AsyncIterable.
 */

/**
 * [AsyncIterator](https://tc39.github.io/proposal-async-iteration/#sec-asynciterator-interface)
 * is a *protocol* which describes a standard way to produce and consume an
 * asynchronous sequence of values, typically the values of the
 * {@link AsyncIterable} represented by this {@link AsyncIterator}.
 *
 * AsyncIterator is similar to Observable or Stream. Like an {@link Iterator} it
 * also as a `next()` method, however instead of an IteratorResult,
 * calling this method returns a {@link Promise} for a IteratorResult.
 *
 * While described as a proposed addition to the [ES2017 version of JavaScript](https://tc39.github.io/proposal-async-iteration/)
 * it can be utilized by any version of JavaScript.
 *
 * @external AsyncIterator
 * @see {@link https://tc39.github.io/proposal-async-iteration/#sec-asynciterator-interface|Async Iteration Proposal}
 */

// In ES2017 (or a polyfilled) environment, this will be Symbol.asyncIterator
var SYMBOL_ASYNC_ITERATOR = SYMBOL && SYMBOL.asyncIterator

/**
 * A property name to be used as the name of an AsyncIterable's method
 * responsible for producing an Iterator, referred to as `@@asyncIterator`.
 * Typically represents the value `Symbol.asyncIterator` but falls back to the
 * string `"@@asyncIterator"` when `Symbol.asyncIterator` is not defined.
 *
 * Use `$$asyncIterator` for defining new AsyncIterables instead of
 * `Symbol.asyncIterator`, but do not use it for accessing existing Iterables,
 * instead use {@link getAsyncIterator} or {@link isAsyncIterable}.
 *
 * @example
 *
 * var $$asyncIterator = require('iterall').$$asyncIterator
 *
 * function Chirper (to) {
 *   this.to = to
 * }
 *
 * Chirper.prototype[$$asyncIterator] = function () {
 *   return {
 *     to: this.to,
 *     num: 0,
 *     next () {
 *       return new Promise(resolve => {
 *         if (this.num >= this.to) {
 *           resolve({ value: undefined, done: true })
 *         } else {
 *           setTimeout(() => {
 *             resolve({ value: this.num++, done: false })
 *           }, 1000)
 *         }
 *       })
 *     }
 *   }
 * }
 *
 * var chirper = new Chirper(3)
 * for await (var number of chirper) {
 *   console.log(number) // 0 ...wait... 1 ...wait... 2
 * }
 *
 * @type {Symbol|string}
 */
/*:: declare export var $$asyncIterator: '@@asyncIterator'; */
var $$asyncIterator = SYMBOL_ASYNC_ITERATOR || '@@asyncIterator'

/**
 * Returns true if the provided object implements the AsyncIterator protocol via
 * either implementing a `Symbol.asyncIterator` or `"@@asyncIterator"` method.
 *
 * @example
 *
 * var isAsyncIterable = require('iterall').isAsyncIterable
 * isAsyncIterable(myStream) // true
 * isAsyncIterable('ABC') // false
 *
 * @param obj
 *   A value which might implement the AsyncIterable protocol.
 * @return {boolean} true if AsyncIterable.
 */
/*:: declare export function isAsyncIterable(obj: any): boolean; */
function isAsyncIterable(obj) {
  return !!getAsyncIteratorMethod(obj)
}

/**
 * If the provided object implements the AsyncIterator protocol, its
 * AsyncIterator object is returned. Otherwise returns undefined.
 *
 * @example
 *
 * var getAsyncIterator = require('iterall').getAsyncIterator
 * var asyncIterator = getAsyncIterator(myStream)
 * asyncIterator.next().then(console.log) // { value: 1, done: false }
 * asyncIterator.next().then(console.log) // { value: 2, done: false }
 * asyncIterator.next().then(console.log) // { value: 3, done: false }
 * asyncIterator.next().then(console.log) // { value: undefined, done: true }
 *
 * @template T the type of each iterated value
 * @param {AsyncIterable<T>} asyncIterable
 *   An AsyncIterable object which is the source of an AsyncIterator.
 * @return {AsyncIterator<T>} new AsyncIterator instance.
 */
/*:: declare export var getAsyncIterator:
  & (<+TValue>(asyncIterable: AsyncIterable<TValue>) => AsyncIterator<TValue>)
  & ((asyncIterable: mixed) => (void | AsyncIterator<mixed>)); */
function getAsyncIterator(asyncIterable) {
  var method = getAsyncIteratorMethod(asyncIterable)
  if (method) {
    return method.call(asyncIterable)
  }
}

/**
 * If the provided object implements the AsyncIterator protocol, the method
 * responsible for producing its AsyncIterator object is returned.
 *
 * This is used in rare cases for performance tuning. This method must be called
 * with obj as the contextual this-argument.
 *
 * @example
 *
 * var getAsyncIteratorMethod = require('iterall').getAsyncIteratorMethod
 * var method = getAsyncIteratorMethod(myStream)
 * if (method) {
 *   var asyncIterator = method.call(myStream)
 * }
 *
 * @template T the type of each iterated value
 * @param {AsyncIterable<T>} asyncIterable
 *   An AsyncIterable object which defines an `@@asyncIterator` method.
 * @return {function(): AsyncIterator<T>} `@@asyncIterator` method.
 */
/*:: declare export var getAsyncIteratorMethod:
  & (<+TValue>(asyncIterable: AsyncIterable<TValue>) => (() => AsyncIterator<TValue>))
  & ((asyncIterable: mixed) => (void | (() => AsyncIterator<mixed>))); */
function getAsyncIteratorMethod(asyncIterable) {
  if (asyncIterable != null) {
    var method =
      (SYMBOL_ASYNC_ITERATOR && asyncIterable[SYMBOL_ASYNC_ITERATOR]) ||
      asyncIterable['@@asyncIterator']
    if (typeof method === 'function') {
      return method
    }
  }
}

/**
 * Similar to {@link getAsyncIterator}, this method returns a new AsyncIterator
 * given an AsyncIterable. However it will also create an AsyncIterator for a
 * non-async Iterable as well as non-Iterable Array-like collection, such as
 * Array in a pre-ES2015 environment.
 *
 * `createAsyncIterator` is complimentary to `forAwaitEach`, but allows a
 * buffering "pull"-based iteration as opposed to `forAwaitEach`'s
 * "push"-based iteration.
 *
 * `createAsyncIterator` produces an AsyncIterator for non-async Iterables as
 * described in the ECMAScript proposal [Async-from-Sync Iterator Objects](https://tc39.github.io/proposal-async-iteration/#sec-async-from-sync-iterator-objects).
 *
 * > Note: Creating `AsyncIterator`s requires the existence of `Promise`.
 * > While `Promise` has been available in modern browsers for a number of
 * > years, legacy browsers (like IE 11) may require a polyfill.
 *
 * @example
 *
 * var createAsyncIterator = require('iterall').createAsyncIterator
 *
 * var myArraylike = { length: 3, 0: 'Alpha', 1: 'Bravo', 2: 'Charlie' }
 * var iterator = createAsyncIterator(myArraylike)
 * iterator.next().then(console.log) // { value: 'Alpha', done: false }
 * iterator.next().then(console.log) // { value: 'Bravo', done: false }
 * iterator.next().then(console.log) // { value: 'Charlie', done: false }
 * iterator.next().then(console.log) // { value: undefined, done: true }
 *
 * @template T the type of each iterated value
 * @param {AsyncIterable<T>|Iterable<T>|{ length: number }} source
 *   An AsyncIterable, Iterable, or Array-like object to produce an Iterator.
 * @return {AsyncIterator<T>} new AsyncIterator instance.
 */
/*:: declare export var createAsyncIterator:
  & (<+TValue>(
      collection: Iterable<Promise<TValue> | TValue> | AsyncIterable<TValue>
    ) => AsyncIterator<TValue>)
  & ((collection: {length: number}) => AsyncIterator<mixed>)
  & ((collection: mixed) => (void | AsyncIterator<mixed>)); */
function createAsyncIterator(source) {
  if (source != null) {
    var asyncIterator = getAsyncIterator(source)
    if (asyncIterator) {
      return asyncIterator
    }
    var iterator = createIterator(source)
    if (iterator) {
      return new AsyncFromSyncIterator(iterator)
    }
  }
}

// When the object provided to `createAsyncIterator` is not AsyncIterable but is
// sync Iterable, this simple wrapper is created.
function AsyncFromSyncIterator(iterator) {
  this._i = iterator
}

// Note: all AsyncIterators are themselves AsyncIterable.
AsyncFromSyncIterator.prototype[$$asyncIterator] = function() {
  return this
}

// A simple state-machine determines the IteratorResult returned, yielding
// each value in the Array-like object in order of their indicies.
AsyncFromSyncIterator.prototype.next = function() {
  var step = this._i.next()
  return Promise.resolve(step.value).then(function(value) {
    return { value: value, done: step.done }
  })
}

/**
 * Given an object which either implements the AsyncIterable protocol or is
 * Array-like, iterate over it, calling the `callback` at each iteration.
 *
 * Use `forAwaitEach` where you would expect to use a [for-await-of](https://tc39.github.io/proposal-async-iteration/#sec-for-in-and-for-of-statements) loop.
 *
 * Similar to [Array#forEach][], the `callback` function accepts three
 * arguments, and is provided with `thisArg` as the calling context.
 *
 * > Note: Using `forAwaitEach` requires the existence of `Promise`.
 * > While `Promise` has been available in modern browsers for a number of
 * > years, legacy browsers (like IE 11) may require a polyfill.
 *
 * @example
 *
 * var forAwaitEach = require('iterall').forAwaitEach
 *
 * forAwaitEach(myIterable, function (value, index, iterable) {
 *   console.log(value, index, iterable === myIterable)
 * })
 *
 * @example
 *
 * // ES2017:
 * for await (let value of myAsyncIterable) {
 *   console.log(await doSomethingAsync(value))
 * }
 * console.log('done')
 *
 * // Any JavaScript environment:
 * forAwaitEach(myAsyncIterable, function (value) {
 *   return doSomethingAsync(value).then(console.log)
 * }).then(function () {
 *   console.log('done')
 * })
 *
 * @template T the type of each iterated value
 * @param {AsyncIterable<T>|Iterable<Promise<T> | T>|{ length: number }} source
 *   The AsyncIterable or array to iterate over.
 * @param {function(T, number, object)} callback
 *   Function to execute for each iteration, taking up to three arguments
 * @param [thisArg]
 *   Optional. Value to use as `this` when executing `callback`.
 */
/*:: declare export var forAwaitEach:
  & (<+TValue, TCollection: Iterable<Promise<TValue> | TValue> | AsyncIterable<TValue>>(
      collection: TCollection,
      callbackFn: (value: TValue, index: number, collection: TCollection) => any,
      thisArg?: any
    ) => Promise<void>)
  & (<TCollection: { length: number }>(
      collection: TCollection,
      callbackFn: (value: mixed, index: number, collection: TCollection) => any,
      thisArg?: any
    ) => Promise<void>); */
function forAwaitEach(source, callback, thisArg) {
  var asyncIterator = createAsyncIterator(source)
  if (asyncIterator) {
    var i = 0
    return new Promise(function(resolve, reject) {
      function next() {
        asyncIterator
          .next()
          .then(function(step) {
            if (!step.done) {
              Promise.resolve(callback.call(thisArg, step.value, i++, source))
                .then(next)
                .catch(reject)
            } else {
              resolve()
            }
            // Explicitly return null, silencing bluebird-style warnings.
            return null
          })
          .catch(reject)
        // Explicitly return null, silencing bluebird-style warnings.
        return null
      }
      next()
    })
  }
}


/***/ }),

/***/ "./node_modules/regenerator-runtime/runtime-module.js":
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ "./node_modules/regenerator-runtime/runtime.js");

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),

/***/ "./node_modules/regenerator-runtime/runtime.js":
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),

/***/ "./src/electron/graphql.ts":
/*!*********************************!*\
  !*** ./src/electron/graphql.ts ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _shared_graphql_schema__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ~/shared/graphql/schema */ "./src/shared/graphql/schema/index.ts");
/* harmony import */ var _shared_graphql_schema_context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ~/shared/graphql/schema/context */ "./src/shared/graphql/schema/context.ts");
/* harmony import */ var _shared_graphql_schema_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ~/shared/graphql/schema/environment */ "./src/shared/graphql/schema/environment/index.ts");
/* harmony import */ var _shared_graphql_server__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ~/shared/graphql/server */ "./src/shared/graphql/server.ts");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_5__);


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }






/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/_asyncToGenerator(
/*#__PURE__*/
_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
  var environment, wallet, context, link;
  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return Object(_shared_graphql_schema_environment__WEBPACK_IMPORTED_MODULE_3__["getEnvironment"])();

        case 2:
          environment = _context.sent;
          _context.next = 5;
          return Object(_shared_graphql_schema_environment__WEBPACK_IMPORTED_MODULE_3__["getWallet"])();

        case 5:
          wallet = _context.sent;
          _context.next = 8;
          return Object(_shared_graphql_schema_context__WEBPACK_IMPORTED_MODULE_2__["createContext"])(environment, wallet);

        case 8:
          context = _context.sent;
          link = Object(_shared_graphql_server__WEBPACK_IMPORTED_MODULE_4__["createSchemaLink"])({
            schema: _shared_graphql_schema__WEBPACK_IMPORTED_MODULE_1__["schema"],
            context: context
          });
          return _context.abrupt("return", Object(_shared_graphql_server__WEBPACK_IMPORTED_MODULE_4__["createIpcExecutor"])({
            link: link,
            ipc: electron__WEBPACK_IMPORTED_MODULE_5__["ipcMain"]
          }));

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, this);
})));

/***/ }),

/***/ "./src/electron/index.ts":
/*!*******************************!*\
  !*** ./src/electron/index.ts ***!
  \*******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var electron_is_dev__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! electron-is-dev */ "electron-is-dev");
/* harmony import */ var electron_is_dev__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(electron_is_dev__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! http */ "http");
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(http__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! url */ "url");
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(url__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _graphql__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./graphql */ "./src/electron/graphql.ts");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }







var isWindows = process.platform === 'win32';

if (electron_is_dev__WEBPACK_IMPORTED_MODULE_2___default.a) {
  __webpack_require__(/*! electron-debug */ "electron-debug")({
    enabled: true,
    showDevTools: true
  });
}

var mainWindow;

var restoreMainWindow =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
    var handleRedirect, next, requestHandler, appUrl;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return Object(_graphql__WEBPACK_IMPORTED_MODULE_6__["default"])();

          case 2:
            // Create the application's main menu.
            electron__WEBPACK_IMPORTED_MODULE_1___default.a.Menu.setApplicationMenu(electron__WEBPACK_IMPORTED_MODULE_1___default.a.Menu.buildFromTemplate([{
              label: 'Application',
              submenu: [{
                label: 'Quit',
                accelerator: 'Command+Q',
                click: function click() {
                  electron__WEBPACK_IMPORTED_MODULE_1___default.a.app.quit();
                }
              }]
            }, {
              label: 'Edit',
              submenu: [{
                label: 'Cut',
                accelerator: 'CmdOrCtrl+X',
                selector: 'cut:'
              }, {
                label: 'Copy',
                accelerator: 'CmdOrCtrl+C',
                selector: 'copy:'
              }, {
                label: 'Paste',
                accelerator: 'CmdOrCtrl+V',
                selector: 'paste:'
              }]
            }]));
            mainWindow = new electron__WEBPACK_IMPORTED_MODULE_1___default.a.BrowserWindow({
              width: 1024,
              height: 800,
              webPreferences: {
                nodeIntegration: !!electron_is_dev__WEBPACK_IMPORTED_MODULE_2___default.a,
                preload: path__WEBPACK_IMPORTED_MODULE_4___default.a.resolve(__dirname, 'preload.js')
              }
            });

            handleRedirect = function handleRedirect(event, url) {
              if (url !== mainWindow.webContents.getURL()) {
                event.preventDefault();
                electron__WEBPACK_IMPORTED_MODULE_1___default.a.shell.openExternal(url);
              }
            };

            mainWindow.webContents.on('will-navigate', handleRedirect);
            mainWindow.webContents.on('new-window', handleRedirect);
            mainWindow.on('closed', function () {
              mainWindow = null;
            });

            if (!electron_is_dev__WEBPACK_IMPORTED_MODULE_2___default.a) {
              _context.next = 18;
              break;
            }

            // Do not load next in the production build.
            next = __webpack_require__(/*! next */ "next")({
              dev: true,
              dir: './src'
            });
            requestHandler = next.getRequestHandler(); // Build the renderer code and watch the files.

            _context.next = 13;
            return next.prepare();

          case 13:
            _context.next = 15;
            return new Promise(function (resolve) {
              var server = http__WEBPACK_IMPORTED_MODULE_3___default.a.createServer(requestHandler);
              server.listen(3000, function () {
                // Make sure to stop the server when the app closes.
                electron__WEBPACK_IMPORTED_MODULE_1___default.a.app.on('before-quit', function () {
                  return server.close();
                });
                resolve();
              });
            });

          case 15:
            mainWindow.loadURL('http://localhost:3000/');
            _context.next = 20;
            break;

          case 18:
            appUrl = url__WEBPACK_IMPORTED_MODULE_5___default.a.format({
              pathname: 'index.html',
              protocol: 'file:',
              slashes: true
            });
            mainWindow.loadURL(appUrl);

          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function restoreMainWindow() {
    return _ref.apply(this, arguments);
  };
}();

electron__WEBPACK_IMPORTED_MODULE_1___default.a.app.on('window-all-closed', function () {
  electron__WEBPACK_IMPORTED_MODULE_1___default.a.app.quit();
});
electron__WEBPACK_IMPORTED_MODULE_1___default.a.app.on('activate', function () {
  if (!mainWindow) {
    restoreMainWindow();
  }
});
electron__WEBPACK_IMPORTED_MODULE_1___default.a.app.on('ready', function () {
  if (!electron_is_dev__WEBPACK_IMPORTED_MODULE_2___default.a) {
    electron__WEBPACK_IMPORTED_MODULE_1___default.a.protocol.interceptFileProtocol('file', function (request, callback) {
      var reqUrl = request.url.substr(isWindows ? 8 : 7);
      var reqUrlFinal = isWindows ? reqUrl.replace(path__WEBPACK_IMPORTED_MODULE_4___default.a.parse(reqUrl).root, '') : reqUrl;
      callback(path__WEBPACK_IMPORTED_MODULE_4___default.a.normalize(path__WEBPACK_IMPORTED_MODULE_4___default.a.join(__dirname, 'renderer', reqUrlFinal)));
    });
  } else {
    var _require = __webpack_require__(/*! electron-devtools-installer */ "electron-devtools-installer"),
        install = _require.default,
        REACT_DEVELOPER_TOOLS = _require.REACT_DEVELOPER_TOOLS,
        REDUX_DEVTOOLS = _require.REDUX_DEVTOOLS;

    install(REACT_DEVELOPER_TOOLS).then(function (name) {
      return console.log("Added Extension:  ".concat(name));
    }).catch(function (error) {
      return console.error('An error occurred: ', error);
    });
    install(REDUX_DEVTOOLS).then(function (name) {
      return console.log("Added Extension:  ".concat(name));
    }).catch(function (error) {
      return console.error('An error occurred: ', error);
    });

    __webpack_require__(/*! devtron */ "devtron").install();
  }

  restoreMainWindow();
});

/***/ }),

/***/ "./src/shared/graphql/schema/context.ts":
/*!**********************************************!*\
  !*** ./src/shared/graphql/schema/context.ts ***!
  \**********************************************/
/*! exports provided: createContext */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createContext", function() { return createContext; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "rxjs/operators");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _loaders__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./loaders */ "./src/shared/graphql/schema/loaders.ts");
/* harmony import */ var _utils_subscribeBlock__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/subscribeBlock */ "./src/shared/graphql/schema/utils/subscribeBlock.ts");
/* harmony import */ var _utils_currentRanking__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/currentRanking */ "./src/shared/graphql/schema/utils/currentRanking.ts");
/* harmony import */ var _utils_subscribeSyncing__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/subscribeSyncing */ "./src/shared/graphql/schema/utils/subscribeSyncing.ts");
/* harmony import */ var _utils_hasRecentPrice__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/hasRecentPrice */ "./src/shared/graphql/schema/utils/hasRecentPrice.ts");
/* harmony import */ var _utils_currentPeers__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils/currentPeers */ "./src/shared/graphql/schema/utils/currentPeers.ts");


function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }








function createContext(_x) {
  return _createContext.apply(this, arguments);
}

function _createContext() {
  _createContext = _asyncToGenerator(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(environment) {
    var wallet,
        currentWallet,
        block$,
        syncing$,
        peers$,
        ranking$,
        recentPrice$,
        streams,
        _args = arguments;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            wallet = _args.length > 1 && _args[1] !== undefined ? _args[1] : null;
            // The current wallet (in an electron context);
            currentWallet = wallet;
            block$ = Object(_utils_subscribeBlock__WEBPACK_IMPORTED_MODULE_3__["default"])(environment).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["publishReplay"])(1));
            syncing$ = Object(_utils_subscribeSyncing__WEBPACK_IMPORTED_MODULE_5__["default"])(environment).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["publishReplay"])(1));
            peers$ = Object(_utils_currentPeers__WEBPACK_IMPORTED_MODULE_7__["default"])(environment, block$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["publishReplay"])(1));
            ranking$ = Object(_utils_currentRanking__WEBPACK_IMPORTED_MODULE_4__["default"])(environment, block$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["publishReplay"])(1));
            recentPrice$ = Object(_utils_hasRecentPrice__WEBPACK_IMPORTED_MODULE_6__["default"])(environment, block$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["publishReplay"])(1));
            streams = {
              peers$: peers$,
              block$: block$,
              ranking$: ranking$,
              syncing$: syncing$,
              recentPrice$: recentPrice$
            };
            Object.values(streams).forEach(function (stream$) {
              return stream$.connect();
            });
            return _context.abrupt("return", function () {
              return {
                environment: environment,
                streams: streams,
                loaders: _objectSpread({
                  setWallet: function setWallet(value) {
                    currentWallet = value;
                  },
                  getWallet: function getWallet() {
                    return currentWallet;
                  }
                }, Object(_loaders__WEBPACK_IMPORTED_MODULE_2__["default"])(environment, streams))
              };
            });

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _createContext.apply(this, arguments);
}

/***/ }),

/***/ "./src/shared/graphql/schema/directives/addQueryDirectives.ts":
/*!********************************************************************!*\
  !*** ./src/shared/graphql/schema/directives/addQueryDirectives.ts ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var graphql_tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! graphql-tools */ "graphql-tools");
/* harmony import */ var graphql_tools__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(graphql_tools__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var graphql__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! graphql */ "graphql");
/* harmony import */ var graphql__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(graphql__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var graphql_execution__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! graphql/execution */ "graphql/execution");
/* harmony import */ var graphql_execution__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(graphql_execution__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var graphql_language__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! graphql/language */ "graphql/language");
/* harmony import */ var graphql_language__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(graphql_language__WEBPACK_IMPORTED_MODULE_3__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }





var DirectiveLocation = graphql_language__WEBPACK_IMPORTED_MODULE_3__["DirectiveLocation"];

function getFieldResolver(field) {
  var resolver = field.resolve || graphql__WEBPACK_IMPORTED_MODULE_1__["defaultFieldResolver"];
  return resolver.bind(field);
}

function getDirectiveInfo(directive, resolverMap, schema, location, variables) {
  var name = directive.name.value;
  var Directive = schema.getDirective(name);

  if (typeof Directive === 'undefined') {
    throw new Error("Directive @".concat(name, " is undefined. ") + 'Please define in schema before using.');
  }

  if (!Directive.locations.includes(location)) {
    throw new Error("Directive @".concat(name, " is not marked to be used on \"").concat(location, "\" location. ") + "Please add \"directive @".concat(name, " ON ").concat(location, "\" in schema."));
  }

  var resolver = resolverMap[name];
  var args = Object(graphql_execution__WEBPACK_IMPORTED_MODULE_2__["getDirectiveValues"])(Directive, {
    directives: [directive]
  }, variables);
  return {
    args: args,
    resolver: resolver
  };
}

function createFieldResolver(field, resolverMap, schema) {
  var originalResolver = getFieldResolver(field);
  return function (source, args, context, info) {
    var _ref = info.fieldNodes[0] || [],
        directives = _ref.directives;

    var resolvers = directives.map(function (directive) {
      var directiveInfo = getDirectiveInfo(directive, resolverMap, schema, DirectiveLocation.FIELD, info.variableValues);
      return directiveInfo;
    }).filter(function (directive) {
      return typeof directive.resolver !== 'undefined';
    });

    if (!resolvers.length) {
      return originalResolver(source, args, context, info);
    }

    var chain = resolvers.reduce(function (carry, current) {
      return function (parent, args, context, info) {
        return current.resolver(carry, parent, args, context, info, current.args);
      };
    }, originalResolver);
    return chain(source, args, context, info);
  };
}

function addQueryDirectives(schema, resolverMap) {
  if (_typeof(resolverMap) !== 'object') {
    throw new Error("Expected resolverMap to be of type object, got ".concat(_typeof(resolverMap)));
  }

  if (Array.isArray(resolverMap)) {
    throw new Error('Expected resolverMap to be of type object, got Array');
  }

  Object(graphql_tools__WEBPACK_IMPORTED_MODULE_0__["forEachField"])(schema, function (field) {
    field.resolve = createFieldResolver(field, resolverMap, schema);
  });
}

/* harmony default export */ __webpack_exports__["default"] = (addQueryDirectives);

/***/ }),

/***/ "./src/shared/graphql/schema/environment/index.ts":
/*!********************************************************!*\
  !*** ./src/shared/graphql/schema/environment/index.ts ***!
  \********************************************************/
/*! exports provided: getEnvironment, getWallet */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getEnvironment", function() { return getEnvironment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getWallet", function() { return getWallet; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! fs */ "fs");
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var ethers_wallet__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ethers-wallet */ "ethers-wallet");
/* harmony import */ var ethers_wallet__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(ethers_wallet__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _melonproject_ganache_cli__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @melonproject/ganache-cli */ "@melonproject/ganache-cli");
/* harmony import */ var _melonproject_ganache_cli__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_melonproject_ganache_cli__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _melonproject_token_math__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @melonproject/token-math */ "@melonproject/token-math");
/* harmony import */ var _melonproject_token_math__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_melonproject_token_math__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _melonproject_protocol__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @melonproject/protocol */ "@melonproject/protocol");
/* harmony import */ var _melonproject_protocol__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_melonproject_protocol__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _melonproject_protocol_lib_contracts_exchanges_transactions_makeOrderFromAccountOasisDex__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @melonproject/protocol/lib/contracts/exchanges/transactions/makeOrderFromAccountOasisDex */ "@melonproject/protocol/lib/contracts/exchanges/transactions/makeOrderFromAccountOasisDex");
/* harmony import */ var _melonproject_protocol_lib_contracts_exchanges_transactions_makeOrderFromAccountOasisDex__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_melonproject_protocol_lib_contracts_exchanges_transactions_makeOrderFromAccountOasisDex__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var web3_eth_accounts__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! web3-eth-accounts */ "web3-eth-accounts");
/* harmony import */ var web3_eth_accounts__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(web3_eth_accounts__WEBPACK_IMPORTED_MODULE_8__);


function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }









var mnemonic = 'exhibit now news planet fame thank swear reform tilt accident bitter axis';

var getTestEnvironment =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(track) {
    var chainPath, databasePath, provider, deploymentPath, environment, wallet, accounts, signTransaction, withWallet, thirdParty, withDeployment, melonContracts, priceSource, wethToken, mlnToken, mlnPrice, ethPrice, matchingMarketAddress;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            chainPath = path__WEBPACK_IMPORTED_MODULE_1___default.a.resolve(process.cwd(), '.chain');
            databasePath = path__WEBPACK_IMPORTED_MODULE_1___default.a.join(chainPath, 'db');

            if (!fs__WEBPACK_IMPORTED_MODULE_2___default.a.existsSync(chainPath)) {
              fs__WEBPACK_IMPORTED_MODULE_2___default.a.mkdirSync(chainPath);
              fs__WEBPACK_IMPORTED_MODULE_2___default.a.mkdirSync(databasePath);
            }

            provider = _melonproject_ganache_cli__WEBPACK_IMPORTED_MODULE_4___default.a.provider({
              gasLimit: '0x7a1200',
              default_balance_ether: 10000000000000,
              // db_path: path.resolve(__dirname, '.chain'),
              total_accounts: 10,
              mnemonic: mnemonic,
              logger: console,
              db_path: databasePath
            });
            deploymentPath = path__WEBPACK_IMPORTED_MODULE_1___default.a.join(chainPath, 'deployment.json');
            environment = Object(_melonproject_protocol__WEBPACK_IMPORTED_MODULE_6__["constructEnvironment"])({
              provider: provider,
              track: track,
              deployment: fs__WEBPACK_IMPORTED_MODULE_2___default.a.existsSync(deploymentPath) && JSON.parse(fs__WEBPACK_IMPORTED_MODULE_2___default.a.readFileSync(deploymentPath).toString())
            });

            if (!(environment && environment.deployment)) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return", environment);

          case 8:
            wallet = ethers_wallet__WEBPACK_IMPORTED_MODULE_3___default.a.Wallet.fromMnemonic(mnemonic);
            accounts = new web3_eth_accounts__WEBPACK_IMPORTED_MODULE_8___default.a(environment.eth.currentProvider);

            signTransaction = function signTransaction(transaction) {
              return accounts.signTransaction(transaction, wallet.privateKey).then(function (t) {
                return t.rawTransaction;
              });
            };

            withWallet = _objectSpread({}, environment, {
              wallet: _objectSpread({}, wallet, {
                signTransaction: signTransaction
              })
            });
            _context.next = 14;
            return Object(_melonproject_protocol__WEBPACK_IMPORTED_MODULE_6__["deployThirdParty"])(withWallet);

          case 14:
            thirdParty = _context.sent;
            _context.next = 17;
            return Object(_melonproject_protocol__WEBPACK_IMPORTED_MODULE_6__["deploySystem"])(withWallet, thirdParty, _melonproject_protocol__WEBPACK_IMPORTED_MODULE_6__["deployAllContractsConfig"]);

          case 17:
            withDeployment = _context.sent;
            fs__WEBPACK_IMPORTED_MODULE_2___default.a.writeFileSync(deploymentPath, JSON.stringify(withDeployment.deployment));
            melonContracts = withDeployment.deployment.melonContracts;
            priceSource = melonContracts.priceSource;
            wethToken = Object(_melonproject_protocol__WEBPACK_IMPORTED_MODULE_6__["getTokenBySymbol"])(withDeployment, 'WETH');
            mlnToken = Object(_melonproject_protocol__WEBPACK_IMPORTED_MODULE_6__["getTokenBySymbol"])(withDeployment, 'MLN');
            mlnPrice = _melonproject_token_math__WEBPACK_IMPORTED_MODULE_5__["createPrice"](_melonproject_token_math__WEBPACK_IMPORTED_MODULE_5__["createQuantity"](mlnToken, '1'), _melonproject_token_math__WEBPACK_IMPORTED_MODULE_5__["createQuantity"](wethToken, '2'));
            ethPrice = _melonproject_token_math__WEBPACK_IMPORTED_MODULE_5__["createPrice"](_melonproject_token_math__WEBPACK_IMPORTED_MODULE_5__["createQuantity"](wethToken, '1'), _melonproject_token_math__WEBPACK_IMPORTED_MODULE_5__["createQuantity"](wethToken, '1'));
            _context.next = 27;
            return Object(_melonproject_protocol__WEBPACK_IMPORTED_MODULE_6__["update"])(withDeployment, priceSource, [ethPrice, mlnPrice]);

          case 27:
            matchingMarketAddress = withDeployment.deployment.exchangeConfigs.MatchingMarket.exchange;
            _context.next = 30;
            return Object(_melonproject_protocol_lib_contracts_exchanges_transactions_makeOrderFromAccountOasisDex__WEBPACK_IMPORTED_MODULE_7__["makeOrderFromAccountOasisDex"])(withDeployment, matchingMarketAddress, {
              buy: _melonproject_token_math__WEBPACK_IMPORTED_MODULE_5__["createQuantity"](mlnToken, 1),
              sell: _melonproject_token_math__WEBPACK_IMPORTED_MODULE_5__["createQuantity"](wethToken, 1)
            });

          case 30:
            _context.next = 32;
            return Object(_melonproject_protocol_lib_contracts_exchanges_transactions_makeOrderFromAccountOasisDex__WEBPACK_IMPORTED_MODULE_7__["makeOrderFromAccountOasisDex"])(withDeployment, matchingMarketAddress, {
              buy: _melonproject_token_math__WEBPACK_IMPORTED_MODULE_5__["createQuantity"](mlnToken, 2),
              sell: _melonproject_token_math__WEBPACK_IMPORTED_MODULE_5__["createQuantity"](wethToken, 1)
            });

          case 32:
            _context.next = 34;
            return Object(_melonproject_protocol_lib_contracts_exchanges_transactions_makeOrderFromAccountOasisDex__WEBPACK_IMPORTED_MODULE_7__["makeOrderFromAccountOasisDex"])(withDeployment, matchingMarketAddress, {
              buy: _melonproject_token_math__WEBPACK_IMPORTED_MODULE_5__["createQuantity"](mlnToken, 3),
              sell: _melonproject_token_math__WEBPACK_IMPORTED_MODULE_5__["createQuantity"](wethToken, 1)
            });

          case 34:
            _context.next = 36;
            return Object(_melonproject_protocol_lib_contracts_exchanges_transactions_makeOrderFromAccountOasisDex__WEBPACK_IMPORTED_MODULE_7__["makeOrderFromAccountOasisDex"])(withDeployment, matchingMarketAddress, {
              buy: _melonproject_token_math__WEBPACK_IMPORTED_MODULE_5__["createQuantity"](mlnToken, 4),
              sell: _melonproject_token_math__WEBPACK_IMPORTED_MODULE_5__["createQuantity"](wethToken, 1)
            });

          case 36:
            _context.next = 38;
            return Object(_melonproject_protocol_lib_contracts_exchanges_transactions_makeOrderFromAccountOasisDex__WEBPACK_IMPORTED_MODULE_7__["makeOrderFromAccountOasisDex"])(withDeployment, matchingMarketAddress, {
              buy: _melonproject_token_math__WEBPACK_IMPORTED_MODULE_5__["createQuantity"](mlnToken, 6.5),
              sell: _melonproject_token_math__WEBPACK_IMPORTED_MODULE_5__["createQuantity"](wethToken, 1)
            });

          case 38:
            _context.next = 40;
            return Object(_melonproject_protocol_lib_contracts_exchanges_transactions_makeOrderFromAccountOasisDex__WEBPACK_IMPORTED_MODULE_7__["makeOrderFromAccountOasisDex"])(withDeployment, matchingMarketAddress, {
              buy: _melonproject_token_math__WEBPACK_IMPORTED_MODULE_5__["createQuantity"](mlnToken, 3.7),
              sell: _melonproject_token_math__WEBPACK_IMPORTED_MODULE_5__["createQuantity"](wethToken, 1)
            });

          case 40:
            _context.next = 42;
            return Object(_melonproject_protocol_lib_contracts_exchanges_transactions_makeOrderFromAccountOasisDex__WEBPACK_IMPORTED_MODULE_7__["makeOrderFromAccountOasisDex"])(withDeployment, matchingMarketAddress, {
              buy: _melonproject_token_math__WEBPACK_IMPORTED_MODULE_5__["createQuantity"](wethToken, 2),
              sell: _melonproject_token_math__WEBPACK_IMPORTED_MODULE_5__["createQuantity"](mlnToken, 1)
            });

          case 42:
            _context.next = 44;
            return Object(_melonproject_protocol_lib_contracts_exchanges_transactions_makeOrderFromAccountOasisDex__WEBPACK_IMPORTED_MODULE_7__["makeOrderFromAccountOasisDex"])(withDeployment, matchingMarketAddress, {
              buy: _melonproject_token_math__WEBPACK_IMPORTED_MODULE_5__["createQuantity"](wethToken, 3),
              sell: _melonproject_token_math__WEBPACK_IMPORTED_MODULE_5__["createQuantity"](mlnToken, 1)
            });

          case 44:
            _context.next = 46;
            return Object(_melonproject_protocol_lib_contracts_exchanges_transactions_makeOrderFromAccountOasisDex__WEBPACK_IMPORTED_MODULE_7__["makeOrderFromAccountOasisDex"])(withDeployment, matchingMarketAddress, {
              buy: _melonproject_token_math__WEBPACK_IMPORTED_MODULE_5__["createQuantity"](wethToken, 3.5),
              sell: _melonproject_token_math__WEBPACK_IMPORTED_MODULE_5__["createQuantity"](mlnToken, 1)
            });

          case 46:
            return _context.abrupt("return", _objectSpread({}, environment, {
              deployment: withDeployment.deployment
            }));

          case 47:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getTestEnvironment(_x) {
    return _ref.apply(this, arguments);
  };
}();

var getEnvironment =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
    var track, environment;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            track = "testing";
            _context2.next = 3;
            return getTestEnvironment(track);

          case 3:
            environment = _context2.sent;
            return _context2.abrupt("return", environment);

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function getEnvironment() {
    return _ref2.apply(this, arguments);
  };
}();
var getWallet =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3() {
    var wallet;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            // Automatically log in to a wallet. Useful for development.
            wallet =  true ? ethers_wallet__WEBPACK_IMPORTED_MODULE_3___default.a.Wallet.fromMnemonic(mnemonic) : undefined;
            return _context3.abrupt("return", wallet);

          case 2:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function getWallet() {
    return _ref3.apply(this, arguments);
  };
}();

/***/ }),

/***/ "./src/shared/graphql/schema/index.ts":
/*!********************************************!*\
  !*** ./src/shared/graphql/schema/index.ts ***!
  \********************************************/
/*! exports provided: schema */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "schema", function() { return schema; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var graphql_tools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! graphql-tools */ "graphql-tools");
/* harmony import */ var graphql_tools__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(graphql_tools__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var web3_eth_accounts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! web3-eth-accounts */ "web3-eth-accounts");
/* harmony import */ var web3_eth_accounts__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(web3_eth_accounts__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _resolvers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./resolvers */ "./src/shared/graphql/schema/resolvers.ts");
/* harmony import */ var _directives_addQueryDirectives__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./directives/addQueryDirectives */ "./src/shared/graphql/schema/directives/addQueryDirectives.ts");
/* harmony import */ var _schema_gql__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./schema.gql */ "./src/shared/graphql/schema/schema.gql");
/* harmony import */ var _schema_gql__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_schema_gql__WEBPACK_IMPORTED_MODULE_5__);


function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }






var schema = Object(graphql_tools__WEBPACK_IMPORTED_MODULE_1__["makeExecutableSchema"])({
  typeDefs: _schema_gql__WEBPACK_IMPORTED_MODULE_5__,
  resolvers: _resolvers__WEBPACK_IMPORTED_MODULE_3__["default"],
  inheritResolversFromInterfaces: true
});
Object(_directives_addQueryDirectives__WEBPACK_IMPORTED_MODULE_4__["default"])(schema, {
  sign: function () {
    var _sign = _asyncToGenerator(
    /*#__PURE__*/
    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(resolve, source, args, context, info, directiveArgs) {
      var environment, loaders, wallet, accounts, unsigned, signed, newArgs;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(typeof args[directiveArgs.target] !== 'undefined')) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return", resolve(source, args, context, info));

            case 2:
              environment = context.environment, loaders = context.loaders;
              wallet = loaders.getWallet();
              accounts = new web3_eth_accounts__WEBPACK_IMPORTED_MODULE_2___default.a(environment.eth.currentProvider);
              unsigned = args[directiveArgs.source];
              _context.next = 8;
              return accounts.signTransaction(unsigned, wallet && wallet.privateKey);

            case 8:
              signed = _context.sent;
              newArgs = _objectSpread({}, args, _defineProperty({}, directiveArgs.target, signed));
              return _context.abrupt("return", resolve(source, newArgs, context, info));

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function sign(_x, _x2, _x3, _x4, _x5, _x6) {
      return _sign.apply(this, arguments);
    }

    return sign;
  }(),
  account: function account(resolve, source, args, context, info, directiveArgs) {
    var account = args[directiveArgs.arg] || function () {
      var wallet = context.loaders.getWallet();
      return wallet && wallet.address || undefined;
    }();

    var newArgs = _objectSpread({}, args, _defineProperty({}, directiveArgs.arg, account));

    return resolve(source, newArgs, context, info);
  }
});

/***/ }),

/***/ "./src/shared/graphql/schema/loaders.ts":
/*!**********************************************!*\
  !*** ./src/shared/graphql/schema/loaders.ts ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var dataloader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dataloader */ "dataloader");
/* harmony import */ var dataloader__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(dataloader__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var memoize_one__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! memoize-one */ "memoize-one");
/* harmony import */ var memoize_one__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(memoize_one__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ramda */ "ramda");
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(ramda__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "rxjs/operators");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _utils_takeLast__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/takeLast */ "./src/shared/graphql/schema/utils/takeLast.ts");
/* harmony import */ var _loaders_wallet_decryptWallet__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./loaders/wallet/decryptWallet */ "./src/shared/graphql/schema/loaders/wallet/decryptWallet.ts");
/* harmony import */ var _loaders_wallet_restoreWallet__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./loaders/wallet/restoreWallet */ "./src/shared/graphql/schema/loaders/wallet/restoreWallet.ts");
/* harmony import */ var _loaders_wallet_generateMnemonic__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./loaders/wallet/generateMnemonic */ "./src/shared/graphql/schema/loaders/wallet/generateMnemonic.ts");
/* harmony import */ var _loaders_fund_fundInception__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./loaders/fund/fundInception */ "./src/shared/graphql/schema/loaders/fund/fundInception.ts");
/* harmony import */ var _loaders_fund_fundOwner__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./loaders/fund/fundOwner */ "./src/shared/graphql/schema/loaders/fund/fundOwner.ts");
/* harmony import */ var _loaders_fund_fundName__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./loaders/fund/fundName */ "./src/shared/graphql/schema/loaders/fund/fundName.ts");
/* harmony import */ var _loaders_fund_fundRoutes__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./loaders/fund/fundRoutes */ "./src/shared/graphql/schema/loaders/fund/fundRoutes.ts");
/* harmony import */ var _loaders_fund_fundHoldings__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./loaders/fund/fundHoldings */ "./src/shared/graphql/schema/loaders/fund/fundHoldings.ts");
/* harmony import */ var _loaders_fund_fundDenominationAsset__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./loaders/fund/fundDenominationAsset */ "./src/shared/graphql/schema/loaders/fund/fundDenominationAsset.ts");
/* harmony import */ var _loaders_fund_fundNativeAsset__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./loaders/fund/fundNativeAsset */ "./src/shared/graphql/schema/loaders/fund/fundNativeAsset.ts");
/* harmony import */ var _loaders_fund_fundTotalSupply__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./loaders/fund/fundTotalSupply */ "./src/shared/graphql/schema/loaders/fund/fundTotalSupply.ts");
/* harmony import */ var _loaders_fund_fundCalculations__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./loaders/fund/fundCalculations */ "./src/shared/graphql/schema/loaders/fund/fundCalculations.ts");
/* harmony import */ var _loaders_fund_fundAddressFromManager__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./loaders/fund/fundAddressFromManager */ "./src/shared/graphql/schema/loaders/fund/fundAddressFromManager.ts");
/* harmony import */ var _loaders_fund_fundIsShutdown__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./loaders/fund/fundIsShutdown */ "./src/shared/graphql/schema/loaders/fund/fundIsShutdown.ts");
/* harmony import */ var _loaders_fund_fundParticipation__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./loaders/fund/fundParticipation */ "./src/shared/graphql/schema/loaders/fund/fundParticipation.ts");
/* harmony import */ var _loaders_quoteToken__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./loaders/quoteToken */ "./src/shared/graphql/schema/loaders/quoteToken.ts");
/* harmony import */ var _loaders_assetPrice__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./loaders/assetPrice */ "./src/shared/graphql/schema/loaders/assetPrice.ts");
/* harmony import */ var _loaders_exchangeOrders__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./loaders/exchangeOrders */ "./src/shared/graphql/schema/loaders/exchangeOrders.ts");
/* harmony import */ var _loaders_fund_fundIsComplete__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./loaders/fund/fundIsComplete */ "./src/shared/graphql/schema/loaders/fund/fundIsComplete.ts");
/* harmony import */ var _loaders_symbolBalance__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./loaders/symbolBalance */ "./src/shared/graphql/schema/loaders/symbolBalance.ts");
/* harmony import */ var _loaders_symbolBalanceObservable__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./loaders/symbolBalanceObservable */ "./src/shared/graphql/schema/loaders/symbolBalanceObservable.ts");
/* harmony import */ var _utils_resolveNetwork__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./utils/resolveNetwork */ "./src/shared/graphql/schema/utils/resolveNetwork.ts");
/* harmony import */ var _loaders_routes__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./loaders/routes */ "./src/shared/graphql/schema/loaders/routes.ts");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }





























/* harmony default export */ __webpack_exports__["default"] = (function (environment, streams) {
  var fundIsComplete = new dataloader__WEBPACK_IMPORTED_MODULE_1___default.a(function (addresses) {
    var fn = Object(_loaders_fund_fundIsComplete__WEBPACK_IMPORTED_MODULE_24__["default"])(environment);
    return Promise.all(addresses.map(fn) || []);
  });
  var fundAddressFromManager = new dataloader__WEBPACK_IMPORTED_MODULE_1___default.a(function (addresses) {
    var fn = Object(_loaders_fund_fundAddressFromManager__WEBPACK_IMPORTED_MODULE_18__["default"])(environment);
    return Promise.all(addresses.map(fn) || []);
  });
  var routes = new dataloader__WEBPACK_IMPORTED_MODULE_1___default.a(function (addresses) {
    var fn = Object(_loaders_routes__WEBPACK_IMPORTED_MODULE_28__["default"])(environment);
    return Promise.all(addresses.map(fn) || []);
  });
  var fundName = new dataloader__WEBPACK_IMPORTED_MODULE_1___default.a(function (addresses) {
    var fn = Object(_loaders_fund_fundName__WEBPACK_IMPORTED_MODULE_11__["default"])(environment);
    return Promise.all(addresses.map(fn) || []);
  });
  var fundDenominationAsset = new dataloader__WEBPACK_IMPORTED_MODULE_1___default.a(
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(addresses) {
      var routes;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return fundRoutes.loadMany(addresses);

            case 2:
              routes = _context.sent;
              return _context.abrupt("return", Promise.all(addresses.map(function (address, key) {
                var _ref2 = routes[key] || {
                  accountingAddress: null
                },
                    accountingAddress = _ref2.accountingAddress;

                return accountingAddress && Object(_loaders_fund_fundDenominationAsset__WEBPACK_IMPORTED_MODULE_14__["default"])(environment, accountingAddress);
              })));

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
  var fundNativeAsset = new dataloader__WEBPACK_IMPORTED_MODULE_1___default.a(
  /*#__PURE__*/
  function () {
    var _ref3 = _asyncToGenerator(
    /*#__PURE__*/
    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(addresses) {
      var routes;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return fundRoutes.loadMany(addresses);

            case 2:
              routes = _context2.sent;
              return _context2.abrupt("return", Promise.all(addresses.map(function (address, key) {
                var _ref4 = routes[key] || {
                  accountingAddress: null
                },
                    accountingAddress = _ref4.accountingAddress;

                return accountingAddress && Object(_loaders_fund_fundNativeAsset__WEBPACK_IMPORTED_MODULE_15__["default"])(environment, accountingAddress);
              })));

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    return function (_x2) {
      return _ref3.apply(this, arguments);
    };
  }());
  var fundReady = new dataloader__WEBPACK_IMPORTED_MODULE_1___default.a(
  /*#__PURE__*/
  function () {
    var _ref5 = _asyncToGenerator(
    /*#__PURE__*/
    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3(addresses) {
      var routes;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return fundRoutes.loadMany(addresses);

            case 2:
              routes = _context3.sent;
              return _context3.abrupt("return", Promise.all(addresses.map(function (address, key) {
                return !!(routes && routes[key]);
              })));

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    return function (_x3) {
      return _ref5.apply(this, arguments);
    };
  }());
  var fundOwner = new dataloader__WEBPACK_IMPORTED_MODULE_1___default.a(function (addresses) {
    var fn = Object(_loaders_fund_fundOwner__WEBPACK_IMPORTED_MODULE_10__["default"])(environment);
    return Promise.all(addresses.map(fn) || []);
  });
  var fundRoutes = new dataloader__WEBPACK_IMPORTED_MODULE_1___default.a(function (addresses) {
    var fn = Object(_loaders_fund_fundRoutes__WEBPACK_IMPORTED_MODULE_12__["default"])(environment);
    return Promise.all(addresses.map(fn) || []);
  });
  var fundTotalSupply = new dataloader__WEBPACK_IMPORTED_MODULE_1___default.a(
  /*#__PURE__*/
  function () {
    var _ref6 = _asyncToGenerator(
    /*#__PURE__*/
    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee4(addresses) {
      var routes;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return fundRoutes.loadMany(addresses);

            case 2:
              routes = _context4.sent;
              return _context4.abrupt("return", Promise.all(addresses.map(function (address, key) {
                var _ref7 = routes[key] || {
                  sharesAddress: null
                },
                    sharesAddress = _ref7.sharesAddress;

                return sharesAddress && Object(_loaders_fund_fundTotalSupply__WEBPACK_IMPORTED_MODULE_16__["default"])(environment, sharesAddress);
              })));

            case 4:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    return function (_x4) {
      return _ref6.apply(this, arguments);
    };
  }());
  var fundRank = new dataloader__WEBPACK_IMPORTED_MODULE_1___default.a(
  /*#__PURE__*/
  function () {
    var _ref8 = _asyncToGenerator(
    /*#__PURE__*/
    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee5(addresses) {
      var ranking;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return Object(_utils_takeLast__WEBPACK_IMPORTED_MODULE_5__["default"])(streams.ranking$);

            case 2:
              _context5.t0 = _context5.sent;

              if (_context5.t0) {
                _context5.next = 5;
                break;
              }

              _context5.t0 = [];

            case 5:
              ranking = _context5.t0;
              return _context5.abrupt("return", Promise.all(addresses.map(function (address) {
                var entry = ramda__WEBPACK_IMPORTED_MODULE_3__["find"](ramda__WEBPACK_IMPORTED_MODULE_3__["propEq"]('address', address), ranking);
                return ramda__WEBPACK_IMPORTED_MODULE_3__["propOr"](0, 'rank', entry);
              })));

            case 7:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    return function (_x5) {
      return _ref8.apply(this, arguments);
    };
  }());
  var fundInception = new dataloader__WEBPACK_IMPORTED_MODULE_1___default.a(function (addresses) {
    var fn = Object(_loaders_fund_fundInception__WEBPACK_IMPORTED_MODULE_9__["default"])(environment);
    return Promise.all(addresses.map(fn) || []);
  });
  var fundCalculations = new dataloader__WEBPACK_IMPORTED_MODULE_1___default.a(
  /*#__PURE__*/
  function () {
    var _ref9 = _asyncToGenerator(
    /*#__PURE__*/
    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee6(addresses) {
      var routes;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return fundRoutes.loadMany(addresses);

            case 2:
              routes = _context6.sent;
              return _context6.abrupt("return", Promise.all(addresses.map(function (address, key) {
                var _ref10 = routes[key] || {
                  accountingAddress: null
                },
                    accountingAddress = _ref10.accountingAddress;

                return accountingAddress && Object(_loaders_fund_fundCalculations__WEBPACK_IMPORTED_MODULE_17__["default"])(environment, accountingAddress);
              })));

            case 4:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    return function (_x6) {
      return _ref9.apply(this, arguments);
    };
  }());
  var fundHoldings = new dataloader__WEBPACK_IMPORTED_MODULE_1___default.a(
  /*#__PURE__*/
  function () {
    var _ref11 = _asyncToGenerator(
    /*#__PURE__*/
    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee7(addresses) {
      var routes;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return fundRoutes.loadMany(addresses);

            case 2:
              routes = _context7.sent;
              return _context7.abrupt("return", Promise.all(addresses.map(function (address, key) {
                var _ref12 = routes[key] || {
                  accountingAddress: null
                },
                    accountingAddress = _ref12.accountingAddress;

                return accountingAddress && Object(_loaders_fund_fundHoldings__WEBPACK_IMPORTED_MODULE_13__["default"])(environment, accountingAddress);
              })));

            case 4:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    return function (_x7) {
      return _ref11.apply(this, arguments);
    };
  }());
  var fundIsShutdown = new dataloader__WEBPACK_IMPORTED_MODULE_1___default.a(function (addresses) {
    var fn = Object(_loaders_fund_fundIsShutdown__WEBPACK_IMPORTED_MODULE_19__["default"])(environment);
    return Promise.all(addresses.map(fn) || []);
  });
  var fundParticipation = new dataloader__WEBPACK_IMPORTED_MODULE_1___default.a(
  /*#__PURE__*/
  function () {
    var _ref13 = _asyncToGenerator(
    /*#__PURE__*/
    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee8(pairs) {
      var funds, investors, routes;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              funds = pairs.map(function (pair) {
                return pair.fund;
              });
              investors = pairs.map(function (pair) {
                return pair.investor;
              });
              _context8.next = 4;
              return fundRoutes.loadMany(funds);

            case 4:
              routes = _context8.sent;
              return _context8.abrupt("return", Promise.all(investors.map(function (investor, key) {
                var _ref14 = routes[key] || {
                  sharesAddress: null
                },
                    sharesAddress = _ref14.sharesAddress;

                return sharesAddress && Object(_loaders_fund_fundParticipation__WEBPACK_IMPORTED_MODULE_20__["default"])(environment, sharesAddress, investor);
              })));

            case 6:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, this);
    }));

    return function (_x8) {
      return _ref13.apply(this, arguments);
    };
  }(), {
    cacheKeyFn: function cacheKeyFn(pair) {
      return "".concat(pair.fund, ":").concat(pair.investor);
    }
  });
  var fundByName = new dataloader__WEBPACK_IMPORTED_MODULE_1___default.a(
  /*#__PURE__*/
  function () {
    var _ref15 = _asyncToGenerator(
    /*#__PURE__*/
    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee9(names) {
      var ranking;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return fundRanking();

            case 2:
              ranking = _context9.sent;
              return _context9.abrupt("return", Promise.all(names.map(function (name) {
                var entry = ramda__WEBPACK_IMPORTED_MODULE_3__["find"](ramda__WEBPACK_IMPORTED_MODULE_3__["propEq"]('name', name), ranking);
                return ramda__WEBPACK_IMPORTED_MODULE_3__["prop"]('address', entry);
              })));

            case 4:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9, this);
    }));

    return function (_x9) {
      return _ref15.apply(this, arguments);
    };
  }());
  var fundRanking = memoize_one__WEBPACK_IMPORTED_MODULE_2___default()(function () {
    return Object(_utils_takeLast__WEBPACK_IMPORTED_MODULE_5__["default"])(streams.ranking$);
  });
  var symbolBalance = new dataloader__WEBPACK_IMPORTED_MODULE_1___default.a(
  /*#__PURE__*/
  function () {
    var _ref16 = _asyncToGenerator(
    /*#__PURE__*/
    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee10(pairs) {
      var fn, result;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              fn = Object(_loaders_symbolBalance__WEBPACK_IMPORTED_MODULE_25__["default"])(environment);
              result = pairs.map(function (pair) {
                return fn(pair.symbol, pair.address);
              });
              return _context10.abrupt("return", Promise.all(result || []));

            case 3:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10, this);
    }));

    return function (_x10) {
      return _ref16.apply(this, arguments);
    };
  }(), {
    cacheKeyFn: function cacheKeyFn(pair) {
      return "".concat(pair.symbol, ":").concat(pair.address);
    }
  });
  var symbolBalanceObservable = new dataloader__WEBPACK_IMPORTED_MODULE_1___default.a(
  /*#__PURE__*/
  function () {
    var _ref17 = _asyncToGenerator(
    /*#__PURE__*/
    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee11(pairs) {
      var fn, result;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              fn = Object(_loaders_symbolBalanceObservable__WEBPACK_IMPORTED_MODULE_26__["default"])(environment, streams);
              result = pairs.map(function (pair) {
                return fn(pair.symbol, pair.address);
              });
              return _context11.abrupt("return", Promise.all(result || []));

            case 3:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11, this);
    }));

    return function (_x11) {
      return _ref17.apply(this, arguments);
    };
  }(), {
    cacheKeyFn: function cacheKeyFn(pair) {
      return "".concat(pair.symbol, ":").concat(pair.address);
    }
  });
  var assetPrice = new dataloader__WEBPACK_IMPORTED_MODULE_1___default.a(function (tokens) {
    var fn = Object(_loaders_assetPrice__WEBPACK_IMPORTED_MODULE_22__["default"])(environment);
    return Promise.all(tokens.map(fn) || []);
  }, {
    cacheKeyFn: function cacheKeyFn(token) {
      return "".concat(token.symbol);
    }
  });
  var exchangeOrders = new dataloader__WEBPACK_IMPORTED_MODULE_1___default.a(function (pairs) {
    var fn = Object(_loaders_exchangeOrders__WEBPACK_IMPORTED_MODULE_23__["default"])(environment);
    var result = pairs.map(function (pair) {
      return fn(pair.exchange, pair.base, pair.quote);
    });
    return Promise.all(result || []);
  }, {
    cacheKeyFn: function cacheKeyFn(options) {
      return "".concat(options.exchange, ":").concat(options.base, ":").concat(options.quote);
    }
  });
  var quoteToken = memoize_one__WEBPACK_IMPORTED_MODULE_2___default()(function () {
    return Object(_loaders_quoteToken__WEBPACK_IMPORTED_MODULE_21__["default"])(environment, environment.deployment.melonContracts.priceSource);
  });
  var currentBlock = memoize_one__WEBPACK_IMPORTED_MODULE_2___default()(function () {
    return Object(_utils_takeLast__WEBPACK_IMPORTED_MODULE_5__["default"])(streams.block$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["pluck"])('number')));
  });
  var nodeSynced = memoize_one__WEBPACK_IMPORTED_MODULE_2___default()(function () {
    return Object(_utils_takeLast__WEBPACK_IMPORTED_MODULE_5__["default"])(streams.syncing$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (value) {
      return !value;
    })));
  });
  var priceFeedUp = memoize_one__WEBPACK_IMPORTED_MODULE_2___default()(function () {
    return Object(_utils_takeLast__WEBPACK_IMPORTED_MODULE_5__["default"])(streams.recentPrice$);
  });
  var peerCount = memoize_one__WEBPACK_IMPORTED_MODULE_2___default()(function () {
    return Object(_utils_takeLast__WEBPACK_IMPORTED_MODULE_5__["default"])(streams.peers$);
  });
  var versionDeployment = memoize_one__WEBPACK_IMPORTED_MODULE_2___default()(function () {
    return environment.deployment;
  });
  var networkName = memoize_one__WEBPACK_IMPORTED_MODULE_2___default()(
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee12() {
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _context12.t0 = _utils_resolveNetwork__WEBPACK_IMPORTED_MODULE_27__["default"];
            _context12.next = 3;
            return environment.eth.net.getId();

          case 3:
            _context12.t1 = _context12.sent;
            return _context12.abrupt("return", (0, _context12.t0)(_context12.t1));

          case 5:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12, this);
  })));
  return {
    assetPrice: assetPrice,
    currentBlock: currentBlock,
    fundAddressFromManager: fundAddressFromManager,
    fundByName: fundByName,
    fundCalculations: fundCalculations,
    fundHoldings: fundHoldings,
    fundInception: fundInception,
    fundIsShutdown: fundIsShutdown,
    fundName: fundName,
    fundNativeAsset: fundNativeAsset,
    fundOwner: fundOwner,
    fundParticipation: fundParticipation,
    fundDenominationAsset: fundDenominationAsset,
    fundRank: fundRank,
    fundRanking: fundRanking,
    fundReady: fundReady,
    fundRoutes: fundRoutes,
    fundTotalSupply: fundTotalSupply,
    generateMnemonic: _loaders_wallet_generateMnemonic__WEBPACK_IMPORTED_MODULE_8__["default"],
    importWallet: _loaders_wallet_decryptWallet__WEBPACK_IMPORTED_MODULE_6__["default"],
    networkName: networkName,
    nodeSynced: nodeSynced,
    peerCount: peerCount,
    priceFeedUp: priceFeedUp,
    quoteToken: quoteToken,
    restoreWallet: _loaders_wallet_restoreWallet__WEBPACK_IMPORTED_MODULE_7__["default"],
    symbolBalance: symbolBalance,
    symbolBalanceObservable: symbolBalanceObservable,
    versionDeployment: versionDeployment,
    fundIsComplete: fundIsComplete,
    routes: routes,
    exchangeOrders: exchangeOrders
  };
});

/***/ }),

/***/ "./src/shared/graphql/schema/loaders/assetPrice.ts":
/*!*********************************************************!*\
  !*** ./src/shared/graphql/schema/loaders/assetPrice.ts ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ramda */ "ramda");
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ramda__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _melonproject_protocol__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @melonproject/protocol */ "@melonproject/protocol");
/* harmony import */ var _melonproject_protocol__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_melonproject_protocol__WEBPACK_IMPORTED_MODULE_1__);


/* harmony default export */ __webpack_exports__["default"] = (ramda__WEBPACK_IMPORTED_MODULE_0__["curryN"](2, function (environment, token) {
  return Object(_melonproject_protocol__WEBPACK_IMPORTED_MODULE_1__["getPrice"])(environment, environment.deployment.melonContracts.priceSource, token);
}));

/***/ }),

/***/ "./src/shared/graphql/schema/loaders/exchangeOrders.ts":
/*!*************************************************************!*\
  !*** ./src/shared/graphql/schema/loaders/exchangeOrders.ts ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ramda */ "ramda");
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(ramda__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _melonproject_exchange_aggregator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @melonproject/exchange-aggregator */ "@melonproject/exchange-aggregator");
/* harmony import */ var _melonproject_exchange_aggregator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_melonproject_exchange_aggregator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _melonproject_protocol_lib_utils_environment_getTokenBySymbol__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @melonproject/protocol/lib/utils/environment/getTokenBySymbol */ "@melonproject/protocol/lib/utils/environment/getTokenBySymbol");
/* harmony import */ var _melonproject_protocol_lib_utils_environment_getTokenBySymbol__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_melonproject_protocol_lib_utils_environment_getTokenBySymbol__WEBPACK_IMPORTED_MODULE_3__);


function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }




/* harmony default export */ __webpack_exports__["default"] = (ramda__WEBPACK_IMPORTED_MODULE_1__["curryN"](4,
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(environment, exchange, base, quote) {
    var options, result;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            options = {
              network: _melonproject_exchange_aggregator__WEBPACK_IMPORTED_MODULE_2__["Network"].MAINNET,
              pair: {
                base: Object(_melonproject_protocol_lib_utils_environment_getTokenBySymbol__WEBPACK_IMPORTED_MODULE_3__["getTokenBySymbol"])(environment, base),
                quote: Object(_melonproject_protocol_lib_utils_environment_getTokenBySymbol__WEBPACK_IMPORTED_MODULE_3__["getTokenBySymbol"])(environment, quote)
              }
            };

            result = function () {
              switch (exchange) {
                case 'OASIS_DEX':
                  return _melonproject_exchange_aggregator__WEBPACK_IMPORTED_MODULE_2__["exchanges"].oasisdex.fetch(_objectSpread({}, options, {
                    environment: environment
                  }));

                case 'RADAR_RELAY':
                  return _melonproject_exchange_aggregator__WEBPACK_IMPORTED_MODULE_2__["exchanges"].radarrelay.fetch(options);

                case 'KYBER_NETWORK':
                  return _melonproject_exchange_aggregator__WEBPACK_IMPORTED_MODULE_2__["exchanges"].kyber.fetch(options);

                case 'ETHFINEX':
                  return _melonproject_exchange_aggregator__WEBPACK_IMPORTED_MODULE_2__["exchanges"].ethfinex.fetch(options);

                default:
                  throw new Error('Invalid exchange.');
              }
            }();

            return _context.abrupt("return", result.catch(function () {
              return [];
            }));

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}()));

/***/ }),

/***/ "./src/shared/graphql/schema/loaders/fund/fundAddressFromManager.ts":
/*!**************************************************************************!*\
  !*** ./src/shared/graphql/schema/loaders/fund/fundAddressFromManager.ts ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ramda */ "ramda");
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ramda__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _melonproject_protocol__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @melonproject/protocol */ "@melonproject/protocol");
/* harmony import */ var _melonproject_protocol__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_melonproject_protocol__WEBPACK_IMPORTED_MODULE_1__);



function fundAddressFromManager(environment, managerAddress) {
  return Object(_melonproject_protocol__WEBPACK_IMPORTED_MODULE_1__["managersToHubs"])(environment, environment.deployment.melonContracts.version, managerAddress);
}

/* harmony default export */ __webpack_exports__["default"] = (ramda__WEBPACK_IMPORTED_MODULE_0__["curryN"](2, fundAddressFromManager));

/***/ }),

/***/ "./src/shared/graphql/schema/loaders/fund/fundCalculations.ts":
/*!********************************************************************!*\
  !*** ./src/shared/graphql/schema/loaders/fund/fundCalculations.ts ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ramda */ "ramda");
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ramda__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _melonproject_protocol_lib_contracts_fund_accounting_calls_performCalculations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @melonproject/protocol/lib/contracts/fund/accounting/calls/performCalculations */ "@melonproject/protocol/lib/contracts/fund/accounting/calls/performCalculations");
/* harmony import */ var _melonproject_protocol_lib_contracts_fund_accounting_calls_performCalculations__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_melonproject_protocol_lib_contracts_fund_accounting_calls_performCalculations__WEBPACK_IMPORTED_MODULE_1__);



function fundCalculations(environment, address) {
  return Object(_melonproject_protocol_lib_contracts_fund_accounting_calls_performCalculations__WEBPACK_IMPORTED_MODULE_1__["performCalculations"])(environment, address);
}

/* harmony default export */ __webpack_exports__["default"] = (ramda__WEBPACK_IMPORTED_MODULE_0__["curryN"](2, fundCalculations));

/***/ }),

/***/ "./src/shared/graphql/schema/loaders/fund/fundDenominationAsset.ts":
/*!*************************************************************************!*\
  !*** ./src/shared/graphql/schema/loaders/fund/fundDenominationAsset.ts ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ramda */ "ramda");
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ramda__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _melonproject_protocol__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @melonproject/protocol */ "@melonproject/protocol");
/* harmony import */ var _melonproject_protocol__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_melonproject_protocol__WEBPACK_IMPORTED_MODULE_1__);



function fundDenominationAsset(environment, address) {
  return Object(_melonproject_protocol__WEBPACK_IMPORTED_MODULE_1__["getDenominationAsset"])(environment, address);
}

/* harmony default export */ __webpack_exports__["default"] = (ramda__WEBPACK_IMPORTED_MODULE_0__["curryN"](2, fundDenominationAsset));

/***/ }),

/***/ "./src/shared/graphql/schema/loaders/fund/fundHoldings.ts":
/*!****************************************************************!*\
  !*** ./src/shared/graphql/schema/loaders/fund/fundHoldings.ts ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ramda */ "ramda");
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(ramda__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _melonproject_token_math__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @melonproject/token-math */ "@melonproject/token-math");
/* harmony import */ var _melonproject_token_math__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_melonproject_token_math__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _melonproject_protocol__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @melonproject/protocol */ "@melonproject/protocol");
/* harmony import */ var _melonproject_protocol__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_melonproject_protocol__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _melonproject_protocol_lib_utils_environment_getTokenByAddress__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @melonproject/protocol/lib/utils/environment/getTokenByAddress */ "@melonproject/protocol/lib/utils/environment/getTokenByAddress");
/* harmony import */ var _melonproject_protocol_lib_utils_environment_getTokenByAddress__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_melonproject_protocol_lib_utils_environment_getTokenByAddress__WEBPACK_IMPORTED_MODULE_4__);


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }






function fundHoldings(_x, _x2) {
  return _fundHoldings.apply(this, arguments);
}

function _fundHoldings() {
  _fundHoldings = _asyncToGenerator(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(environment, address) {
    var _ref, quantities, tokens, availableTokens, holdings;

    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return Object(_melonproject_protocol__WEBPACK_IMPORTED_MODULE_3__["getFundHoldings"])(environment, address);

          case 2:
            _ref = _context.sent;
            quantities = _ref[0];
            tokens = _ref[1];
            availableTokens = ramda__WEBPACK_IMPORTED_MODULE_1__["pathOr"]([], ['deployment', 'thirdPartyContracts', 'tokens'], environment).map(function (value) {
              return {
                quantity: 0,
                token: value
              };
            });
            holdings = tokens.filter(function (value) {
              return Object(_melonproject_protocol__WEBPACK_IMPORTED_MODULE_3__["isAddress"])(value) && !Object(_melonproject_protocol__WEBPACK_IMPORTED_MODULE_3__["isEmptyAddress"])(value);
            }).map(function (value, key) {
              var token = Object(_melonproject_protocol_lib_utils_environment_getTokenByAddress__WEBPACK_IMPORTED_MODULE_4__["getTokenByAddress"])(environment, value);
              return _melonproject_token_math__WEBPACK_IMPORTED_MODULE_2__["createQuantity"](token, quantities[key]);
            });
            return _context.abrupt("return", ramda__WEBPACK_IMPORTED_MODULE_1__["unionWith"](ramda__WEBPACK_IMPORTED_MODULE_1__["eqBy"](ramda__WEBPACK_IMPORTED_MODULE_1__["prop"]('token')), holdings, availableTokens));

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _fundHoldings.apply(this, arguments);
}

/* harmony default export */ __webpack_exports__["default"] = (ramda__WEBPACK_IMPORTED_MODULE_1__["curryN"](2, fundHoldings));

/***/ }),

/***/ "./src/shared/graphql/schema/loaders/fund/fundInception.ts":
/*!*****************************************************************!*\
  !*** ./src/shared/graphql/schema/loaders/fund/fundInception.ts ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ramda */ "ramda");
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ramda__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _melonproject_protocol_lib_contracts_fund_hub_calls_getCreationTime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @melonproject/protocol/lib/contracts/fund/hub/calls/getCreationTime */ "@melonproject/protocol/lib/contracts/fund/hub/calls/getCreationTime");
/* harmony import */ var _melonproject_protocol_lib_contracts_fund_hub_calls_getCreationTime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_melonproject_protocol_lib_contracts_fund_hub_calls_getCreationTime__WEBPACK_IMPORTED_MODULE_1__);



function fundInception(environment, address) {
  return Object(_melonproject_protocol_lib_contracts_fund_hub_calls_getCreationTime__WEBPACK_IMPORTED_MODULE_1__["getCreationTime"])(environment, address);
}

/* harmony default export */ __webpack_exports__["default"] = (ramda__WEBPACK_IMPORTED_MODULE_0__["curryN"](2, fundInception));

/***/ }),

/***/ "./src/shared/graphql/schema/loaders/fund/fundIsComplete.ts":
/*!******************************************************************!*\
  !*** ./src/shared/graphql/schema/loaders/fund/fundIsComplete.ts ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ramda */ "ramda");
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(ramda__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _melonproject_protocol__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @melonproject/protocol */ "@melonproject/protocol");
/* harmony import */ var _melonproject_protocol__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_melonproject_protocol__WEBPACK_IMPORTED_MODULE_2__);


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }




function fundIsComplete(_x, _x2) {
  return _fundIsComplete.apply(this, arguments);
}

function _fundIsComplete() {
  _fundIsComplete = _asyncToGenerator(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(environment, fundAddress) {
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", Object(_melonproject_protocol__WEBPACK_IMPORTED_MODULE_2__["childExists"])(environment, environment.deployment.melonContracts.version, fundAddress));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _fundIsComplete.apply(this, arguments);
}

/* harmony default export */ __webpack_exports__["default"] = (ramda__WEBPACK_IMPORTED_MODULE_1__["curryN"](2, fundIsComplete));

/***/ }),

/***/ "./src/shared/graphql/schema/loaders/fund/fundIsShutdown.ts":
/*!******************************************************************!*\
  !*** ./src/shared/graphql/schema/loaders/fund/fundIsShutdown.ts ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ramda */ "ramda");
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ramda__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _melonproject_protocol_lib_contracts_fund_hub_calls_isShutDown__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @melonproject/protocol/lib/contracts/fund/hub/calls/isShutDown */ "@melonproject/protocol/lib/contracts/fund/hub/calls/isShutDown");
/* harmony import */ var _melonproject_protocol_lib_contracts_fund_hub_calls_isShutDown__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_melonproject_protocol_lib_contracts_fund_hub_calls_isShutDown__WEBPACK_IMPORTED_MODULE_1__);



function fundIsShutdown(environment, address) {
  return Object(_melonproject_protocol_lib_contracts_fund_hub_calls_isShutDown__WEBPACK_IMPORTED_MODULE_1__["isShutDown"])(environment, address);
}

/* harmony default export */ __webpack_exports__["default"] = (ramda__WEBPACK_IMPORTED_MODULE_0__["curryN"](2, fundIsShutdown));

/***/ }),

/***/ "./src/shared/graphql/schema/loaders/fund/fundName.ts":
/*!************************************************************!*\
  !*** ./src/shared/graphql/schema/loaders/fund/fundName.ts ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ramda */ "ramda");
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ramda__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _melonproject_protocol__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @melonproject/protocol */ "@melonproject/protocol");
/* harmony import */ var _melonproject_protocol__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_melonproject_protocol__WEBPACK_IMPORTED_MODULE_1__);



function fundName(environment, address) {
  return Object(_melonproject_protocol__WEBPACK_IMPORTED_MODULE_1__["getName"])(environment, address);
}

/* harmony default export */ __webpack_exports__["default"] = (ramda__WEBPACK_IMPORTED_MODULE_0__["curryN"](2, fundName));

/***/ }),

/***/ "./src/shared/graphql/schema/loaders/fund/fundNativeAsset.ts":
/*!*******************************************************************!*\
  !*** ./src/shared/graphql/schema/loaders/fund/fundNativeAsset.ts ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ramda */ "ramda");
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ramda__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _melonproject_protocol_lib_contracts_fund_accounting_calls_getNativeToken__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @melonproject/protocol/lib/contracts/fund/accounting/calls/getNativeToken */ "@melonproject/protocol/lib/contracts/fund/accounting/calls/getNativeToken");
/* harmony import */ var _melonproject_protocol_lib_contracts_fund_accounting_calls_getNativeToken__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_melonproject_protocol_lib_contracts_fund_accounting_calls_getNativeToken__WEBPACK_IMPORTED_MODULE_1__);



function fundNativeAsset(environment, address) {
  return Object(_melonproject_protocol_lib_contracts_fund_accounting_calls_getNativeToken__WEBPACK_IMPORTED_MODULE_1__["getNativeToken"])(environment, address);
}

/* harmony default export */ __webpack_exports__["default"] = (ramda__WEBPACK_IMPORTED_MODULE_0__["curryN"](2, fundNativeAsset));

/***/ }),

/***/ "./src/shared/graphql/schema/loaders/fund/fundOwner.ts":
/*!*************************************************************!*\
  !*** ./src/shared/graphql/schema/loaders/fund/fundOwner.ts ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ramda */ "ramda");
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ramda__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _melonproject_protocol__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @melonproject/protocol */ "@melonproject/protocol");
/* harmony import */ var _melonproject_protocol__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_melonproject_protocol__WEBPACK_IMPORTED_MODULE_1__);



function fundOwner(environment, address) {
  return Object(_melonproject_protocol__WEBPACK_IMPORTED_MODULE_1__["getManager"])(environment, address);
}

/* harmony default export */ __webpack_exports__["default"] = (ramda__WEBPACK_IMPORTED_MODULE_0__["curryN"](2, fundOwner));

/***/ }),

/***/ "./src/shared/graphql/schema/loaders/fund/fundParticipation.ts":
/*!*********************************************************************!*\
  !*** ./src/shared/graphql/schema/loaders/fund/fundParticipation.ts ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ramda */ "ramda");
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ramda__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _melonproject_protocol__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @melonproject/protocol */ "@melonproject/protocol");
/* harmony import */ var _melonproject_protocol__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_melonproject_protocol__WEBPACK_IMPORTED_MODULE_1__);



function fundParticipation(environment, sharesAddress, investorAddress) {
  return Object(_melonproject_protocol__WEBPACK_IMPORTED_MODULE_1__["balanceOf"])(environment, sharesAddress, {
    address: investorAddress
  });
}

/* harmony default export */ __webpack_exports__["default"] = (ramda__WEBPACK_IMPORTED_MODULE_0__["curryN"](3, fundParticipation));

/***/ }),

/***/ "./src/shared/graphql/schema/loaders/fund/fundRoutes.ts":
/*!**************************************************************!*\
  !*** ./src/shared/graphql/schema/loaders/fund/fundRoutes.ts ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ramda */ "ramda");
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ramda__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _melonproject_protocol__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @melonproject/protocol */ "@melonproject/protocol");
/* harmony import */ var _melonproject_protocol__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_melonproject_protocol__WEBPACK_IMPORTED_MODULE_1__);



function fundRoutes(environment, address) {
  return Object(_melonproject_protocol__WEBPACK_IMPORTED_MODULE_1__["getRoutes"])(environment, address);
}

/* harmony default export */ __webpack_exports__["default"] = (ramda__WEBPACK_IMPORTED_MODULE_0__["curryN"](2, fundRoutes));

/***/ }),

/***/ "./src/shared/graphql/schema/loaders/fund/fundTotalSupply.ts":
/*!*******************************************************************!*\
  !*** ./src/shared/graphql/schema/loaders/fund/fundTotalSupply.ts ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ramda */ "ramda");
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(ramda__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _melonproject_token_math__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @melonproject/token-math */ "@melonproject/token-math");
/* harmony import */ var _melonproject_token_math__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_melonproject_token_math__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _melonproject_protocol__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @melonproject/protocol */ "@melonproject/protocol");
/* harmony import */ var _melonproject_protocol__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_melonproject_protocol__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _melonproject_protocol_lib_contracts_dependencies_token_calls_getToken__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @melonproject/protocol/lib/contracts/dependencies/token/calls/getToken */ "@melonproject/protocol/lib/contracts/dependencies/token/calls/getToken");
/* harmony import */ var _melonproject_protocol_lib_contracts_dependencies_token_calls_getToken__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_melonproject_protocol_lib_contracts_dependencies_token_calls_getToken__WEBPACK_IMPORTED_MODULE_4__);


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }






function getTotalSupply(_x, _x2) {
  return _getTotalSupply.apply(this, arguments);
}

function _getTotalSupply() {
  _getTotalSupply = _asyncToGenerator(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(environment, address) {
    var info, token;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return Object(_melonproject_protocol__WEBPACK_IMPORTED_MODULE_3__["getInfo"])(environment, address);

          case 2:
            info = _context.sent;
            _context.next = 5;
            return Object(_melonproject_protocol_lib_contracts_dependencies_token_calls_getToken__WEBPACK_IMPORTED_MODULE_4__["getToken"])(environment, address);

          case 5:
            token = _context.sent;
            return _context.abrupt("return", _melonproject_token_math__WEBPACK_IMPORTED_MODULE_2__["createQuantity"](token, info.totalSupply));

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _getTotalSupply.apply(this, arguments);
}

/* harmony default export */ __webpack_exports__["default"] = (ramda__WEBPACK_IMPORTED_MODULE_1__["curryN"](2, getTotalSupply));

/***/ }),

/***/ "./src/shared/graphql/schema/loaders/quoteToken.ts":
/*!*********************************************************!*\
  !*** ./src/shared/graphql/schema/loaders/quoteToken.ts ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _melonproject_protocol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @melonproject/protocol */ "@melonproject/protocol");
/* harmony import */ var _melonproject_protocol__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_melonproject_protocol__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = (_melonproject_protocol__WEBPACK_IMPORTED_MODULE_0__["getQuoteToken"]);

/***/ }),

/***/ "./src/shared/graphql/schema/loaders/routes.ts":
/*!*****************************************************!*\
  !*** ./src/shared/graphql/schema/loaders/routes.ts ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ramda */ "ramda");
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(ramda__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _melonproject_protocol__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @melonproject/protocol */ "@melonproject/protocol");
/* harmony import */ var _melonproject_protocol__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_melonproject_protocol__WEBPACK_IMPORTED_MODULE_2__);


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }





function routes(_x, _x2) {
  return _routes.apply(this, arguments);
}

function _routes() {
  _routes = _asyncToGenerator(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(environment, managerAddress) {
    var routes, isValidAddress;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return Object(_melonproject_protocol__WEBPACK_IMPORTED_MODULE_2__["managersToRoutes"])(environment, environment.deployment.melonContracts.version, managerAddress);

          case 2:
            routes = _context.sent;

            isValidAddress = function isValidAddress(address) {
              if (Object(_melonproject_protocol__WEBPACK_IMPORTED_MODULE_2__["isEmptyAddress"])(address)) {
                return null;
              }

              return address;
            };

            return _context.abrupt("return", {
              accountingAddress: isValidAddress(routes.accounting),
              feeManagerAddress: isValidAddress(routes.feeManager),
              participationAddress: isValidAddress(routes.participation),
              policyManagerAddress: isValidAddress(routes.policyManager),
              sharesAddress: isValidAddress(routes.shares),
              tradingAddress: isValidAddress(routes.trading),
              vaultAddress: isValidAddress(routes.vault),
              registryAddress: isValidAddress(routes.registry),
              versionAddress: isValidAddress(routes.version)
            });

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _routes.apply(this, arguments);
}

/* harmony default export */ __webpack_exports__["default"] = (ramda__WEBPACK_IMPORTED_MODULE_1__["curryN"](2, routes));

/***/ }),

/***/ "./src/shared/graphql/schema/loaders/symbolBalance.ts":
/*!************************************************************!*\
  !*** ./src/shared/graphql/schema/loaders/symbolBalance.ts ***!
  \************************************************************/
/*! exports provided: getEthBalance, getSymbolBalance, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getEthBalance", function() { return getEthBalance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSymbolBalance", function() { return getSymbolBalance; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ramda */ "ramda");
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(ramda__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _melonproject_token_math__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @melonproject/token-math */ "@melonproject/token-math");
/* harmony import */ var _melonproject_token_math__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_melonproject_token_math__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _melonproject_protocol__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @melonproject/protocol */ "@melonproject/protocol");
/* harmony import */ var _melonproject_protocol__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_melonproject_protocol__WEBPACK_IMPORTED_MODULE_3__);


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }




var getEthBalance =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(environment, address) {
    var balance, token, quantity;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return environment.eth.getBalance(address);

          case 2:
            balance = _context.sent;
            token = _melonproject_token_math__WEBPACK_IMPORTED_MODULE_2__["createToken"]('ETH');
            quantity = _melonproject_token_math__WEBPACK_IMPORTED_MODULE_2__["createQuantity"](token, balance.toString());
            return _context.abrupt("return", quantity);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getEthBalance(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var getSymbolBalance = ramda__WEBPACK_IMPORTED_MODULE_1__["curryN"](3, function (environment, symbol, address) {
  if (symbol === 'ETH') {
    return getEthBalance(environment, address);
  }

  var token = Object(_melonproject_protocol__WEBPACK_IMPORTED_MODULE_3__["getTokenBySymbol"])(environment, symbol);
  return token && Object(_melonproject_protocol__WEBPACK_IMPORTED_MODULE_3__["balanceOf"])(environment, token.address, {
    address: address
  }) || null;
});
/* harmony default export */ __webpack_exports__["default"] = (getSymbolBalance);

/***/ }),

/***/ "./src/shared/graphql/schema/loaders/symbolBalanceObservable.ts":
/*!**********************************************************************!*\
  !*** ./src/shared/graphql/schema/loaders/symbolBalanceObservable.ts ***!
  \**********************************************************************/
/*! exports provided: getSymbolBalanceObservable, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSymbolBalanceObservable", function() { return getSymbolBalanceObservable; });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ramda */ "ramda");
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ramda__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "rxjs");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(rxjs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "rxjs/operators");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _melonproject_protocol__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @melonproject/protocol */ "@melonproject/protocol");
/* harmony import */ var _melonproject_protocol__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_melonproject_protocol__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _symbolBalance__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./symbolBalance */ "./src/shared/graphql/schema/loaders/symbolBalance.ts");





var getSymbolBalanceObservable = ramda__WEBPACK_IMPORTED_MODULE_0__["curryN"](4, function (environment, streams, symbol, address) {
  if (symbol === 'ETH') {
    return streams.block$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["switchMap"])(function () {
      return Object(_symbolBalance__WEBPACK_IMPORTED_MODULE_4__["getEthBalance"])(environment, address);
    }));
  }

  var token = Object(_melonproject_protocol__WEBPACK_IMPORTED_MODULE_3__["getTokenBySymbol"])(environment, symbol);
  var zen = token && _melonproject_protocol__WEBPACK_IMPORTED_MODULE_3__["balanceOf"].observable(environment, token.address, {
    address: address
  });
  return zen && rxjs__WEBPACK_IMPORTED_MODULE_1__["from"](zen) || rxjs__WEBPACK_IMPORTED_MODULE_1__["empty"]();
});
/* harmony default export */ __webpack_exports__["default"] = (getSymbolBalanceObservable);

/***/ }),

/***/ "./src/shared/graphql/schema/loaders/wallet/decryptWallet.ts":
/*!*******************************************************************!*\
  !*** ./src/shared/graphql/schema/loaders/wallet/decryptWallet.ts ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ethers_wallet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ethers-wallet */ "ethers-wallet");
/* harmony import */ var ethers_wallet__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(ethers_wallet__WEBPACK_IMPORTED_MODULE_1__);


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }



var noop = function noop(decrypted, encrypted) {};

function decryptWallet(_x, _x2) {
  return _decryptWallet.apply(this, arguments);
}

function _decryptWallet() {
  _decryptWallet = _asyncToGenerator(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(wallet, password) {
    var callback,
        decrypted,
        _args = arguments;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            callback = _args.length > 2 && _args[2] !== undefined ? _args[2] : noop;
            _context.next = 3;
            return ethers_wallet__WEBPACK_IMPORTED_MODULE_1___default.a.Wallet.fromEncryptedWallet(wallet, password);

          case 3:
            decrypted = _context.sent;
            _context.next = 6;
            return callback(decrypted, wallet);

          case 6:
            return _context.abrupt("return", [decrypted.address]);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _decryptWallet.apply(this, arguments);
}

/* harmony default export */ __webpack_exports__["default"] = (decryptWallet);

/***/ }),

/***/ "./src/shared/graphql/schema/loaders/wallet/generateMnemonic.ts":
/*!**********************************************************************!*\
  !*** ./src/shared/graphql/schema/loaders/wallet/generateMnemonic.ts ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ethers_wallet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ethers-wallet */ "ethers-wallet");
/* harmony import */ var ethers_wallet__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(ethers_wallet__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var bip39__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bip39 */ "bip39");
/* harmony import */ var bip39__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(bip39__WEBPACK_IMPORTED_MODULE_2__);


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }




function generateMnemonic() {
  return _generateMnemonic.apply(this, arguments);
}

function _generateMnemonic() {
  _generateMnemonic = _asyncToGenerator(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
    var mnemonic, wallet;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            mnemonic = bip39__WEBPACK_IMPORTED_MODULE_2___default.a.generateMnemonic();
            wallet = new ethers_wallet__WEBPACK_IMPORTED_MODULE_1___default.a.Wallet.fromMnemonic(mnemonic);
            return _context.abrupt("return", wallet.mnemonic);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _generateMnemonic.apply(this, arguments);
}

/* harmony default export */ __webpack_exports__["default"] = (generateMnemonic);

/***/ }),

/***/ "./src/shared/graphql/schema/loaders/wallet/restoreWallet.ts":
/*!*******************************************************************!*\
  !*** ./src/shared/graphql/schema/loaders/wallet/restoreWallet.ts ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ethers_wallet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ethers-wallet */ "ethers-wallet");
/* harmony import */ var ethers_wallet__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(ethers_wallet__WEBPACK_IMPORTED_MODULE_1__);


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }



var noop = function noop(decrypted, encrypted) {};

function restoreWallet(_x, _x2) {
  return _restoreWallet.apply(this, arguments);
}

function _restoreWallet() {
  _restoreWallet = _asyncToGenerator(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(mnemonic, password) {
    var callback,
        decrypted,
        encrypted,
        _args = arguments;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            callback = _args.length > 2 && _args[2] !== undefined ? _args[2] : noop;
            decrypted = ethers_wallet__WEBPACK_IMPORTED_MODULE_1___default.a.Wallet.fromMnemonic(mnemonic);
            _context.next = 4;
            return decrypted.encrypt(password);

          case 4:
            encrypted = _context.sent;
            _context.next = 7;
            return callback(decrypted, encrypted);

          case 7:
            return _context.abrupt("return", [decrypted.address]);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _restoreWallet.apply(this, arguments);
}

/* harmony default export */ __webpack_exports__["default"] = (restoreWallet);

/***/ }),

/***/ "./src/shared/graphql/schema/resolvers.ts":
/*!************************************************!*\
  !*** ./src/shared/graphql/schema/resolvers.ts ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var graphql_iso_date__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! graphql-iso-date */ "graphql-iso-date");
/* harmony import */ var graphql_iso_date__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(graphql_iso_date__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var keytar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! keytar */ "keytar");
/* harmony import */ var keytar__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(keytar__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ramda */ "ramda");
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(ramda__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "rxjs/operators");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _melonproject_protocol__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @melonproject/protocol */ "@melonproject/protocol");
/* harmony import */ var _melonproject_protocol__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_melonproject_protocol__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _melonproject_token_math__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @melonproject/token-math */ "@melonproject/token-math");
/* harmony import */ var _melonproject_token_math__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_melonproject_token_math__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _utils_sameBlock__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils/sameBlock */ "./src/shared/graphql/schema/utils/sameBlock.ts");
/* harmony import */ var _utils_toAsyncIterator__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./utils/toAsyncIterator */ "./src/shared/graphql/schema/utils/toAsyncIterator.ts");


function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }









/* harmony default export */ __webpack_exports__["default"] = ({
  DateTime: graphql_iso_date__WEBPACK_IMPORTED_MODULE_1__["GraphQLDateTime"],
  Query: {
    defaultAccount: function defaultAccount(_, __, _ref) {
      var loaders = _ref.loaders;
      var wallet = loaders.getWallet();
      return wallet && wallet.address;
    },
    allAccounts: function allAccounts(_, __, _ref2) {
      var loaders = _ref2.loaders;
      // TODO: Make this return all accounts.
      var wallet = loaders.getWallet();
      return wallet && wallet.address && [wallet.address];
    },
    hasStoredWallet: function () {
      var _hasStoredWallet = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var credentials;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return keytar__WEBPACK_IMPORTED_MODULE_2__["findCredentials"]('melon.fund');

              case 2:
                credentials = _context.sent;
                return _context.abrupt("return", !!(credentials && credentials.length));

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function hasStoredWallet() {
        return _hasStoredWallet.apply(this, arguments);
      }

      return hasStoredWallet;
    }(),
    currentBlock: function currentBlock(_, __, _ref3) {
      var loaders = _ref3.loaders;
      return loaders.currentBlock();
    },
    nodeSynced: function nodeSynced(_, __, _ref4) {
      var loaders = _ref4.loaders;
      return loaders.nodeSynced();
    },
    totalFunds: function totalFunds(_, __, _ref5) {
      var loaders = _ref5.loaders;
      return loaders.fundRanking().then(ramda__WEBPACK_IMPORTED_MODULE_3__["prop"]('length'));
    },
    priceFeedUp: function priceFeedUp(_, __, _ref6) {
      var loaders = _ref6.loaders;
      return loaders.priceFeedUp();
    },
    peerCount: function peerCount(_, __, _ref7) {
      var loaders = _ref7.loaders;
      return loaders.peerCount();
    },
    contractDeployment: function contractDeployment(_, __, _ref8) {
      var loaders = _ref8.loaders;
      return loaders.versionDeployment();
    },
    network: function network(_, __, _ref9) {
      var loaders = _ref9.loaders;
      return loaders.networkName();
    },
    rankings: function rankings(_, __, _ref10) {
      var loaders = _ref10.loaders;
      return loaders.fundRanking();
    },
    orders: function orders(_, _ref11, _ref12) {
      var exchange = _ref11.exchange,
          base = _ref11.base,
          quote = _ref11.quote;
      var loaders = _ref12.loaders;
      return loaders.exchangeOrders.load({
        exchange: exchange,
        base: base,
        quote: quote
      });
    },
    fund: function fund(_, _ref13, _ref14) {
      var address = _ref13.address;
      var loaders = _ref14.loaders;
      return _melonproject_token_math__WEBPACK_IMPORTED_MODULE_6__["isAddress"](address) && loaders.fundReady.load(address).then(ramda__WEBPACK_IMPORTED_MODULE_3__["cond"]([[ramda__WEBPACK_IMPORTED_MODULE_3__["equals"](true), ramda__WEBPACK_IMPORTED_MODULE_3__["always"](address)], [ramda__WEBPACK_IMPORTED_MODULE_3__["equals"](false), ramda__WEBPACK_IMPORTED_MODULE_3__["always"](null)]])) || null;
    },
    fundByName: function fundByName(_, _ref15, _ref16) {
      var name = _ref15.name;
      var loaders = _ref16.loaders;
      return loaders.fundByName.load(name);
    },
    associatedFund: function associatedFund(_, _ref17, _ref18) {
      var manager = _ref17.manager;
      var loaders = _ref18.loaders;
      return loaders.fundAddressFromManager.load(manager);
    },
    balance: function balance(_, _ref19, _ref20) {
      var address = _ref19.address,
          symbol = _ref19.symbol;
      var loaders = _ref20.loaders;
      return loaders.symbolBalance.load({
        address: address,
        symbol: symbol
      });
    },
    routes: function routes(_, _ref21, _ref22) {
      var manager = _ref21.manager;
      var loaders = _ref22.loaders;
      return loaders.routes.load(manager);
    }
  },
  Ranking: {
    id: function id(parent) {
      return Buffer.from(parent.address).toString('base64');
    },
    fund: function fund(parent) {
      return parent.address;
    },
    inception: function inception(parent) {
      return parent.creationTime;
    }
  },
  Fund: {
    id: function id(parent) {
      return Buffer.from(parent).toString('base64');
    },
    address: function address(parent) {
      return parent;
    },
    isComplete: function isComplete(parent, _, _ref23) {
      var loaders = _ref23.loaders;
      return loaders.fundIsComplete.load(parent);
    },
    name: function name(parent, _, _ref24) {
      var loaders = _ref24.loaders;
      return loaders.fundName.load(parent);
    },
    isShutdown: function isShutdown(parent, _, _ref25) {
      var loaders = _ref25.loaders;
      return loaders.fundIsShutdown.load(parent);
    },
    owner: function owner(parent, _, _ref26) {
      var loaders = _ref26.loaders;
      return loaders.fundOwner.load(parent);
    },
    routes: function routes(parent, _, _ref27) {
      var loaders = _ref27.loaders;
      return loaders.fundRoutes.load(parent);
    },
    denominationAsset: function denominationAsset(parent, _, _ref28) {
      var loaders = _ref28.loaders;
      return loaders.fundDenominationAsset.load(parent);
    },
    nativeAsset: function nativeAsset(parent, _, _ref29) {
      var loaders = _ref29.loaders;
      return loaders.fundNativeAsset.load(parent);
    },
    totalSupply: function totalSupply(parent, _, _ref30) {
      var loaders = _ref30.loaders;
      return loaders.fundTotalSupply.load(parent);
    },
    rank: function rank(parent, _, _ref31) {
      var loaders = _ref31.loaders;
      return loaders.fundRank.load(parent);
    },
    inception: function inception(parent, _, _ref32) {
      var loaders = _ref32.loaders;
      return loaders.fundInception.load(parent);
    },
    personalStake: function personalStake(parent, _ref33, _ref34) {
      var investor = _ref33.investor;
      var loaders = _ref34.loaders;
      return loaders.fundParticipation.load({
        fund: parent,
        investor: investor
      });
    },
    gav: function gav(parent, _, _ref35) {
      var loaders = _ref35.loaders;
      return loaders.fundCalculations.load(parent).then(ramda__WEBPACK_IMPORTED_MODULE_3__["prop"]('gav'));
    },
    nav: function nav(parent, _, _ref36) {
      var loaders = _ref36.loaders;
      return loaders.fundCalculations.load(parent).then(ramda__WEBPACK_IMPORTED_MODULE_3__["prop"]('nav'));
    },
    sharePrice: function sharePrice(parent, _, _ref37) {
      var loaders = _ref37.loaders;
      return loaders.fundCalculations.load(parent).then(ramda__WEBPACK_IMPORTED_MODULE_3__["prop"]('sharePrice'));
    },
    managementReward: function () {
      var _managementReward = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(parent, _, _ref38) {
        var loaders;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                loaders = _ref38.loaders;
                return _context2.abrupt("return", null);

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function managementReward(_x, _x2, _x3) {
        return _managementReward.apply(this, arguments);
      }

      return managementReward;
    }(),
    managementFeeRate: function () {
      var _managementFeeRate = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3(parent, _, _ref39) {
        var loaders;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                loaders = _ref39.loaders;
                return _context3.abrupt("return", null);

              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function managementFeeRate(_x4, _x5, _x6) {
        return _managementFeeRate.apply(this, arguments);
      }

      return managementFeeRate;
    }(),
    performanceReward: function () {
      var _performanceReward = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee4(parent, _, _ref40) {
        var loaders;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                loaders = _ref40.loaders;
                return _context4.abrupt("return", null);

              case 2:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function performanceReward(_x7, _x8, _x9) {
        return _performanceReward.apply(this, arguments);
      }

      return performanceReward;
    }(),
    performanceFeeRate: function () {
      var _performanceFeeRate = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee5(parent, _, _ref41) {
        var loaders;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                loaders = _ref41.loaders;
                return _context5.abrupt("return", null);

              case 2:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function performanceFeeRate(_x10, _x11, _x12) {
        return _performanceFeeRate.apply(this, arguments);
      }

      return performanceFeeRate;
    }(),
    unclaimedFees: function () {
      var _unclaimedFees = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee6(parent, _, _ref42) {
        var loaders;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                loaders = _ref42.loaders;
                return _context6.abrupt("return", null);

              case 2:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function unclaimedFees(_x13, _x14, _x15) {
        return _unclaimedFees.apply(this, arguments);
      }

      return unclaimedFees;
    }(),
    feesShareQuantity: function () {
      var _feesShareQuantity = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee7(parent, _, _ref43) {
        var loaders;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                loaders = _ref43.loaders;
                return _context7.abrupt("return", null);

              case 2:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function feesShareQuantity(_x16, _x17, _x18) {
        return _feesShareQuantity.apply(this, arguments);
      }

      return feesShareQuantity;
    }(),
    holdings: function () {
      var _holdings = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee8(parent, _, _ref44) {
        var loaders;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                loaders = _ref44.loaders;
                return _context8.abrupt("return", loaders.fundHoldings.load(parent));

              case 2:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function holdings(_x19, _x20, _x21) {
        return _holdings.apply(this, arguments);
      }

      return holdings;
    }()
  },
  Order: {
    __resolveType: function __resolveType(object) {
      switch (object.exchange) {
        case 'RADAR_RELAY':
          return 'ZeroExOrder';

        case 'OASIS_DEX':
          return 'OasisDexOrder';

        case 'KYBER_NETWORK':
          return 'KyberNetworkOrder';

        case 'ETHFINEX':
          return 'EthfinexOrder';

        default:
          throw new Error('Invalid order type.');
      }
    },
    price: function price(parent) {
      return _melonproject_token_math__WEBPACK_IMPORTED_MODULE_6__["toFixed"](parent.trade);
    },
    volume: function volume(parent) {
      return _melonproject_token_math__WEBPACK_IMPORTED_MODULE_6__["toFixed"](parent.trade.base);
    }
  },
  ZeroExOrder: {
    metadata: function metadata(parent) {
      return parent.original.signedOrder;
    }
  },
  OasisDexOrder: {
    metadata: function metadata(parent) {
      return parent.original;
    }
  },
  Holding: {
    fraction: function () {
      var _fraction = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee9(parent, _, _ref45) {
        var loaders;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                loaders = _ref45.loaders;
                return _context9.abrupt("return", 0);

              case 2:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function fraction(_x22, _x23, _x24) {
        return _fraction.apply(this, arguments);
      }

      return fraction;
    }(),
    balance: function balance(parent) {
      return parent;
    },
    price: function () {
      var _price = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee10(parent, _, _ref46) {
        var loaders;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                loaders = _ref46.loaders;
                return _context10.abrupt("return", loaders.assetPrice.load(parent.token));

              case 2:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function price(_x25, _x26, _x27) {
        return _price.apply(this, arguments);
      }

      return price;
    }()
  },
  Mutation: {
    estimateFundSetupBegin: function () {
      var _estimateFundSetupBegin = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee11(_, _ref47, _ref48) {
        var from, name, exchanges, managementFee, performanceFee, environment, loaders, quoteToken, _environment$deployme, exchangeConfigs, _environment$deployme2, priceSource, version, tokens, selectedExchanges, nativeToken, mlnToken, fees, params, env, result;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                from = _ref47.from, name = _ref47.name, exchanges = _ref47.exchanges, managementFee = _ref47.managementFee, performanceFee = _ref47.performanceFee;
                environment = _ref48.environment, loaders = _ref48.loaders;
                _context11.next = 4;
                return loaders.quoteToken();

              case 4:
                quoteToken = _context11.sent;
                _environment$deployme = environment.deployment, exchangeConfigs = _environment$deployme.exchangeConfigs, _environment$deployme2 = _environment$deployme.melonContracts, priceSource = _environment$deployme2.priceSource, version = _environment$deployme2.version, tokens = _environment$deployme.thirdPartyContracts.tokens;
                selectedExchanges = _objectSpread({}, exchanges.includes('ZERO_EX_EXCHANGE') && {
                  ZeroEx: exchangeConfigs.ZeroEx
                }, exchanges.includes('MATCHING_MARKET') && {
                  MatchingMarket: exchangeConfigs.MatchingMarket
                }, exchanges.includes('KYBER_NETWORK') && {
                  KyberNetwork: exchangeConfigs.KyberNetwork
                }, exchanges.includes('ETHFINEX') && {
                  Ethfinex: exchangeConfigs.Ethfinex
                });
                nativeToken = tokens.find(function (token) {
                  return token.symbol === 'WETH';
                });
                mlnToken = tokens.find(function (token) {
                  return token.symbol === 'MLN';
                });
                fees = [{
                  feeAddress: environment.deployment.melonContracts.fees.managementFee.toLowerCase(),
                  feePeriod: new _melonproject_token_math__WEBPACK_IMPORTED_MODULE_6__["BigInteger"](0),
                  feeRate: new _melonproject_token_math__WEBPACK_IMPORTED_MODULE_6__["BigInteger"](_melonproject_token_math__WEBPACK_IMPORTED_MODULE_6__["multiply"](new _melonproject_token_math__WEBPACK_IMPORTED_MODULE_6__["BigInteger"](managementFee), _melonproject_token_math__WEBPACK_IMPORTED_MODULE_6__["power"](new _melonproject_token_math__WEBPACK_IMPORTED_MODULE_6__["BigInteger"](10), new _melonproject_token_math__WEBPACK_IMPORTED_MODULE_6__["BigInteger"](16))))
                }, {
                  feeAddress: environment.deployment.melonContracts.fees.performanceFee.toLowerCase(),
                  feePeriod: new _melonproject_token_math__WEBPACK_IMPORTED_MODULE_6__["BigInteger"](86400 * 90),
                  feeRate: new _melonproject_token_math__WEBPACK_IMPORTED_MODULE_6__["BigInteger"](_melonproject_token_math__WEBPACK_IMPORTED_MODULE_6__["multiply"](new _melonproject_token_math__WEBPACK_IMPORTED_MODULE_6__["BigInteger"](performanceFee), _melonproject_token_math__WEBPACK_IMPORTED_MODULE_6__["power"](new _melonproject_token_math__WEBPACK_IMPORTED_MODULE_6__["BigInteger"](10), new _melonproject_token_math__WEBPACK_IMPORTED_MODULE_6__["BigInteger"](16))))
                }]; // TODO: Properly handle provided exchanges, tokens, etc.

                params = {
                  fees: fees,
                  defaultTokens: [quoteToken, mlnToken],
                  exchangeConfigs: selectedExchanges,
                  fundName: name,
                  priceSource: priceSource,
                  quoteToken: quoteToken,
                  nativeToken: nativeToken
                }; // TODO: The environment should not hold account data. Maybe?

                env = Object(_melonproject_protocol__WEBPACK_IMPORTED_MODULE_5__["withDifferentAccount"])(environment, new _melonproject_token_math__WEBPACK_IMPORTED_MODULE_6__["Address"](from));
                _context11.next = 14;
                return _melonproject_protocol__WEBPACK_IMPORTED_MODULE_5__["beginSetup"].prepare(env, version, params);

              case 14:
                result = _context11.sent;
                return _context11.abrupt("return", result && result.rawTransaction);

              case 16:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function estimateFundSetupBegin(_x28, _x29, _x30) {
        return _estimateFundSetupBegin.apply(this, arguments);
      }

      return estimateFundSetupBegin;
    }(),
    executeFundSetupBegin: function executeFundSetupBegin(_, _ref49, _ref50) {
      var from = _ref49.from,
          signed = _ref49.signed;
      var environment = _ref50.environment;
      var transaction = signed.rawTransaction;
      var version = environment.deployment.melonContracts.version;
      var env = Object(_melonproject_protocol__WEBPACK_IMPORTED_MODULE_5__["withDifferentAccount"])(environment, new _melonproject_token_math__WEBPACK_IMPORTED_MODULE_6__["Address"](from));
      return _melonproject_protocol__WEBPACK_IMPORTED_MODULE_5__["beginSetup"].send(env, version, transaction);
    },
    estimateFundSetupStep: function () {
      var _estimateFundSetupStep = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee12(_, _ref51, _ref52) {
        var step, from, environment, version, fn, env, result;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                step = _ref51.step, from = _ref51.from;
                environment = _ref52.environment;
                version = environment.deployment.melonContracts.version;
                fn = {
                  CREATE_ACCOUNTING: _melonproject_protocol__WEBPACK_IMPORTED_MODULE_5__["createAccounting"],
                  CREATE_FEE_MANAGER: _melonproject_protocol__WEBPACK_IMPORTED_MODULE_5__["createFeeManager"],
                  CREATE_PARTICIPATION: _melonproject_protocol__WEBPACK_IMPORTED_MODULE_5__["createParticipation"],
                  CREATE_POLICY_MANAGER: _melonproject_protocol__WEBPACK_IMPORTED_MODULE_5__["createPolicyManager"],
                  CREATE_SHARES: _melonproject_protocol__WEBPACK_IMPORTED_MODULE_5__["createShares"],
                  CREATE_TRADING: _melonproject_protocol__WEBPACK_IMPORTED_MODULE_5__["createTrading"],
                  CREATE_VAULT: _melonproject_protocol__WEBPACK_IMPORTED_MODULE_5__["createVault"]
                }[step];
                env = Object(_melonproject_protocol__WEBPACK_IMPORTED_MODULE_5__["withDifferentAccount"])(environment, new _melonproject_token_math__WEBPACK_IMPORTED_MODULE_6__["Address"](from));
                _context12.next = 7;
                return fn.prepare(env, version);

              case 7:
                result = _context12.sent;
                return _context12.abrupt("return", result && result.rawTransaction);

              case 9:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      function estimateFundSetupStep(_x31, _x32, _x33) {
        return _estimateFundSetupStep.apply(this, arguments);
      }

      return estimateFundSetupStep;
    }(),
    executeFundSetupStep: function () {
      var _executeFundSetupStep = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee13(_, _ref53, _ref54) {
        var step, from, signed, environment, version, transaction, fn, env, result;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                step = _ref53.step, from = _ref53.from, signed = _ref53.signed;
                environment = _ref54.environment;
                version = environment.deployment.melonContracts.version;
                transaction = signed.rawTransaction;
                fn = {
                  // TODO: Change
                  CREATE_ACCOUNTING: _melonproject_protocol__WEBPACK_IMPORTED_MODULE_5__["createAccounting"],
                  CREATE_FEE_MANAGER: _melonproject_protocol__WEBPACK_IMPORTED_MODULE_5__["createFeeManager"],
                  CREATE_PARTICIPATION: _melonproject_protocol__WEBPACK_IMPORTED_MODULE_5__["createParticipation"],
                  CREATE_POLICY_MANAGER: _melonproject_protocol__WEBPACK_IMPORTED_MODULE_5__["createPolicyManager"],
                  CREATE_SHARES: _melonproject_protocol__WEBPACK_IMPORTED_MODULE_5__["createShares"],
                  CREATE_TRADING: _melonproject_protocol__WEBPACK_IMPORTED_MODULE_5__["createTrading"],
                  CREATE_VAULT: _melonproject_protocol__WEBPACK_IMPORTED_MODULE_5__["createVault"]
                }[step];
                env = Object(_melonproject_protocol__WEBPACK_IMPORTED_MODULE_5__["withDifferentAccount"])(environment, new _melonproject_token_math__WEBPACK_IMPORTED_MODULE_6__["Address"](from));
                _context13.next = 8;
                return fn.send(env, version, transaction);

              case 8:
                result = _context13.sent;
                return _context13.abrupt("return", !!result);

              case 10:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));

      function executeFundSetupStep(_x34, _x35, _x36) {
        return _executeFundSetupStep.apply(this, arguments);
      }

      return executeFundSetupStep;
    }(),
    estimateFundSetupComplete: function () {
      var _estimateFundSetupComplete = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee14(_, _ref55, _ref56) {
        var from, environment, version, env, result;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                from = _ref55.from;
                environment = _ref56.environment;
                version = environment.deployment.melonContracts.version;
                env = Object(_melonproject_protocol__WEBPACK_IMPORTED_MODULE_5__["withDifferentAccount"])(environment, new _melonproject_token_math__WEBPACK_IMPORTED_MODULE_6__["Address"](from));
                _context14.next = 6;
                return _melonproject_protocol__WEBPACK_IMPORTED_MODULE_5__["completeSetup"].prepare(env, version);

              case 6:
                result = _context14.sent;
                return _context14.abrupt("return", result && result.rawTransaction);

              case 8:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, this);
      }));

      function estimateFundSetupComplete(_x37, _x38, _x39) {
        return _estimateFundSetupComplete.apply(this, arguments);
      }

      return estimateFundSetupComplete;
    }(),
    executeFundSetupComplete: function () {
      var _executeFundSetupComplete = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee15(_, _ref57, _ref58) {
        var from, signed, environment, version, transaction, env;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                from = _ref57.from, signed = _ref57.signed;
                environment = _ref58.environment;
                version = environment.deployment.melonContracts.version;
                transaction = signed.rawTransaction;
                env = Object(_melonproject_protocol__WEBPACK_IMPORTED_MODULE_5__["withDifferentAccount"])(environment, new _melonproject_token_math__WEBPACK_IMPORTED_MODULE_6__["Address"](from));
                return _context15.abrupt("return", _melonproject_protocol__WEBPACK_IMPORTED_MODULE_5__["completeSetup"].send(env, version, transaction));

              case 6:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, this);
      }));

      function executeFundSetupComplete(_x40, _x41, _x42) {
        return _executeFundSetupComplete.apply(this, arguments);
      }

      return executeFundSetupComplete;
    }(),
    estimateRequestInvestment: function () {
      var _estimateRequestInvestment = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee16(_, _ref59, _ref60) {
        var from, fundAddress, investmentAmount, environment, loaders, tokens, _ref61, participationAddress, nativeToken, params, env, result;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                from = _ref59.from, fundAddress = _ref59.fundAddress, investmentAmount = _ref59.investmentAmount;
                environment = _ref60.environment, loaders = _ref60.loaders;
                tokens = environment.deployment.thirdPartyContracts.tokens;
                _context16.next = 5;
                return loaders.fundRoutes.load(fundAddress);

              case 5:
                _ref61 = _context16.sent;
                participationAddress = _ref61.participationAddress;
                nativeToken = tokens.find(function (token) {
                  return token.symbol === 'WETH';
                });
                params = {
                  investmentAmount: _melonproject_token_math__WEBPACK_IMPORTED_MODULE_6__["createQuantity"](nativeToken, investmentAmount)
                };
                env = Object(_melonproject_protocol__WEBPACK_IMPORTED_MODULE_5__["withDifferentAccount"])(environment, new _melonproject_token_math__WEBPACK_IMPORTED_MODULE_6__["Address"](from));
                _context16.next = 12;
                return _melonproject_protocol__WEBPACK_IMPORTED_MODULE_5__["requestInvestment"].prepare(env, participationAddress, params);

              case 12:
                result = _context16.sent;
                return _context16.abrupt("return", result && result.rawTransaction);

              case 14:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16, this);
      }));

      function estimateRequestInvestment(_x43, _x44, _x45) {
        return _estimateRequestInvestment.apply(this, arguments);
      }

      return estimateRequestInvestment;
    }(),
    executeRequestInvestment: function () {
      var _executeRequestInvestment = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee17(_, _ref62, _ref63) {
        var from, signed, fundAddress, environment, loaders, _ref64, participationAddress, transaction, env, result;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                from = _ref62.from, signed = _ref62.signed, fundAddress = _ref62.fundAddress;
                environment = _ref63.environment, loaders = _ref63.loaders;
                _context17.next = 4;
                return loaders.fundRoutes.load(fundAddress);

              case 4:
                _ref64 = _context17.sent;
                participationAddress = _ref64.participationAddress;
                transaction = signed.rawTransaction;
                env = Object(_melonproject_protocol__WEBPACK_IMPORTED_MODULE_5__["withDifferentAccount"])(environment, new _melonproject_token_math__WEBPACK_IMPORTED_MODULE_6__["Address"](from));
                _context17.next = 10;
                return _melonproject_protocol__WEBPACK_IMPORTED_MODULE_5__["requestInvestment"].send(env, participationAddress, transaction);

              case 10:
                result = _context17.sent;
                return _context17.abrupt("return", !!result);

              case 12:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee17, this);
      }));

      function executeRequestInvestment(_x46, _x47, _x48) {
        return _executeRequestInvestment.apply(this, arguments);
      }

      return executeRequestInvestment;
    }(),
    estimateApproveTransfer: function () {
      var _estimateApproveTransfer = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee18(_, _ref65, _ref66) {
        var from, fundAddress, investmentAmount, environment, loaders, _ref67, participationAddress, quoteToken, params, env, result;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                from = _ref65.from, fundAddress = _ref65.fundAddress, investmentAmount = _ref65.investmentAmount;
                environment = _ref66.environment, loaders = _ref66.loaders;
                _context18.next = 4;
                return loaders.fundRoutes.load(fundAddress);

              case 4:
                _ref67 = _context18.sent;
                participationAddress = _ref67.participationAddress;
                _context18.next = 8;
                return loaders.quoteToken();

              case 8:
                quoteToken = _context18.sent;
                params = {
                  howMuch: _melonproject_token_math__WEBPACK_IMPORTED_MODULE_6__["createQuantity"](quoteToken, investmentAmount),
                  spender: participationAddress
                };
                env = Object(_melonproject_protocol__WEBPACK_IMPORTED_MODULE_5__["withDifferentAccount"])(environment, new _melonproject_token_math__WEBPACK_IMPORTED_MODULE_6__["Address"](from));
                _context18.next = 13;
                return _melonproject_protocol__WEBPACK_IMPORTED_MODULE_5__["approve"].prepare(env, params);

              case 13:
                result = _context18.sent;
                return _context18.abrupt("return", result && result.rawTransaction);

              case 15:
              case "end":
                return _context18.stop();
            }
          }
        }, _callee18, this);
      }));

      function estimateApproveTransfer(_x49, _x50, _x51) {
        return _estimateApproveTransfer.apply(this, arguments);
      }

      return estimateApproveTransfer;
    }(),
    executeApproveTransfer: function () {
      var _executeApproveTransfer = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee19(_, _ref68, _ref69) {
        var from, signed, fundAddress, investmentAmount, environment, loaders, _ref70, participationAddress, quoteToken, transaction, env, params, result;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee19$(_context19) {
          while (1) {
            switch (_context19.prev = _context19.next) {
              case 0:
                from = _ref68.from, signed = _ref68.signed, fundAddress = _ref68.fundAddress, investmentAmount = _ref68.investmentAmount;
                environment = _ref69.environment, loaders = _ref69.loaders;
                _context19.next = 4;
                return loaders.fundRoutes.load(fundAddress);

              case 4:
                _ref70 = _context19.sent;
                participationAddress = _ref70.participationAddress;
                _context19.next = 8;
                return loaders.quoteToken();

              case 8:
                quoteToken = _context19.sent;
                transaction = signed.rawTransaction;
                env = Object(_melonproject_protocol__WEBPACK_IMPORTED_MODULE_5__["withDifferentAccount"])(environment, new _melonproject_token_math__WEBPACK_IMPORTED_MODULE_6__["Address"](from));
                params = {
                  howMuch: _melonproject_token_math__WEBPACK_IMPORTED_MODULE_6__["createQuantity"](quoteToken, investmentAmount),
                  spender: participationAddress
                };
                _context19.next = 14;
                return _melonproject_protocol__WEBPACK_IMPORTED_MODULE_5__["approve"].send(env, transaction, params);

              case 14:
                result = _context19.sent;
                return _context19.abrupt("return", !!result);

              case 16:
              case "end":
                return _context19.stop();
            }
          }
        }, _callee19, this);
      }));

      function executeApproveTransfer(_x52, _x53, _x54) {
        return _executeApproveTransfer.apply(this, arguments);
      }

      return executeApproveTransfer;
    }(),
    estimateExecuteRequest: function () {
      var _estimateExecuteRequest = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee20(_, _ref71, _ref72) {
        var from, fundAddress, environment, loaders, _ref73, participationAddress, env, result;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee20$(_context20) {
          while (1) {
            switch (_context20.prev = _context20.next) {
              case 0:
                from = _ref71.from, fundAddress = _ref71.fundAddress;
                environment = _ref72.environment, loaders = _ref72.loaders;
                _context20.next = 4;
                return loaders.fundRoutes.load(fundAddress);

              case 4:
                _ref73 = _context20.sent;
                participationAddress = _ref73.participationAddress;
                env = Object(_melonproject_protocol__WEBPACK_IMPORTED_MODULE_5__["withDifferentAccount"])(environment, new _melonproject_token_math__WEBPACK_IMPORTED_MODULE_6__["Address"](from));
                _context20.next = 9;
                return _melonproject_protocol__WEBPACK_IMPORTED_MODULE_5__["executeRequest"].prepare(env, participationAddress);

              case 9:
                result = _context20.sent;
                return _context20.abrupt("return", result && result.rawTransaction);

              case 11:
              case "end":
                return _context20.stop();
            }
          }
        }, _callee20, this);
      }));

      function estimateExecuteRequest(_x55, _x56, _x57) {
        return _estimateExecuteRequest.apply(this, arguments);
      }

      return estimateExecuteRequest;
    }(),
    executeExecuteRequest: function () {
      var _executeExecuteRequest = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee21(_, _ref74, _ref75) {
        var from, signed, fundAddress, environment, loaders, _ref76, participationAddress, transaction, env, result;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee21$(_context21) {
          while (1) {
            switch (_context21.prev = _context21.next) {
              case 0:
                from = _ref74.from, signed = _ref74.signed, fundAddress = _ref74.fundAddress;
                environment = _ref75.environment, loaders = _ref75.loaders;
                _context21.next = 4;
                return loaders.fundRoutes.load(fundAddress);

              case 4:
                _ref76 = _context21.sent;
                participationAddress = _ref76.participationAddress;
                transaction = signed.rawTransaction;
                env = Object(_melonproject_protocol__WEBPACK_IMPORTED_MODULE_5__["withDifferentAccount"])(environment, new _melonproject_token_math__WEBPACK_IMPORTED_MODULE_6__["Address"](from));
                _context21.next = 10;
                return _melonproject_protocol__WEBPACK_IMPORTED_MODULE_5__["executeRequest"].send(env, participationAddress, transaction);

              case 10:
                result = _context21.sent;
                return _context21.abrupt("return", !!result);

              case 12:
              case "end":
                return _context21.stop();
            }
          }
        }, _callee21, this);
      }));

      function executeExecuteRequest(_x58, _x59, _x60) {
        return _executeExecuteRequest.apply(this, arguments);
      }

      return executeExecuteRequest;
    }(),
    estimateShutDownFund: function () {
      var _estimateShutDownFund = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee22(_, _ref77, _ref78) {
        var from, fundAddress, environment, params, env, result;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee22$(_context22) {
          while (1) {
            switch (_context22.prev = _context22.next) {
              case 0:
                from = _ref77.from, fundAddress = _ref77.fundAddress;
                environment = _ref78.environment;
                params = {
                  hub: fundAddress
                };
                env = Object(_melonproject_protocol__WEBPACK_IMPORTED_MODULE_5__["withDifferentAccount"])(environment, new _melonproject_token_math__WEBPACK_IMPORTED_MODULE_6__["Address"](from));
                _context22.next = 6;
                return _melonproject_protocol__WEBPACK_IMPORTED_MODULE_5__["shutDownFund"].prepare(env, environment.deployment.melonContracts.version, params);

              case 6:
                result = _context22.sent;
                return _context22.abrupt("return", result && result.rawTransaction);

              case 8:
              case "end":
                return _context22.stop();
            }
          }
        }, _callee22, this);
      }));

      function estimateShutDownFund(_x61, _x62, _x63) {
        return _estimateShutDownFund.apply(this, arguments);
      }

      return estimateShutDownFund;
    }(),
    executeShutDownFund: function () {
      var _executeShutDownFund = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee23(_, _ref79, _ref80) {
        var from, signed, fundAddress, environment, version, transaction, params, env, result;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee23$(_context23) {
          while (1) {
            switch (_context23.prev = _context23.next) {
              case 0:
                from = _ref79.from, signed = _ref79.signed, fundAddress = _ref79.fundAddress;
                environment = _ref80.environment;
                version = environment.deployment.melonContracts.version;
                transaction = signed.rawTransaction;
                params = {
                  hub: fundAddress
                };
                env = Object(_melonproject_protocol__WEBPACK_IMPORTED_MODULE_5__["withDifferentAccount"])(environment, new _melonproject_token_math__WEBPACK_IMPORTED_MODULE_6__["Address"](from));
                _context23.next = 8;
                return _melonproject_protocol__WEBPACK_IMPORTED_MODULE_5__["shutDownFund"].send(env, version, transaction, params);

              case 8:
                result = _context23.sent;
                return _context23.abrupt("return", !!result);

              case 10:
              case "end":
                return _context23.stop();
            }
          }
        }, _callee23, this);
      }));

      function executeShutDownFund(_x64, _x65, _x66) {
        return _executeShutDownFund.apply(this, arguments);
      }

      return executeShutDownFund;
    }(),
    estimateTriggerRewardAllFees: function () {
      var _estimateTriggerRewardAllFees = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee24(_, _ref81, _ref82) {
        var from, fundAddress, environment, loaders, _ref83, feeManagerAddress, env, result;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee24$(_context24) {
          while (1) {
            switch (_context24.prev = _context24.next) {
              case 0:
                from = _ref81.from, fundAddress = _ref81.fundAddress;
                environment = _ref82.environment, loaders = _ref82.loaders;
                _context24.next = 4;
                return loaders.fundRoutes.load(fundAddress);

              case 4:
                _ref83 = _context24.sent;
                feeManagerAddress = _ref83.feeManagerAddress;
                env = Object(_melonproject_protocol__WEBPACK_IMPORTED_MODULE_5__["withDifferentAccount"])(environment, new _melonproject_token_math__WEBPACK_IMPORTED_MODULE_6__["Address"](from));
                _context24.next = 9;
                return _melonproject_protocol__WEBPACK_IMPORTED_MODULE_5__["triggerRewardAllFees"].prepare(env, feeManagerAddress);

              case 9:
                result = _context24.sent;
                return _context24.abrupt("return", result && result.rawTransaction);

              case 11:
              case "end":
                return _context24.stop();
            }
          }
        }, _callee24, this);
      }));

      function estimateTriggerRewardAllFees(_x67, _x68, _x69) {
        return _estimateTriggerRewardAllFees.apply(this, arguments);
      }

      return estimateTriggerRewardAllFees;
    }(),
    executeTriggerRewardAllFees: function () {
      var _executeTriggerRewardAllFees = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee25(_, _ref84, _ref85) {
        var from, signed, fundAddress, environment, loaders, _ref86, feeManagerAddress, transaction, env, result;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee25$(_context25) {
          while (1) {
            switch (_context25.prev = _context25.next) {
              case 0:
                from = _ref84.from, signed = _ref84.signed, fundAddress = _ref84.fundAddress;
                environment = _ref85.environment, loaders = _ref85.loaders;
                _context25.next = 4;
                return loaders.fundRoutes.load(fundAddress);

              case 4:
                _ref86 = _context25.sent;
                feeManagerAddress = _ref86.feeManagerAddress;
                transaction = signed.rawTransaction;
                env = Object(_melonproject_protocol__WEBPACK_IMPORTED_MODULE_5__["withDifferentAccount"])(environment, new _melonproject_token_math__WEBPACK_IMPORTED_MODULE_6__["Address"](from));
                _context25.next = 10;
                return _melonproject_protocol__WEBPACK_IMPORTED_MODULE_5__["triggerRewardAllFees"].send(env, feeManagerAddress, transaction);

              case 10:
                result = _context25.sent;
                return _context25.abrupt("return", !!result);

              case 12:
              case "end":
                return _context25.stop();
            }
          }
        }, _callee25, this);
      }));

      function executeTriggerRewardAllFees(_x70, _x71, _x72) {
        return _executeTriggerRewardAllFees.apply(this, arguments);
      }

      return executeTriggerRewardAllFees;
    }(),
    estimateMakeOrder: function () {
      var _estimateMakeOrder = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee26(_, _ref87, _ref88) {
        var from, exchange, buyToken, buyQuantity, sellToken, sellQuantity, environment, loaders, fund, _ref89, tradingAddress, env, makerQuantity, takerQuantity, result;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee26$(_context26) {
          while (1) {
            switch (_context26.prev = _context26.next) {
              case 0:
                from = _ref87.from, exchange = _ref87.exchange, buyToken = _ref87.buyToken, buyQuantity = _ref87.buyQuantity, sellToken = _ref87.sellToken, sellQuantity = _ref87.sellQuantity;
                environment = _ref88.environment, loaders = _ref88.loaders;
                _context26.next = 4;
                return loaders.fundAddressFromManager.load(from);

              case 4:
                fund = _context26.sent;
                _context26.next = 7;
                return loaders.fundRoutes.load(fund);

              case 7:
                _ref89 = _context26.sent;
                tradingAddress = _ref89.tradingAddress;
                env = Object(_melonproject_protocol__WEBPACK_IMPORTED_MODULE_5__["withDifferentAccount"])(environment, new _melonproject_token_math__WEBPACK_IMPORTED_MODULE_6__["Address"](from));

                if (!(exchange === 'OASIS_DEX')) {
                  _context26.next = 17;
                  break;
                }

                makerQuantity = _melonproject_token_math__WEBPACK_IMPORTED_MODULE_6__["createQuantity"](Object(_melonproject_protocol__WEBPACK_IMPORTED_MODULE_5__["getTokenBySymbol"])(environment, sellToken), sellQuantity);
                takerQuantity = _melonproject_token_math__WEBPACK_IMPORTED_MODULE_6__["createQuantity"](Object(_melonproject_protocol__WEBPACK_IMPORTED_MODULE_5__["getTokenBySymbol"])(environment, buyToken), buyQuantity);
                _context26.next = 15;
                return _melonproject_protocol__WEBPACK_IMPORTED_MODULE_5__["makeOasisDexOrder"].prepare(env, tradingAddress, {
                  makerQuantity: makerQuantity,
                  takerQuantity: takerQuantity
                });

              case 15:
                result = _context26.sent;
                return _context26.abrupt("return", result && result.rawTransaction);

              case 17:
                throw new Error("Make order not implemented for ".concat(exchange));

              case 18:
              case "end":
                return _context26.stop();
            }
          }
        }, _callee26, this);
      }));

      function estimateMakeOrder(_x73, _x74, _x75) {
        return _estimateMakeOrder.apply(this, arguments);
      }

      return estimateMakeOrder;
    }(),
    executeMakeOrder: function () {
      var _executeMakeOrder = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee27(_, _ref90, _ref91) {
        var from, signed, exchange, environment, loaders, fund, _ref92, tradingAddress, accountingAddress, env, denominationAsset, result, type, trade, volume, order;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee27$(_context27) {
          while (1) {
            switch (_context27.prev = _context27.next) {
              case 0:
                from = _ref90.from, signed = _ref90.signed, exchange = _ref90.exchange;
                environment = _ref91.environment, loaders = _ref91.loaders;
                _context27.next = 4;
                return loaders.fundAddressFromManager.load(from);

              case 4:
                fund = _context27.sent;
                _context27.next = 7;
                return loaders.fundRoutes.load(fund);

              case 7:
                _ref92 = _context27.sent;
                tradingAddress = _ref92.tradingAddress;
                accountingAddress = _ref92.accountingAddress;
                env = Object(_melonproject_protocol__WEBPACK_IMPORTED_MODULE_5__["withDifferentAccount"])(environment, new _melonproject_token_math__WEBPACK_IMPORTED_MODULE_6__["Address"](from));
                _context27.next = 13;
                return loaders.fundDenominationAsset.load(accountingAddress);

              case 13:
                denominationAsset = _context27.sent;

                if (!(exchange === 'OASIS_DEX')) {
                  _context27.next = 23;
                  break;
                }

                _context27.next = 17;
                return _melonproject_protocol__WEBPACK_IMPORTED_MODULE_5__["makeOasisDexOrder"].send(env, tradingAddress, signed.rawTransaction);

              case 17:
                result = _context27.sent;
                type = _melonproject_token_math__WEBPACK_IMPORTED_MODULE_6__["isEqual"](denominationAsset, result.sell.token) ? 'BID' : 'ASK';
                trade = type === 'BID' ? _melonproject_token_math__WEBPACK_IMPORTED_MODULE_6__["createPrice"](result.buy, result.sell) : _melonproject_token_math__WEBPACK_IMPORTED_MODULE_6__["createPrice"](result.sell, result.buy);
                volume = _melonproject_token_math__WEBPACK_IMPORTED_MODULE_6__["toFixed"](trade.quote);
                order = {
                  id: result.id,
                  type: type,
                  trade: trade,
                  price: _melonproject_token_math__WEBPACK_IMPORTED_MODULE_6__["toFixed"](trade),
                  volume: volume,
                  exchange: exchange
                };
                return _context27.abrupt("return", order);

              case 23:
                throw new Error("Make order not implemented for ".concat(exchange));

              case 24:
              case "end":
                return _context27.stop();
            }
          }
        }, _callee27, this);
      }));

      function executeMakeOrder(_x76, _x77, _x78) {
        return _executeMakeOrder.apply(this, arguments);
      }

      return executeMakeOrder;
    }(),
    estimateCancelOrder: function () {
      var _estimateCancelOrder = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee28(_, _ref93, _ref94) {
        var from, exchange, id, buyToken, sellToken, environment, loaders, fund, _ref95, tradingAddress, env, makerAsset, takerAsset, result;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee28$(_context28) {
          while (1) {
            switch (_context28.prev = _context28.next) {
              case 0:
                from = _ref93.from, exchange = _ref93.exchange, id = _ref93.id, buyToken = _ref93.buyToken, sellToken = _ref93.sellToken;
                environment = _ref94.environment, loaders = _ref94.loaders;
                _context28.next = 4;
                return loaders.fundAddressFromManager.load(from);

              case 4:
                fund = _context28.sent;
                _context28.next = 7;
                return loaders.fundRoutes.load(fund);

              case 7:
                _ref95 = _context28.sent;
                tradingAddress = _ref95.tradingAddress;
                env = Object(_melonproject_protocol__WEBPACK_IMPORTED_MODULE_5__["withDifferentAccount"])(environment, new _melonproject_token_math__WEBPACK_IMPORTED_MODULE_6__["Address"](from));

                if (!(exchange === 'OASIS_DEX')) {
                  _context28.next = 17;
                  break;
                }

                makerAsset = new _melonproject_token_math__WEBPACK_IMPORTED_MODULE_6__["Address"](Object(_melonproject_protocol__WEBPACK_IMPORTED_MODULE_5__["getTokenBySymbol"])(env, sellToken).address || '');
                takerAsset = new _melonproject_token_math__WEBPACK_IMPORTED_MODULE_6__["Address"](Object(_melonproject_protocol__WEBPACK_IMPORTED_MODULE_5__["getTokenBySymbol"])(env, buyToken).address || '');
                _context28.next = 15;
                return _melonproject_protocol__WEBPACK_IMPORTED_MODULE_5__["cancelOasisDexOrder"].prepare(env, tradingAddress, {
                  id: id,
                  maker: tradingAddress,
                  makerAsset: makerAsset,
                  takerAsset: takerAsset
                });

              case 15:
                result = _context28.sent;
                return _context28.abrupt("return", result && result.rawTransaction);

              case 17:
                throw new Error("Cancel order not implemented for ".concat(exchange));

              case 18:
              case "end":
                return _context28.stop();
            }
          }
        }, _callee28, this);
      }));

      function estimateCancelOrder(_x79, _x80, _x81) {
        return _estimateCancelOrder.apply(this, arguments);
      }

      return estimateCancelOrder;
    }(),
    executeCancelOrder: function () {
      var _executeCancelOrder = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee29(_, _ref96, _ref97) {
        var from, signed, exchange, environment, loaders, fund, _ref98, tradingAddress, env, result;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee29$(_context29) {
          while (1) {
            switch (_context29.prev = _context29.next) {
              case 0:
                from = _ref96.from, signed = _ref96.signed, exchange = _ref96.exchange;
                environment = _ref97.environment, loaders = _ref97.loaders;
                _context29.next = 4;
                return loaders.fundAddressFromManager.load(from);

              case 4:
                fund = _context29.sent;
                _context29.next = 7;
                return loaders.fundRoutes.load(fund);

              case 7:
                _ref98 = _context29.sent;
                tradingAddress = _ref98.tradingAddress;
                env = Object(_melonproject_protocol__WEBPACK_IMPORTED_MODULE_5__["withDifferentAccount"])(environment, new _melonproject_token_math__WEBPACK_IMPORTED_MODULE_6__["Address"](from));

                if (!(exchange === 'OASIS_DEX')) {
                  _context29.next = 15;
                  break;
                }

                _context29.next = 13;
                return _melonproject_protocol__WEBPACK_IMPORTED_MODULE_5__["cancelOasisDexOrder"].send(env, tradingAddress, signed.rawTransaction);

              case 13:
                result = _context29.sent;
                return _context29.abrupt("return", !!result);

              case 15:
                throw new Error("Cancel order not implemented for ".concat(exchange));

              case 16:
              case "end":
                return _context29.stop();
            }
          }
        }, _callee29, this);
      }));

      function executeCancelOrder(_x82, _x83, _x84) {
        return _executeCancelOrder.apply(this, arguments);
      }

      return executeCancelOrder;
    }(),
    estimateDeployUserWhitelist: function () {
      var _estimateDeployUserWhitelist = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee30(_, _ref99, _ref100) {
        var from, addresses, environment, loaders, env, result;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee30$(_context30) {
          while (1) {
            switch (_context30.prev = _context30.next) {
              case 0:
                from = _ref99.from, addresses = _ref99.addresses;
                environment = _ref100.environment, loaders = _ref100.loaders;
                env = Object(_melonproject_protocol__WEBPACK_IMPORTED_MODULE_5__["withDifferentAccount"])(environment, new _melonproject_token_math__WEBPACK_IMPORTED_MODULE_6__["Address"](from));
                _context30.next = 5;
                return _melonproject_protocol__WEBPACK_IMPORTED_MODULE_5__["deployContract"].prepare(env, _melonproject_protocol__WEBPACK_IMPORTED_MODULE_5__["Contracts"].UserWhitelist, [addresses]);

              case 5:
                result = _context30.sent;
                return _context30.abrupt("return", result.unsignedTransaction);

              case 7:
              case "end":
                return _context30.stop();
            }
          }
        }, _callee30, this);
      }));

      function estimateDeployUserWhitelist(_x85, _x86, _x87) {
        return _estimateDeployUserWhitelist.apply(this, arguments);
      }

      return estimateDeployUserWhitelist;
    }(),
    estimateDeployAssetBlacklist: function () {
      var _estimateDeployAssetBlacklist = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee31(_, _ref101, _ref102) {
        var from, symbols, environment, loaders, env, addresses, result;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee31$(_context31) {
          while (1) {
            switch (_context31.prev = _context31.next) {
              case 0:
                from = _ref101.from, symbols = _ref101.symbols;
                environment = _ref102.environment, loaders = _ref102.loaders;
                env = Object(_melonproject_protocol__WEBPACK_IMPORTED_MODULE_5__["withDifferentAccount"])(environment, new _melonproject_token_math__WEBPACK_IMPORTED_MODULE_6__["Address"](from));
                addresses = symbols.map(function (symbol) {
                  return Object(_melonproject_protocol__WEBPACK_IMPORTED_MODULE_5__["getTokenBySymbol"])(env, symbol).address;
                });
                _context31.next = 6;
                return _melonproject_protocol__WEBPACK_IMPORTED_MODULE_5__["deployContract"].prepare(env, _melonproject_protocol__WEBPACK_IMPORTED_MODULE_5__["Contracts"].AssetBlacklist, [addresses]);

              case 6:
                result = _context31.sent;
                return _context31.abrupt("return", result.unsignedTransaction);

              case 8:
              case "end":
                return _context31.stop();
            }
          }
        }, _callee31, this);
      }));

      function estimateDeployAssetBlacklist(_x88, _x89, _x90) {
        return _estimateDeployAssetBlacklist.apply(this, arguments);
      }

      return estimateDeployAssetBlacklist;
    }(),
    estimateDeployAssetWhitelist: function () {
      var _estimateDeployAssetWhitelist = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee32(_, _ref103, _ref104) {
        var from, symbols, environment, loaders, env, addresses, result;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee32$(_context32) {
          while (1) {
            switch (_context32.prev = _context32.next) {
              case 0:
                from = _ref103.from, symbols = _ref103.symbols;
                environment = _ref104.environment, loaders = _ref104.loaders;
                env = Object(_melonproject_protocol__WEBPACK_IMPORTED_MODULE_5__["withDifferentAccount"])(environment, new _melonproject_token_math__WEBPACK_IMPORTED_MODULE_6__["Address"](from));
                addresses = symbols.map(function (symbol) {
                  return Object(_melonproject_protocol__WEBPACK_IMPORTED_MODULE_5__["getTokenBySymbol"])(env, symbol).address;
                });
                _context32.next = 6;
                return _melonproject_protocol__WEBPACK_IMPORTED_MODULE_5__["deployContract"].prepare(env, _melonproject_protocol__WEBPACK_IMPORTED_MODULE_5__["Contracts"].AssetWhitelist, [addresses]);

              case 6:
                result = _context32.sent;
                return _context32.abrupt("return", result.unsignedTransaction);

              case 8:
              case "end":
                return _context32.stop();
            }
          }
        }, _callee32, this);
      }));

      function estimateDeployAssetWhitelist(_x91, _x92, _x93) {
        return _estimateDeployAssetWhitelist.apply(this, arguments);
      }

      return estimateDeployAssetWhitelist;
    }(),
    estimateDeployMaxConcentration: function () {
      var _estimateDeployMaxConcentration = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee33(_, _ref105, _ref106) {
        var from, percent, environment, loaders, env, result;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee33$(_context33) {
          while (1) {
            switch (_context33.prev = _context33.next) {
              case 0:
                from = _ref105.from, percent = _ref105.percent;
                environment = _ref106.environment, loaders = _ref106.loaders;
                env = Object(_melonproject_protocol__WEBPACK_IMPORTED_MODULE_5__["withDifferentAccount"])(environment, new _melonproject_token_math__WEBPACK_IMPORTED_MODULE_6__["Address"](from));
                _context33.next = 5;
                return _melonproject_protocol__WEBPACK_IMPORTED_MODULE_5__["deployContract"].prepare(env, _melonproject_protocol__WEBPACK_IMPORTED_MODULE_5__["Contracts"].MaxConcentration, ["".concat(_melonproject_token_math__WEBPACK_IMPORTED_MODULE_6__["divide"](_melonproject_token_math__WEBPACK_IMPORTED_MODULE_6__["appendDecimals"](_melonproject_token_math__WEBPACK_IMPORTED_MODULE_6__["createToken"]('ETH'), percent), 100))]);

              case 5:
                result = _context33.sent;
                return _context33.abrupt("return", result.unsignedTransaction);

              case 7:
              case "end":
                return _context33.stop();
            }
          }
        }, _callee33, this);
      }));

      function estimateDeployMaxConcentration(_x94, _x95, _x96) {
        return _estimateDeployMaxConcentration.apply(this, arguments);
      }

      return estimateDeployMaxConcentration;
    }(),
    estimateDeployMaxPositions: function () {
      var _estimateDeployMaxPositions = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee34(_, _ref107, _ref108) {
        var from, positions, environment, loaders, env, result;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee34$(_context34) {
          while (1) {
            switch (_context34.prev = _context34.next) {
              case 0:
                from = _ref107.from, positions = _ref107.positions;
                environment = _ref108.environment, loaders = _ref108.loaders;
                env = Object(_melonproject_protocol__WEBPACK_IMPORTED_MODULE_5__["withDifferentAccount"])(environment, new _melonproject_token_math__WEBPACK_IMPORTED_MODULE_6__["Address"](from));
                _context34.next = 5;
                return _melonproject_protocol__WEBPACK_IMPORTED_MODULE_5__["deployContract"].prepare(env, _melonproject_protocol__WEBPACK_IMPORTED_MODULE_5__["Contracts"].MaxPositions, ["".concat(positions)]);

              case 5:
                result = _context34.sent;
                return _context34.abrupt("return", result.unsignedTransaction);

              case 7:
              case "end":
                return _context34.stop();
            }
          }
        }, _callee34, this);
      }));

      function estimateDeployMaxPositions(_x97, _x98, _x99) {
        return _estimateDeployMaxPositions.apply(this, arguments);
      }

      return estimateDeployMaxPositions;
    }(),
    estimateDeployPriceTolerance: function () {
      var _estimateDeployPriceTolerance = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee35(_, _ref109, _ref110) {
        var from, percent, environment, loaders, env, result;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee35$(_context35) {
          while (1) {
            switch (_context35.prev = _context35.next) {
              case 0:
                from = _ref109.from, percent = _ref109.percent;
                environment = _ref110.environment, loaders = _ref110.loaders;
                env = Object(_melonproject_protocol__WEBPACK_IMPORTED_MODULE_5__["withDifferentAccount"])(environment, new _melonproject_token_math__WEBPACK_IMPORTED_MODULE_6__["Address"](from));
                _context35.next = 5;
                return _melonproject_protocol__WEBPACK_IMPORTED_MODULE_5__["deployContract"].prepare(env, _melonproject_protocol__WEBPACK_IMPORTED_MODULE_5__["Contracts"].PriceTolerance, ["".concat(percent)]);

              case 5:
                result = _context35.sent;
                return _context35.abrupt("return", result.unsignedTransaction);

              case 7:
              case "end":
                return _context35.stop();
            }
          }
        }, _callee35, this);
      }));

      function estimateDeployPriceTolerance(_x100, _x101, _x102) {
        return _estimateDeployPriceTolerance.apply(this, arguments);
      }

      return estimateDeployPriceTolerance;
    }(),
    executeDeploy: function () {
      var _executeDeploy = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee36(_, _ref111, _ref112) {
        var from, signed, environment, loaders, env, result;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee36$(_context36) {
          while (1) {
            switch (_context36.prev = _context36.next) {
              case 0:
                from = _ref111.from, signed = _ref111.signed;
                environment = _ref112.environment, loaders = _ref112.loaders;
                env = Object(_melonproject_protocol__WEBPACK_IMPORTED_MODULE_5__["withDifferentAccount"])(environment, new _melonproject_token_math__WEBPACK_IMPORTED_MODULE_6__["Address"](from));
                _context36.next = 5;
                return _melonproject_protocol__WEBPACK_IMPORTED_MODULE_5__["deployContract"].send(env, {
                  signedTransaction: signed.rawTransaction
                });

              case 5:
                result = _context36.sent;
                return _context36.abrupt("return", result);

              case 7:
              case "end":
                return _context36.stop();
            }
          }
        }, _callee36, this);
      }));

      function executeDeploy(_x103, _x104, _x105) {
        return _executeDeploy.apply(this, arguments);
      }

      return executeDeploy;
    }(),
    estimateRegisterPolicies: function () {
      var _estimateRegisterPolicies = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee37(_, _ref113, _ref114) {
        var from, policies, environment, loaders, env, fund, _ref115, policyManagerAddress, registrations, result;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee37$(_context37) {
          while (1) {
            switch (_context37.prev = _context37.next) {
              case 0:
                from = _ref113.from, policies = _ref113.policies;
                environment = _ref114.environment, loaders = _ref114.loaders;
                env = Object(_melonproject_protocol__WEBPACK_IMPORTED_MODULE_5__["withDifferentAccount"])(environment, new _melonproject_token_math__WEBPACK_IMPORTED_MODULE_6__["Address"](from));
                _context37.next = 5;
                return loaders.fundAddressFromManager.load(from);

              case 5:
                fund = _context37.sent;
                _context37.next = 8;
                return loaders.fundRoutes.load(fund);

              case 8:
                _ref115 = _context37.sent;
                policyManagerAddress = _ref115.policyManagerAddress;
                registrations = policies.reduce(function (carry, current) {
                  if (current.type === 'TRADE') {
                    return [{
                      method: _melonproject_protocol__WEBPACK_IMPORTED_MODULE_5__["FunctionSignatures"].takeOrder,
                      policy: current.address
                    }, {
                      method: _melonproject_protocol__WEBPACK_IMPORTED_MODULE_5__["FunctionSignatures"].makeOrder,
                      policy: current.address
                    }, {
                      method: _melonproject_protocol__WEBPACK_IMPORTED_MODULE_5__["FunctionSignatures"].cancelOrder,
                      policy: current.address
                    }].concat(_toConsumableArray(carry));
                  } else {
                    return [{
                      method: _melonproject_protocol__WEBPACK_IMPORTED_MODULE_5__["FunctionSignatures"].executeRequestFor,
                      policy: current.address
                    }];
                  }
                }, []);
                _context37.next = 13;
                return _melonproject_protocol__WEBPACK_IMPORTED_MODULE_5__["register"].prepare(env, policyManagerAddress, registrations);

              case 13:
                result = _context37.sent;
                return _context37.abrupt("return", result.rawTransaction);

              case 15:
              case "end":
                return _context37.stop();
            }
          }
        }, _callee37, this);
      }));

      function estimateRegisterPolicies(_x106, _x107, _x108) {
        return _estimateRegisterPolicies.apply(this, arguments);
      }

      return estimateRegisterPolicies;
    }(),
    executeRegisterPolicies: function () {
      var _executeRegisterPolicies = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee38(_, _ref116, _ref117) {
        var from, signed, environment, loaders, env, fund, _ref118, policyManagerAddress, result;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee38$(_context38) {
          while (1) {
            switch (_context38.prev = _context38.next) {
              case 0:
                from = _ref116.from, signed = _ref116.signed;
                environment = _ref117.environment, loaders = _ref117.loaders;
                env = Object(_melonproject_protocol__WEBPACK_IMPORTED_MODULE_5__["withDifferentAccount"])(environment, new _melonproject_token_math__WEBPACK_IMPORTED_MODULE_6__["Address"](from));
                _context38.next = 5;
                return loaders.fundAddressFromManager.load(from);

              case 5:
                fund = _context38.sent;
                _context38.next = 8;
                return loaders.fundRoutes.load(fund);

              case 8:
                _ref118 = _context38.sent;
                policyManagerAddress = _ref118.policyManagerAddress;
                _context38.next = 12;
                return _melonproject_protocol__WEBPACK_IMPORTED_MODULE_5__["register"].send(env, policyManagerAddress, signed.rawTransaction);

              case 12:
                result = _context38.sent;
                return _context38.abrupt("return", result);

              case 14:
              case "end":
                return _context38.stop();
            }
          }
        }, _callee38, this);
      }));

      function executeRegisterPolicies(_x109, _x110, _x111) {
        return _executeRegisterPolicies.apply(this, arguments);
      }

      return executeRegisterPolicies;
    }(),
    deleteWallet: function () {
      var _deleteWallet = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee39() {
        var credentials;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee39$(_context39) {
          while (1) {
            switch (_context39.prev = _context39.next) {
              case 0:
                _context39.next = 2;
                return keytar__WEBPACK_IMPORTED_MODULE_2__["findCredentials"]('melon.fund');

              case 2:
                _context39.t0 = _context39.sent;

                if (_context39.t0) {
                  _context39.next = 5;
                  break;
                }

                _context39.t0 = [];

              case 5:
                credentials = _context39.t0;
                credentials.forEach(function (item) {
                  keytar__WEBPACK_IMPORTED_MODULE_2__["deletePassword"]('melon.fund', item.account);
                });
                return _context39.abrupt("return", true);

              case 8:
              case "end":
                return _context39.stop();
            }
          }
        }, _callee39, this);
      }));

      function deleteWallet() {
        return _deleteWallet.apply(this, arguments);
      }

      return deleteWallet;
    }(),
    loginWallet: function () {
      var _loginWallet = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee40(_, _ref119, _ref120) {
        var password, loaders, credentials, item;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee40$(_context40) {
          while (1) {
            switch (_context40.prev = _context40.next) {
              case 0:
                password = _ref119.password;
                loaders = _ref120.loaders;
                _context40.next = 4;
                return keytar__WEBPACK_IMPORTED_MODULE_2__["findCredentials"]('melon.fund');

              case 4:
                credentials = _context40.sent;

                if (!(credentials && credentials.length)) {
                  _context40.next = 8;
                  break;
                }

                item = ramda__WEBPACK_IMPORTED_MODULE_3__["head"](credentials);
                return _context40.abrupt("return", loaders.importWallet(item.password, password, function (decrypted) {
                  loaders.setWallet(decrypted);
                }));

              case 8:
                return _context40.abrupt("return", null);

              case 9:
              case "end":
                return _context40.stop();
            }
          }
        }, _callee40, this);
      }));

      function loginWallet(_x112, _x113, _x114) {
        return _loginWallet.apply(this, arguments);
      }

      return loginWallet;
    }(),
    exportWallet: function exportWallet(_, _ref121, _ref122) {
      var password = _ref121.password;
      var loaders = _ref122.loaders;
      var wallet = loaders.getWallet();
      return wallet && wallet.encrypt(password);
    },
    importWallet: function importWallet(_, _ref123, _ref124) {
      var wallet = _ref123.wallet,
          password = _ref123.password;
      var loaders = _ref124.loaders;
      return loaders.importWallet(wallet, password,
      /*#__PURE__*/
      function () {
        var _ref125 = _asyncToGenerator(
        /*#__PURE__*/
        _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee41(decrypted, encrypted) {
          var credentials;
          return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee41$(_context41) {
            while (1) {
              switch (_context41.prev = _context41.next) {
                case 0:
                  _context41.next = 2;
                  return keytar__WEBPACK_IMPORTED_MODULE_2__["findCredentials"]('melon.fund');

                case 2:
                  _context41.t0 = _context41.sent;

                  if (_context41.t0) {
                    _context41.next = 5;
                    break;
                  }

                  _context41.t0 = [];

                case 5:
                  credentials = _context41.t0;
                  credentials.forEach(function (item) {
                    keytar__WEBPACK_IMPORTED_MODULE_2__["deletePassword"]('melon.fund', item.account);
                  });
                  _context41.next = 9;
                  return keytar__WEBPACK_IMPORTED_MODULE_2__["setPassword"]('melon.fund', decrypted.address, encrypted);

                case 9:
                  loaders.setWallet(decrypted);

                case 10:
                case "end":
                  return _context41.stop();
              }
            }
          }, _callee41, this);
        }));

        return function (_x115, _x116) {
          return _ref125.apply(this, arguments);
        };
      }());
    },
    restoreWallet: function restoreWallet(_, _ref126, _ref127) {
      var mnemonic = _ref126.mnemonic,
          password = _ref126.password;
      var loaders = _ref127.loaders;
      return loaders.restoreWallet(mnemonic, password,
      /*#__PURE__*/
      function () {
        var _ref128 = _asyncToGenerator(
        /*#__PURE__*/
        _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee42(decrypted, encrypted) {
          return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee42$(_context42) {
            while (1) {
              switch (_context42.prev = _context42.next) {
                case 0:
                  _context42.next = 2;
                  return keytar__WEBPACK_IMPORTED_MODULE_2__["setPassword"]('melon.fund', decrypted.address, encrypted);

                case 2:
                  loaders.setWallet(decrypted);

                case 3:
                case "end":
                  return _context42.stop();
              }
            }
          }, _callee42, this);
        }));

        return function (_x117, _x118) {
          return _ref128.apply(this, arguments);
        };
      }());
    },
    generateMnemonic: function generateMnemonic(_, __, _ref129) {
      var loaders = _ref129.loaders;
      return loaders.generateMnemonic();
    }
  },
  Subscription: {
    balance: {
      resolve: function resolve(value) {
        return value;
      },
      subscribe: function () {
        var _subscribe = _asyncToGenerator(
        /*#__PURE__*/
        _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee43(_, _ref130, _ref131) {
          var symbol, address, loaders, observable$, stream$;
          return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee43$(_context43) {
            while (1) {
              switch (_context43.prev = _context43.next) {
                case 0:
                  symbol = _ref130.symbol, address = _ref130.address;
                  loaders = _ref131.loaders;
                  _context43.next = 4;
                  return loaders.symbolBalanceObservable.load({
                    symbol: symbol,
                    address: address
                  });

                case 4:
                  observable$ = _context43.sent;
                  stream$ = observable$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["distinctUntilChanged"])(ramda__WEBPACK_IMPORTED_MODULE_3__["equals"]));
                  return _context43.abrupt("return", Object(_utils_toAsyncIterator__WEBPACK_IMPORTED_MODULE_8__["default"])(stream$));

                case 7:
                case "end":
                  return _context43.stop();
              }
            }
          }, _callee43, this);
        }));

        function subscribe(_x119, _x120, _x121) {
          return _subscribe.apply(this, arguments);
        }

        return subscribe;
      }()
    },
    currentBlock: {
      resolve: function resolve(value) {
        return value;
      },
      subscribe: function subscribe(_, __, _ref132) {
        var streams = _ref132.streams;
        var stream$ = streams.block$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["pluck"])('number'), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["distinctUntilChanged"])(_utils_sameBlock__WEBPACK_IMPORTED_MODULE_7__["default"]));
        return Object(_utils_toAsyncIterator__WEBPACK_IMPORTED_MODULE_8__["default"])(stream$);
      }
    },
    nodeSynced: {
      resolve: function resolve(value) {
        return value;
      },
      subscribe: function subscribe(_, __, _ref133) {
        var streams = _ref133.streams;
        var stream$ = streams.syncing$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (state) {
          return !state;
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["distinctUntilChanged"])(ramda__WEBPACK_IMPORTED_MODULE_3__["equals"]));
        return Object(_utils_toAsyncIterator__WEBPACK_IMPORTED_MODULE_8__["default"])(stream$);
      }
    },
    priceFeedUp: {
      resolve: function resolve(value) {
        return value;
      },
      subscribe: function subscribe(_, __, _ref134) {
        var streams = _ref134.streams;
        var stream$ = streams.recentPrice$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["distinctUntilChanged"])(ramda__WEBPACK_IMPORTED_MODULE_3__["equals"]));
        return Object(_utils_toAsyncIterator__WEBPACK_IMPORTED_MODULE_8__["default"])(stream$);
      }
    },
    peerCount: {
      resolve: function resolve(value) {
        return value;
      },
      subscribe: function subscribe(_, __, _ref135) {
        var streams = _ref135.streams;
        var stream$ = streams.peers$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (value) {
          return console.log('tap', value);
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["distinctUntilChanged"])(ramda__WEBPACK_IMPORTED_MODULE_3__["equals"]));
        return Object(_utils_toAsyncIterator__WEBPACK_IMPORTED_MODULE_8__["default"])(stream$);
      }
    }
  }
});

/***/ }),

/***/ "./src/shared/graphql/schema/schema.gql":
/*!**********************************************!*\
  !*** ./src/shared/graphql/schema/schema.gql ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {


    var doc = {"kind":"Document","definitions":[{"kind":"DirectiveDefinition","name":{"kind":"Name","value":"authenticated"},"arguments":[],"locations":[{"kind":"Name","value":"FIELD"}]},{"kind":"DirectiveDefinition","name":{"kind":"Name","value":"sign"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"source"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"defaultValue":{"kind":"StringValue","value":"unsigned","block":false},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"target"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"defaultValue":{"kind":"StringValue","value":"signed","block":false},"directives":[]}],"locations":[{"kind":"Name","value":"FIELD"}]},{"kind":"DirectiveDefinition","name":{"kind":"Name","value":"account"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"arg"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"defaultValue":{"kind":"StringValue","value":"from","block":false},"directives":[]}],"locations":[{"kind":"Name","value":"FIELD"}]},{"kind":"ScalarTypeDefinition","name":{"kind":"Name","value":"DateTime"},"directives":[]},{"kind":"EnumTypeDefinition","name":{"kind":"Name","value":"ExchangeEnum"},"directives":[],"values":[{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"RADAR_RELAY"},"directives":[]},{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"OASIS_DEX"},"directives":[]},{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"KYBER_NETWORK"},"directives":[]},{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"ETHFINEX"},"directives":[]}]},{"kind":"EnumTypeDefinition","name":{"kind":"Name","value":"OrderTypeEnum"},"directives":[],"values":[{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"ASK"},"directives":[]},{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"BID"},"directives":[]}]},{"kind":"EnumTypeDefinition","name":{"kind":"Name","value":"FundSetupStepEnum"},"directives":[],"values":[{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"CREATE_ACCOUNTING"},"directives":[]},{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"CREATE_FEE_MANAGER"},"directives":[]},{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"CREATE_PARTICIPATION"},"directives":[]},{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"CREATE_POLICY_MANAGER"},"directives":[]},{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"CREATE_SHARES"},"directives":[]},{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"CREATE_TRADING"},"directives":[]},{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"CREATE_VAULT"},"directives":[]}]},{"kind":"EnumTypeDefinition","name":{"kind":"Name","value":"PolicyTypeEnum"},"directives":[],"values":[{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"TRADE"},"directives":[]},{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"INVEST"},"directives":[]}]},{"kind":"InterfaceTypeDefinition","name":{"kind":"Name","value":"Order"},"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"id"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"trade"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Price"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"price"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"volume"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"type"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OrderTypeEnum"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"exchange"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ExchangeEnum"}}},"directives":[]}]},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"EthfinexOrder"},"interfaces":[{"kind":"NamedType","name":{"kind":"Name","value":"Order"}}],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"id"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"trade"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Price"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"price"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"volume"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"type"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OrderTypeEnum"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"exchange"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ExchangeEnum"}}},"directives":[]}]},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"ZeroExOrder"},"interfaces":[{"kind":"NamedType","name":{"kind":"Name","value":"Order"}}],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"id"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"trade"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Price"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"price"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"volume"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"type"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OrderTypeEnum"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"exchange"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ExchangeEnum"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"metadata"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"ZeroExOrderMetadata"}},"directives":[]}]},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"OasisDexOrder"},"interfaces":[{"kind":"NamedType","name":{"kind":"Name","value":"Order"}}],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"id"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"trade"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Price"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"price"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"volume"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"type"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OrderTypeEnum"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"exchange"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ExchangeEnum"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"metadata"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"OasisDexOrderMetadata"}},"directives":[]}]},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"KyberNetworkOrder"},"interfaces":[{"kind":"NamedType","name":{"kind":"Name","value":"Order"}}],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"id"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"trade"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Price"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"price"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"volume"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"type"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OrderTypeEnum"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"exchange"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ExchangeEnum"}}},"directives":[]}]},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"ZeroExOrderMetadata"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"exchangeAddress"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"senderAddress"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"makerAddress"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"takerAddress"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"makerAssetData"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"takerAssetData"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"feeRecipientAddress"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"makerAssetAmount"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"takerAssetAmount"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"makerFee"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"takerFee"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"expirationTimeSeconds"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"signature"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"salt"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]}]},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"OasisDexOrderMetadata"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"id"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"maker"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"taker"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"isActive"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"exchangeContractAddress"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]}]},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Price"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"base"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Quantity"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"quote"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Quantity"}},"directives":[]}]},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Quantity"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"token"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Token"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"quantity"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]}]},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Token"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"symbol"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"decimals"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"address"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]}]},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Ranking"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"id"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"rank"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"address"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"name"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"inception"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"fund"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Fund"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"sharePrice"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Price"}},"directives":[]}]},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Routes"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"accountingAddress"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"feeManagerAddress"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"participationAddress"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"policyManagerAddress"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"priceSourceAddress"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"registryAddress"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"sharesAddress"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"tradingAddress"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"vaultAddress"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"versionAddress"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]}]},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Fund"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"id"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"rank"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"address"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"name"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"inception"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"gav"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Quantity"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"nav"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Quantity"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"owner"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"routes"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Routes"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"denominationAsset"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Token"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"nativeAsset"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Token"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"holdings"},"arguments":[],"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Holding"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"sharePrice"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Price"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"totalSupply"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Quantity"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"personalStake"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"investor"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]}],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Quantity"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"managementReward"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Quantity"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"managementFeeRate"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"performanceReward"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Quantity"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"performanceFeeRate"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"unclaimedFees"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Quantity"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"feesShareQuantity"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Quantity"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"isShutdown"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"isComplete"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}},"directives":[]}]},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Holding"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"balance"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Quantity"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"price"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Price"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"fraction"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]}]},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Trade"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"price"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Price"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"quantity"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Quantity"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"timestamp"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"type"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]}]},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Signature"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"r"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"s"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"v"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},"directives":[]}]},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"ExchangeConfig"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"adapterAddress"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"exchangeAddress"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"takesCustody"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},"directives":[]}]},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"AdapterAddresses"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"kyberAdapter"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"matchingMarketAdapter"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"zeroExAdapter"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]}]},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"PolicyAddresses"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"priceTolerance"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"userWhitelist"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]}]},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"FactoryAddresses"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"accountingFactory"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"feeManagerFactory"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"participationFactory"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"policyManagerFactory"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"sharesFactory"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"tradingFactory"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"vaultFactory"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]}]},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"ThirdPartyContracts"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"exchanges"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ExchangeConfig"}}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"tokens"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Token"}}}},"directives":[]}]},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"MelonContracts"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"priceSource"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"adapters"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AdapterAddresses"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"policies"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PolicyAddresses"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"engine"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"registry"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"version"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"ranking"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]}]},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Deployment"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"melonContracts"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MelonContracts"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"thirdPartyContracts"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ThirdPartyContracts"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"version"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"ranking"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"tokens"},"arguments":[],"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Token"}}},"directives":[]}]},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"UnsignedTransaction"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"data"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"from"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"gas"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"gasPrice"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"to"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"value"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]}]},{"kind":"InputObjectTypeDefinition","name":{"kind":"Name","value":"UnsignedTransactionInput"},"directives":[],"fields":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"data"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"from"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"gas"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"gasPrice"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"to"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"value"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]}]},{"kind":"InputObjectTypeDefinition","name":{"kind":"Name","value":"PolicyInput"},"directives":[],"fields":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"address"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"type"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PolicyTypeEnum"}}},"directives":[]}]},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Query"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"defaultAccount"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"allAccounts"},"arguments":[],"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"hasStoredWallet"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}},"directives":[]},{"kind":"FieldDefinition","description":{"kind":"StringValue","value":"Fetch the associated fund of an account.","block":false},"name":{"kind":"Name","value":"associatedFund"},"arguments":[{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"The address of the account to load the fund for.","block":false},"name":{"kind":"Name","value":"manager"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]}],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","description":{"kind":"StringValue","value":"Loads a fund by its name.","block":false},"name":{"kind":"Name","value":"fundByName"},"arguments":[{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"The name of the fund to load.","block":false},"name":{"kind":"Name","value":"name"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]}],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Fund"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"network"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"currentBlock"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"nodeSynced"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"priceFeedUp"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"peerCount"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"contractDeployment"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Deployment"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"totalFunds"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"balance"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"symbol"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"address"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]}],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Quantity"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"fund"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"address"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]}],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Fund"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"rankings"},"arguments":[],"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Ranking"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"orders"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"exchange"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ExchangeEnum"}}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"base"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"quote"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]}],"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Order"}}},"directives":[]},{"kind":"FieldDefinition","description":{"kind":"StringValue","value":"Loads the current routes for fund creation for a fund manager address.","block":false},"name":{"kind":"Name","value":"routes"},"arguments":[{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"The address of the fund manager.","block":false},"name":{"kind":"Name","value":"manager"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]}],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Routes"}},"directives":[]}]},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Mutation"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","description":{"kind":"StringValue","value":"Estimates the number of gas units required for the \"beginSetup\" transaction.","block":true},"name":{"kind":"Name","value":"estimateFundSetupBegin"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"name"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"exchanges"},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"performanceFee"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"managementFee"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}},"directives":[]}],"type":{"kind":"NamedType","name":{"kind":"Name","value":"UnsignedTransaction"}},"directives":[]},{"kind":"FieldDefinition","description":{"kind":"StringValue","value":"Executes the \"beginSetup\" transaction with the given gas price per unit.","block":true},"name":{"kind":"Name","value":"executeFundSetupBegin"},"arguments":[{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"Unsigned transaction data.","block":false},"name":{"kind":"Name","value":"unsigned"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UnsignedTransactionInput"}}},"directives":[]}],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","description":{"kind":"StringValue","value":"Estimates the number of gas units required for a fund setup step transaction.","block":true},"name":{"kind":"Name","value":"estimateFundSetupStep"},"arguments":[{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"The step in the fund factory process.","block":false},"name":{"kind":"Name","value":"step"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FundSetupStepEnum"}}},"directives":[]}],"type":{"kind":"NamedType","name":{"kind":"Name","value":"UnsignedTransaction"}},"directives":[]},{"kind":"FieldDefinition","description":{"kind":"StringValue","value":"Executes a fund setup step transaction with the given gas price per unit.","block":true},"name":{"kind":"Name","value":"executeFundSetupStep"},"arguments":[{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"Unsigned transaction data.","block":false},"name":{"kind":"Name","value":"unsigned"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UnsignedTransactionInput"}}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"The step in the fund factory process.","block":false},"name":{"kind":"Name","value":"step"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FundSetupStepEnum"}}},"directives":[]}],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}},"directives":[]},{"kind":"FieldDefinition","description":{"kind":"StringValue","value":"Estimates the number of gas units required for the \"completeSetup\" transaction.","block":true},"name":{"kind":"Name","value":"estimateFundSetupComplete"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"UnsignedTransaction"}},"directives":[]},{"kind":"FieldDefinition","description":{"kind":"StringValue","value":"Executes the \"completeSetup\" transaction with the given gas price per unit.","block":true},"name":{"kind":"Name","value":"executeFundSetupComplete"},"arguments":[{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"Unsigned transaction data.","block":false},"name":{"kind":"Name","value":"unsigned"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UnsignedTransactionInput"}}},"directives":[]}],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","description":{"kind":"StringValue","value":"Estimates the number of gas units required for the \"request investment\" transaction.","block":true},"name":{"kind":"Name","value":"estimateRequestInvestment"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"fundAddress"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"investmentAmount"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]}],"type":{"kind":"NamedType","name":{"kind":"Name","value":"UnsignedTransaction"}},"directives":[]},{"kind":"FieldDefinition","description":{"kind":"StringValue","value":"Executes the \"request investment\" transaction with the given gas price per unit.","block":true},"name":{"kind":"Name","value":"executeRequestInvestment"},"arguments":[{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"Unsigned transaction data.","block":false},"name":{"kind":"Name","value":"unsigned"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UnsignedTransactionInput"}}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"fundAddress"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]}],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}},"directives":[]},{"kind":"FieldDefinition","description":{"kind":"StringValue","value":"Estimates the number of gas units required for the \"execute request\" transaction.","block":true},"name":{"kind":"Name","value":"estimateExecuteRequest"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"fundAddress"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]}],"type":{"kind":"NamedType","name":{"kind":"Name","value":"UnsignedTransaction"}},"directives":[]},{"kind":"FieldDefinition","description":{"kind":"StringValue","value":"Executes the \"execute request\" transaction with the given gas price per unit.","block":true},"name":{"kind":"Name","value":"executeExecuteRequest"},"arguments":[{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"Unsigned transaction data.","block":false},"name":{"kind":"Name","value":"unsigned"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UnsignedTransactionInput"}}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"fundAddress"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]}],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}},"directives":[]},{"kind":"FieldDefinition","description":{"kind":"StringValue","value":"Estimates the number of gas units required for the \"approve transfer\" transaction.","block":true},"name":{"kind":"Name","value":"estimateApproveTransfer"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"fundAddress"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"investmentAmount"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]}],"type":{"kind":"NamedType","name":{"kind":"Name","value":"UnsignedTransaction"}},"directives":[]},{"kind":"FieldDefinition","description":{"kind":"StringValue","value":"Executes the \"execute request\" transaction with the given gas price per unit.","block":true},"name":{"kind":"Name","value":"executeShutDownFund"},"arguments":[{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"Unsigned transaction data.","block":false},"name":{"kind":"Name","value":"unsigned"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UnsignedTransactionInput"}}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"fundAddress"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]}],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}},"directives":[]},{"kind":"FieldDefinition","description":{"kind":"StringValue","value":"Estimates the number of gas units required for the \"approve transfer\" transaction.","block":true},"name":{"kind":"Name","value":"estimateShutDownFund"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"fundAddress"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]}],"type":{"kind":"NamedType","name":{"kind":"Name","value":"UnsignedTransaction"}},"directives":[]},{"kind":"FieldDefinition","description":{"kind":"StringValue","value":"Executes the \"approve transfer\" transaction with the given gas price per unit.","block":true},"name":{"kind":"Name","value":"executeApproveTransfer"},"arguments":[{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"Unsigned transaction data.","block":false},"name":{"kind":"Name","value":"unsigned"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UnsignedTransactionInput"}}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"fundAddress"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"investmentAmount"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]}],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}},"directives":[]},{"kind":"FieldDefinition","description":{"kind":"StringValue","value":"Estimates the number of gas units required for the \"trigger reward all fees\" transaction.","block":true},"name":{"kind":"Name","value":"estimateTriggerRewardAllFees"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"fundAddress"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]}],"type":{"kind":"NamedType","name":{"kind":"Name","value":"UnsignedTransaction"}},"directives":[]},{"kind":"FieldDefinition","description":{"kind":"StringValue","value":"Executes the \"trigger reward all fees\" transaction with the given gas price per unit.","block":true},"name":{"kind":"Name","value":"executeTriggerRewardAllFees"},"arguments":[{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"Unsigned transaction data.","block":false},"name":{"kind":"Name","value":"unsigned"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UnsignedTransactionInput"}}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"fundAddress"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]}],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Quantity"}},"directives":[]},{"kind":"FieldDefinition","description":{"kind":"StringValue","value":"Estimates the number of gas units required for the \"make order\" transaction.","block":true},"name":{"kind":"Name","value":"estimateMakeOrder"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"exchange"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ExchangeEnum"}}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"buyToken"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"buyQuantity"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"sellToken"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"sellQuantity"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]}],"type":{"kind":"NamedType","name":{"kind":"Name","value":"UnsignedTransaction"}},"directives":[]},{"kind":"FieldDefinition","description":{"kind":"StringValue","value":"Executes the \"make order\" transaction with the given gas price per unit.","block":true},"name":{"kind":"Name","value":"executeMakeOrder"},"arguments":[{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"Unsigned transaction data.","block":false},"name":{"kind":"Name","value":"unsigned"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UnsignedTransactionInput"}}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"exchange"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ExchangeEnum"}}},"directives":[]}],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Order"}},"directives":[]},{"kind":"FieldDefinition","description":{"kind":"StringValue","value":"Estimates the number of gas units required for the \"cancel order\" transaction.","block":true},"name":{"kind":"Name","value":"estimateCancelOrder"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"exchange"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ExchangeEnum"}}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"id"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"buyToken"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"sellToken"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]}],"type":{"kind":"NamedType","name":{"kind":"Name","value":"UnsignedTransaction"}},"directives":[]},{"kind":"FieldDefinition","description":{"kind":"StringValue","value":"Executes the \"cancel order\" transaction with the given gas price per unit.","block":true},"name":{"kind":"Name","value":"executeCancelOrder"},"arguments":[{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"Unsigned transaction data.","block":false},"name":{"kind":"Name","value":"unsigned"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UnsignedTransactionInput"}}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"exchange"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ExchangeEnum"}}},"directives":[]}],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"estimateDeployUserWhitelist"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"addresses"},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]}],"type":{"kind":"NamedType","name":{"kind":"Name","value":"UnsignedTransaction"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"estimateDeployAssetBlacklist"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"symbols"},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]}],"type":{"kind":"NamedType","name":{"kind":"Name","value":"UnsignedTransaction"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"estimateDeployAssetWhitelist"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"symbols"},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]}],"type":{"kind":"NamedType","name":{"kind":"Name","value":"UnsignedTransaction"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"estimateDeployMaxConcentration"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"percent"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}},"directives":[]}],"type":{"kind":"NamedType","name":{"kind":"Name","value":"UnsignedTransaction"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"estimateDeployMaxPositions"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"positions"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"directives":[]}],"type":{"kind":"NamedType","name":{"kind":"Name","value":"UnsignedTransaction"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"estimateDeployPriceTolerance"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"percent"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"directives":[]}],"type":{"kind":"NamedType","name":{"kind":"Name","value":"UnsignedTransaction"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"executeDeploy"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"unsigned"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"UnsignedTransactionInput"}},"directives":[]}],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"estimateRegisterPolicies"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"policies"},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PolicyInput"}}}},"directives":[]}],"type":{"kind":"NamedType","name":{"kind":"Name","value":"UnsignedTransaction"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"executeRegisterPolicies"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"unsigned"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"UnsignedTransactionInput"}},"directives":[]}],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}},"directives":[]},{"kind":"FieldDefinition","description":{"kind":"StringValue","value":"Export the currently active wallet in its encrypted form.","block":true},"name":{"kind":"Name","value":"exportWallet"},"arguments":[{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"The password for decrypting the wallet.","block":false},"name":{"kind":"Name","value":"password"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]}],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","description":{"kind":"StringValue","value":"Log out of the current wallet and delete its encrypted representation\nfrom local storage. This requires the user to either re-upload the\nencrypted wallet or restore it from its mnemonic when attempting to\nlog in again.","block":true},"name":{"kind":"Name","value":"deleteWallet"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},"directives":[]},{"kind":"FieldDefinition","description":{"kind":"StringValue","value":"Log in to a previously stored wallet. Returns a list of possible account\naddresses from the wallet.","block":true},"name":{"kind":"Name","value":"loginWallet"},"arguments":[{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"The password for decrypting the wallet.","block":false},"name":{"kind":"Name","value":"password"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]}],"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"FieldDefinition","description":{"kind":"StringValue","value":"Import and log in to wallet using a wallet JSON. Within the native app\nenvironment, this will cause the encrypted wallet to be stored locally\nfor future use.","block":true},"name":{"kind":"Name","value":"importWallet"},"arguments":[{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"The encrypted wallet.","block":false},"name":{"kind":"Name","value":"wallet"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"The password for decrypting the wallet.","block":false},"name":{"kind":"Name","value":"password"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]}],"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"FieldDefinition","description":{"kind":"StringValue","value":"Restore and login to a wallet using a mnemonic. Within the native app\nenvironment,this will cause the encrypted wallet to be stored locally\nfor future use.","block":true},"name":{"kind":"Name","value":"restoreWallet"},"arguments":[{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"The mnemonic to restore the wallet with.","block":false},"name":{"kind":"Name","value":"mnemonic"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"The password for decrypting the wallet.","block":false},"name":{"kind":"Name","value":"password"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]}],"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"FieldDefinition","description":{"kind":"StringValue","value":"Randomly generate a new mnemonic phrase.","block":true},"name":{"kind":"Name","value":"generateMnemonic"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]}]},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Subscription"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"currentBlock"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"nodeSynced"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"priceFeedUp"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"peerCount"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"balance"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"symbol"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"address"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]}],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Quantity"}},"directives":[]}]},{"kind":"SchemaDefinition","directives":[],"operationTypes":[{"kind":"OperationTypeDefinition","operation":"query","type":{"kind":"NamedType","name":{"kind":"Name","value":"Query"}}},{"kind":"OperationTypeDefinition","operation":"subscription","type":{"kind":"NamedType","name":{"kind":"Name","value":"Subscription"}}},{"kind":"OperationTypeDefinition","operation":"mutation","type":{"kind":"NamedType","name":{"kind":"Name","value":"Mutation"}}}]}],"loc":{"start":0,"end":12085}};
    doc.loc.source = {"body":"# Fields that are only safe within the native app environment and are blocked\n# from execution in the hosted / web environment.\ndirective @authenticated on FIELD\ndirective @sign(source: String = \"unsigned\", target: String = \"signed\") on FIELD\ndirective @account(arg: String = \"from\") on FIELD\n\nscalar DateTime\n\nenum ExchangeEnum {\n  RADAR_RELAY\n  OASIS_DEX\n  KYBER_NETWORK\n  ETHFINEX\n}\n\nenum OrderTypeEnum {\n  ASK\n  BID\n}\n\nenum FundSetupStepEnum {\n  CREATE_ACCOUNTING\n  CREATE_FEE_MANAGER\n  CREATE_PARTICIPATION\n  CREATE_POLICY_MANAGER\n  CREATE_SHARES\n  CREATE_TRADING\n  CREATE_VAULT\n}\n\nenum PolicyTypeEnum {\n  TRADE\n  INVEST\n}\n\ninterface Order {\n  id: String\n  trade: Price!\n  price: String\n  volume: String!\n  type: OrderTypeEnum!\n  exchange: ExchangeEnum!\n}\n\ntype EthfinexOrder implements Order {\n  id: String\n  trade: Price!\n  price: String\n  volume: String!\n  type: OrderTypeEnum!\n  exchange: ExchangeEnum!\n}\n\ntype ZeroExOrder implements Order {\n  id: String\n  trade: Price!\n  price: String\n  volume: String!\n  type: OrderTypeEnum!\n  exchange: ExchangeEnum!\n  metadata: ZeroExOrderMetadata\n}\n\ntype OasisDexOrder implements Order {\n  id: String\n  trade: Price!\n  price: String\n  volume: String!\n  type: OrderTypeEnum!\n  exchange: ExchangeEnum!\n  metadata: OasisDexOrderMetadata\n}\n\ntype KyberNetworkOrder implements Order {\n  id: String\n  trade: Price!\n  price: String\n  volume: String!\n  type: OrderTypeEnum!\n  exchange: ExchangeEnum!\n}\n\ntype ZeroExOrderMetadata {\n  exchangeAddress: String\n  senderAddress: String\n  makerAddress: String\n  takerAddress: String\n  makerAssetData: String\n  takerAssetData: String\n  feeRecipientAddress: String\n  makerAssetAmount: String\n  takerAssetAmount: String\n  makerFee: String\n  takerFee: String\n  expirationTimeSeconds: Int\n  signature: String\n  salt: String\n}\n\ntype OasisDexOrderMetadata {\n  id: String!\n  maker: String\n  taker: String\n  isActive: Boolean!\n  exchangeContractAddress: String\n}\n\ntype Price {\n  base: Quantity\n  quote: Quantity\n}\n\ntype Quantity {\n  token: Token\n  quantity: String\n}\n\ntype Token {\n  symbol: String\n  decimals: Int\n  address: String\n}\n\ntype Ranking {\n  id: String\n  rank: Int\n  address: String\n  name: String\n  inception: DateTime\n  fund: Fund\n  sharePrice: Price\n}\n\ntype Routes {\n  accountingAddress: String\n  feeManagerAddress: String\n  participationAddress: String\n  policyManagerAddress: String\n  priceSourceAddress: String\n  registryAddress: String\n  sharesAddress: String\n  tradingAddress: String\n  vaultAddress: String\n  versionAddress: String\n}\n\ntype Fund {\n  id: String\n  rank: Int\n  address: String\n  name: String\n  inception: DateTime\n  gav: Quantity\n  nav: Quantity\n  owner: String\n  routes: Routes\n  denominationAsset: Token\n  nativeAsset: Token\n  holdings: [Holding]\n  sharePrice: Price\n  totalSupply: Quantity\n  personalStake(investor: String): Quantity\n  managementReward: Quantity\n  managementFeeRate: String\n  performanceReward: Quantity\n  performanceFeeRate: String\n  unclaimedFees: Quantity\n  feesShareQuantity: Quantity\n  isShutdown: Boolean\n  isComplete: Boolean\n}\n\ntype Holding {\n  balance: Quantity!\n  price: Price!\n  fraction: String!\n}\n\ntype Trade {\n  price: Price\n  quantity: Quantity\n  timestamp: String\n  type: String\n}\n\ntype Signature {\n  r: String!\n  s: String!\n  v: Int!\n}\n\ntype ExchangeConfig {\n  adapterAddress: String!\n  exchangeAddress: String!\n  takesCustody: Boolean!\n}\n\ntype AdapterAddresses {\n  kyberAdapter: String!\n  matchingMarketAdapter: String!\n  zeroExAdapter: String!\n}\n\ntype PolicyAddresses {\n  priceTolerance: String!\n  userWhitelist: String!\n}\n\ntype FactoryAddresses {\n  accountingFactory: String!\n  feeManagerFactory: String!\n  participationFactory: String!\n  policyManagerFactory: String!\n  sharesFactory: String!\n  tradingFactory: String!\n  vaultFactory: String!\n}\n\ntype ThirdPartyContracts {\n  exchanges: [ExchangeConfig]!\n  tokens: [Token]!\n}\n\ntype MelonContracts {\n  priceSource: String!\n  adapters: AdapterAddresses!\n  policies: PolicyAddresses!\n  engine: String!\n  registry: String!\n  version: String!\n  ranking: String!\n}\n\ntype Deployment {\n  melonContracts: MelonContracts!\n  thirdPartyContracts: ThirdPartyContracts!\n  version: String\n  ranking: String\n  tokens: [Token]\n}\n\ntype UnsignedTransaction {\n  data: String\n  from: String\n  gas: String\n  gasPrice: String\n  to: String\n  value: String\n}\n\ninput UnsignedTransactionInput {\n  data: String\n  from: String\n  gas: String\n  gasPrice: String\n  to: String\n  value: String\n}\n\ninput PolicyInput {\n  address: String!\n  type: PolicyTypeEnum!\n}\n\ntype Query {\n  defaultAccount: String\n  allAccounts: [String]\n  hasStoredWallet: Boolean\n\n  \"Fetch the associated fund of an account.\"\n  associatedFund(\n    \"The address of the account to load the fund for.\"\n    manager: String\n  ): String\n\n  \"Loads a fund by its name.\"\n  fundByName(\"The name of the fund to load.\" name: String!): Fund\n\n  network: String\n  currentBlock: String\n  nodeSynced: Boolean\n  priceFeedUp: Boolean\n  peerCount: String\n  contractDeployment: Deployment\n  totalFunds: Int\n  balance(symbol: String!, address: String): Quantity\n  fund(address: String!): Fund\n  rankings: [Ranking]\n  orders(exchange: ExchangeEnum!, base: String!, quote: String!): [Order]\n\n  \"Loads the current routes for fund creation for a fund manager address.\"\n  routes(\"The address of the fund manager.\" manager: String): Routes\n}\n\ntype Mutation {\n  # TODO: Give more fund configuration options: Policies, pricefeed, ...\n  \"\"\"\n  Estimates the number of gas units required for the \"beginSetup\" transaction.\n  \"\"\"\n  estimateFundSetupBegin(\n    name: String!\n    exchanges: [String]!\n    performanceFee: Float!\n    managementFee: Float!\n  ): UnsignedTransaction\n\n  \"\"\"\n  Executes the \"beginSetup\" transaction with the given gas price per unit.\n  \"\"\"\n  executeFundSetupBegin(\n    \"Unsigned transaction data.\"\n    unsigned: UnsignedTransactionInput!\n  ): String\n\n  \"\"\"\n  Estimates the number of gas units required for a fund setup step transaction.\n  \"\"\"\n  estimateFundSetupStep(\n    \"The step in the fund factory process.\"\n    step: FundSetupStepEnum!\n  ): UnsignedTransaction\n\n  \"\"\"\n  Executes a fund setup step transaction with the given gas price per unit.\n  \"\"\"\n  executeFundSetupStep(\n    \"Unsigned transaction data.\"\n    unsigned: UnsignedTransactionInput!\n    \"The step in the fund factory process.\"\n    step: FundSetupStepEnum!\n  ): Boolean\n\n  \"\"\"\n  Estimates the number of gas units required for the \"completeSetup\" transaction.\n  \"\"\"\n  estimateFundSetupComplete: UnsignedTransaction\n\n  \"\"\"\n  Executes the \"completeSetup\" transaction with the given gas price per unit.\n  \"\"\"\n  executeFundSetupComplete(\n    \"Unsigned transaction data.\"\n    unsigned: UnsignedTransactionInput!\n  ): String\n\n  \"\"\"\n  Estimates the number of gas units required for the \"request investment\" transaction.\n  \"\"\"\n  estimateRequestInvestment(\n    fundAddress: String!\n    investmentAmount: String!\n  ): UnsignedTransaction\n\n  \"\"\"\n  Executes the \"request investment\" transaction with the given gas price per unit.\n  \"\"\"\n  executeRequestInvestment(\n    \"Unsigned transaction data.\"\n    unsigned: UnsignedTransactionInput!\n    fundAddress: String!\n  ): Boolean\n\n  \"\"\"\n  Estimates the number of gas units required for the \"execute request\" transaction.\n  \"\"\"\n  estimateExecuteRequest(fundAddress: String!): UnsignedTransaction\n\n  \"\"\"\n  Executes the \"execute request\" transaction with the given gas price per unit.\n  \"\"\"\n  executeExecuteRequest(\n    \"Unsigned transaction data.\"\n    unsigned: UnsignedTransactionInput!\n    fundAddress: String!\n  ): Boolean\n\n  \"\"\"\n  Estimates the number of gas units required for the \"approve transfer\" transaction.\n  \"\"\"\n  estimateApproveTransfer(\n    fundAddress: String!\n    investmentAmount: String!\n  ): UnsignedTransaction\n\n  \"\"\"\n  Executes the \"execute request\" transaction with the given gas price per unit.\n  \"\"\"\n  executeShutDownFund(\n    \"Unsigned transaction data.\"\n    unsigned: UnsignedTransactionInput!\n    fundAddress: String!\n  ): Boolean\n\n  \"\"\"\n  Estimates the number of gas units required for the \"approve transfer\" transaction.\n  \"\"\"\n  estimateShutDownFund(fundAddress: String!): UnsignedTransaction\n\n  \"\"\"\n  Executes the \"approve transfer\" transaction with the given gas price per unit.\n  \"\"\"\n  executeApproveTransfer(\n    \"Unsigned transaction data.\"\n    unsigned: UnsignedTransactionInput!\n    fundAddress: String!\n    investmentAmount: String!\n  ): Boolean\n\n  \"\"\"\n  Estimates the number of gas units required for the \"trigger reward all fees\" transaction.\n  \"\"\"\n  estimateTriggerRewardAllFees(fundAddress: String!): UnsignedTransaction\n\n  \"\"\"\n  Executes the \"trigger reward all fees\" transaction with the given gas price per unit.\n  \"\"\"\n  executeTriggerRewardAllFees(\n    \"Unsigned transaction data.\"\n    unsigned: UnsignedTransactionInput!\n    fundAddress: String!\n  ): Quantity\n\n  \"\"\"\n  Estimates the number of gas units required for the \"make order\" transaction.\n  \"\"\"\n  estimateMakeOrder(\n    exchange: ExchangeEnum!\n    buyToken: String!\n    buyQuantity: String!\n    sellToken: String!\n    sellQuantity: String!\n  ): UnsignedTransaction\n\n  \"\"\"\n  Executes the \"make order\" transaction with the given gas price per unit.\n  \"\"\"\n  executeMakeOrder(\n    \"Unsigned transaction data.\"\n    unsigned: UnsignedTransactionInput!\n    exchange: ExchangeEnum!\n  ): Order\n\n  \"\"\"\n  Estimates the number of gas units required for the \"cancel order\" transaction.\n  \"\"\"\n  # TODO: Same signature for all exchanges\n  estimateCancelOrder(\n    exchange: ExchangeEnum!\n    id: String!\n    buyToken: String!\n    sellToken: String!\n  ): UnsignedTransaction\n\n  \"\"\"\n  Executes the \"cancel order\" transaction with the given gas price per unit.\n  \"\"\"\n  executeCancelOrder(\n    \"Unsigned transaction data.\"\n    unsigned: UnsignedTransactionInput!\n    exchange: ExchangeEnum!\n  ): Boolean\n\n  # Policies\n  estimateDeployUserWhitelist(addresses: [String]): UnsignedTransaction\n  estimateDeployAssetBlacklist(symbols: [String]): UnsignedTransaction\n  estimateDeployAssetWhitelist(symbols: [String]): UnsignedTransaction\n  estimateDeployMaxConcentration(percent: Float): UnsignedTransaction\n  estimateDeployMaxPositions(positions: Int): UnsignedTransaction\n  estimateDeployPriceTolerance(percent: Int): UnsignedTransaction\n  executeDeploy(unsigned: UnsignedTransactionInput): String\n\n  estimateRegisterPolicies(policies: [PolicyInput]!): UnsignedTransaction\n  executeRegisterPolicies(unsigned: UnsignedTransactionInput): Boolean\n\n  \"\"\"\n  Export the currently active wallet in its encrypted form.\n  \"\"\"\n  exportWallet(\n    \"The password for decrypting the wallet.\"\n    password: String!\n  ): String\n\n  \"\"\"\n  Log out of the current wallet and delete its encrypted representation\n  from local storage. This requires the user to either re-upload the\n  encrypted wallet or restore it from its mnemonic when attempting to\n  log in again.\n  \"\"\"\n  deleteWallet: Boolean!\n\n  \"\"\"\n  Log in to a previously stored wallet. Returns a list of possible account\n  addresses from the wallet.\n  \"\"\"\n  loginWallet(\n    \"The password for decrypting the wallet.\"\n    password: String!\n  ): [String]\n\n  \"\"\"\n  Import and log in to wallet using a wallet JSON. Within the native app\n  environment, this will cause the encrypted wallet to be stored locally\n  for future use.\n  \"\"\"\n  importWallet(\n    \"The encrypted wallet.\"\n    wallet: String!\n    \"The password for decrypting the wallet.\"\n    password: String!\n  ): [String]\n\n  \"\"\"\n  Restore and login to a wallet using a mnemonic. Within the native app\n  environment,this will cause the encrypted wallet to be stored locally\n  for future use.\n  \"\"\"\n  restoreWallet(\n    \"The mnemonic to restore the wallet with.\"\n    mnemonic: String!\n    \"The password for decrypting the wallet.\"\n    password: String!\n  ): [String]\n\n  \"\"\"\n  Randomly generate a new mnemonic phrase.\n  \"\"\"\n  generateMnemonic: String\n}\n\ntype Subscription {\n  currentBlock: String\n  nodeSynced: Boolean\n  priceFeedUp: Boolean\n  peerCount: String\n  balance(symbol: String!, address: String): Quantity\n}\n\nschema {\n  query: Query\n  subscription: Subscription\n  mutation: Mutation\n}\n","name":"GraphQL request","locationOffset":{"line":1,"column":1}};


    var names = {};
    function unique(defs) {
      return defs.filter(
        function(def) {
          if (def.kind !== 'FragmentDefinition') return true;
          var name = def.name.value
          if (names[name]) {
            return false;
          } else {
            names[name] = true;
            return true;
          }
        }
      )
    }


      module.exports = doc;



/***/ }),

/***/ "./src/shared/graphql/schema/utils/currentPeers.ts":
/*!*********************************************************!*\
  !*** ./src/shared/graphql/schema/utils/currentPeers.ts ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/operators */ "rxjs/operators");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__);


function currentPeers(environment, block$) {
  return block$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["distinctUntilKeyChanged"])('number'), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["throttleTime"])(5000), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["switchMap"])(function () {
    return environment.eth.net.getPeerCount().then(function (a) {
      console.log(a);
      return a;
    });
  }));
}

/* harmony default export */ __webpack_exports__["default"] = (currentPeers);

/***/ }),

/***/ "./src/shared/graphql/schema/utils/currentRanking.ts":
/*!***********************************************************!*\
  !*** ./src/shared/graphql/schema/utils/currentRanking.ts ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "rxjs");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(rxjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "rxjs/operators");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _melonproject_protocol__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @melonproject/protocol */ "@melonproject/protocol");
/* harmony import */ var _melonproject_protocol__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_melonproject_protocol__WEBPACK_IMPORTED_MODULE_2__);




var requestRanking = function requestRanking(environment, rankingAddress, versionAddress) {
  return rxjs__WEBPACK_IMPORTED_MODULE_0__["from"](Object(_melonproject_protocol__WEBPACK_IMPORTED_MODULE_2__["getFundDetails"])(environment, rankingAddress, versionAddress)).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["timeout"])(3000), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["retryWhen"])(function (errors) {
    return errors.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["delay"])(1000));
  }));
};

var currentRanking = function currentRanking(environment, block$) {
  var throttled$ = block$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["distinctUntilKeyChanged"])('number'), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["throttleTime"])(5000));
  return throttled$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["concatMap"])(function () {
    return requestRanking(environment, environment.deployment.melonContracts.ranking, environment.deployment.melonContracts.version);
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (currentRanking);

/***/ }),

/***/ "./src/shared/graphql/schema/utils/hasRecentPrice.ts":
/*!***********************************************************!*\
  !*** ./src/shared/graphql/schema/utils/hasRecentPrice.ts ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "rxjs");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(rxjs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "rxjs/operators");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _melonproject_protocol__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @melonproject/protocol */ "@melonproject/protocol");
/* harmony import */ var _melonproject_protocol__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_melonproject_protocol__WEBPACK_IMPORTED_MODULE_3__);


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }





var requestHasRecentPrice = function requestHasRecentPrice(environment) {
  return rxjs__WEBPACK_IMPORTED_MODULE_1__["defer"](
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
    var address, token;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            address = environment.deployment.melonContracts.priceSource;
            _context.next = 3;
            return Object(_melonproject_protocol__WEBPACK_IMPORTED_MODULE_3__["getQuoteToken"])(environment, address);

          case 3:
            token = _context.sent;
            return _context.abrupt("return", Object(_melonproject_protocol__WEBPACK_IMPORTED_MODULE_3__["hasValidPrice"])(environment, address, token));

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }))).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["timeout"])(2000), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["retryWhen"])(function (errors) {
    return errors.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["delay"])(1000));
  }));
};

var hasRecentPrice = function hasRecentPrice(environment, block$) {
  var throttled$ = block$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["distinctUntilKeyChanged"])('number'), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["throttleTime"])(5000));
  return throttled$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["concatMap"])(function () {
    return requestHasRecentPrice(environment);
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (hasRecentPrice);

/***/ }),

/***/ "./src/shared/graphql/schema/utils/resolveNetwork.ts":
/*!***********************************************************!*\
  !*** ./src/shared/graphql/schema/utils/resolveNetwork.ts ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ramda */ "ramda");
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ramda__WEBPACK_IMPORTED_MODULE_0__);

var resolveNetwork = ramda__WEBPACK_IMPORTED_MODULE_0__["cond"]([[ramda__WEBPACK_IMPORTED_MODULE_0__["equals"](42), ramda__WEBPACK_IMPORTED_MODULE_0__["always"]('KOVAN')], [ramda__WEBPACK_IMPORTED_MODULE_0__["equals"](1), ramda__WEBPACK_IMPORTED_MODULE_0__["always"]('LIVE')], [ramda__WEBPACK_IMPORTED_MODULE_0__["T"], ramda__WEBPACK_IMPORTED_MODULE_0__["always"]('DEV')]]);
/* harmony default export */ __webpack_exports__["default"] = (resolveNetwork);

/***/ }),

/***/ "./src/shared/graphql/schema/utils/sameBlock.ts":
/*!******************************************************!*\
  !*** ./src/shared/graphql/schema/utils/sameBlock.ts ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var sameBlock = function sameBlock(a, b) {
  return a.toString() === b.toString();
};

/* harmony default export */ __webpack_exports__["default"] = (sameBlock);

/***/ }),

/***/ "./src/shared/graphql/schema/utils/subscribeBlock.ts":
/*!***********************************************************!*\
  !*** ./src/shared/graphql/schema/utils/subscribeBlock.ts ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "rxjs");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(rxjs__WEBPACK_IMPORTED_MODULE_0__);


var subscribeBlock = function subscribeBlock(environment) {
  var current = environment.eth.getBlock('latest');
  var subscription = environment.eth.subscribe('newBlockHeaders');
  return rxjs__WEBPACK_IMPORTED_MODULE_0__["concat"](rxjs__WEBPACK_IMPORTED_MODULE_0__["from"](current), rxjs__WEBPACK_IMPORTED_MODULE_0__["fromEvent"](subscription, 'data'));
};

/* harmony default export */ __webpack_exports__["default"] = (subscribeBlock);

/***/ }),

/***/ "./src/shared/graphql/schema/utils/subscribeSyncing.ts":
/*!*************************************************************!*\
  !*** ./src/shared/graphql/schema/utils/subscribeSyncing.ts ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "rxjs");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(rxjs__WEBPACK_IMPORTED_MODULE_0__);


var subscribeSyncing = function subscribeSyncing(environment) {
  var current = environment.eth.isSyncing();
  var subscription = environment.eth.subscribe('syncing');
  return rxjs__WEBPACK_IMPORTED_MODULE_0__["concat"](rxjs__WEBPACK_IMPORTED_MODULE_0__["from"](current), rxjs__WEBPACK_IMPORTED_MODULE_0__["fromEvent"](subscription, 'data'));
};

/* harmony default export */ __webpack_exports__["default"] = (subscribeSyncing);

/***/ }),

/***/ "./src/shared/graphql/schema/utils/takeLast.ts":
/*!*****************************************************!*\
  !*** ./src/shared/graphql/schema/utils/takeLast.ts ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/operators */ "rxjs/operators");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__);


var takeLast = function takeLast(stream$) {
  var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5000;
  return new Promise(function (resolve, reject) {
    stream$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["timeout"])(wait)).subscribe(resolve, reject);
  });
};

/* harmony default export */ __webpack_exports__["default"] = (takeLast);

/***/ }),

/***/ "./src/shared/graphql/schema/utils/toAsyncIterator.ts":
/*!************************************************************!*\
  !*** ./src/shared/graphql/schema/utils/toAsyncIterator.ts ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var iterall__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! iterall */ "./node_modules/iterall/index.mjs");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



function toAsyncIterator(observable$) {
  var promiseCapability = function promiseCapability() {
    var x = {};
    x.promise = new Promise(function (a, b) {
      x.resolve = a;
      x.reject = b;
    });
    return x;
  };

  var promise = promiseCapability();
  var subscription = observable$.subscribe(function (value) {
    promise.resolve({
      value: value,
      done: false
    });
    promise = promiseCapability();
  }, function (error) {
    promise.reject(error);
  }, function () {
    promise.resolve({
      value: undefined,
      done: true
    });
  });
  return _defineProperty({
    next: function next() {
      return promise.promise;
    },
    return: function _return() {
      subscription.unsubscribe();
      return Promise.resolve({
        value: undefined,
        done: true
      });
    },
    throw: function _throw(error) {
      subscription.unsubscribe();
      return Promise.reject(error);
    }
  }, iterall__WEBPACK_IMPORTED_MODULE_0__["$$asyncIterator"], function () {
    return this;
  });
}

/* harmony default export */ __webpack_exports__["default"] = (toAsyncIterator);

/***/ }),

/***/ "./src/shared/graphql/server.ts":
/*!**************************************!*\
  !*** ./src/shared/graphql/server.ts ***!
  \**************************************/
/*! exports provided: createSchemaLink, createIpcExecutor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createSchemaLink", function() { return createSchemaLink; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createIpcExecutor", function() { return createIpcExecutor; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "rxjs");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(rxjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var iterall__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! iterall */ "./node_modules/iterall/index.mjs");
/* harmony import */ var apollo_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! apollo-link */ "apollo-link");
/* harmony import */ var apollo_link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(apollo_link__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var graphql__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! graphql */ "graphql");
/* harmony import */ var graphql__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(graphql__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var apollo_utilities__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! apollo-utilities */ "apollo-utilities");
/* harmony import */ var apollo_utilities__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(apollo_utilities__WEBPACK_IMPORTED_MODULE_4__);
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







var isSubscription = function isSubscription(query) {
  var main = Object(apollo_utilities__WEBPACK_IMPORTED_MODULE_4__["getMainDefinition"])(query);
  return main.kind === 'OperationDefinition' && main.operation === 'subscription';
};

var createSchemaLink = function createSchemaLink(options) {
  return new apollo_link__WEBPACK_IMPORTED_MODULE_2__["ApolloLink"](function (request) {
    return new apollo_link__WEBPACK_IMPORTED_MODULE_2__["Observable"](function (observer) {
      var executor = isSubscription(request.query) ? graphql__WEBPACK_IMPORTED_MODULE_3__["subscribe"] : graphql__WEBPACK_IMPORTED_MODULE_3__["execute"];
      var context = typeof options.context === 'function' ? options.context(request) : options.context;
      var result = executor(options.schema, request.query, null, context, request.variables, request.operationName);
      Promise.resolve(result).then(function (data) {
        var iterable = Object(iterall__WEBPACK_IMPORTED_MODULE_1__["isAsyncIterable"])(data) ? data : Object(iterall__WEBPACK_IMPORTED_MODULE_1__["createAsyncIterator"])([data]);
        Object(iterall__WEBPACK_IMPORTED_MODULE_1__["forAwaitEach"])(iterable, function (value) {
          observer.next(value);
        }).then(function () {
          observer.complete();
        }).catch(function (error) {
          observer.error(error);
        });
      }).catch(function (error) {
        return observer.error(error);
      });
    });
  });
};
var createIpcExecutor = function createIpcExecutor(options) {
  var channel = options.channel || 'graphql';
  options.ipc.on(channel, function (event, id, request) {
    var result$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Observable"](function (observer) {
      var result = Object(apollo_link__WEBPACK_IMPORTED_MODULE_2__["execute"])(options.link, _objectSpread({}, request, {
        query: Object(graphql__WEBPACK_IMPORTED_MODULE_3__["parse"])(request.query)
      }));
      return result.subscribe(function (data) {
        return observer.next(data);
      }, function (error) {
        return observer.error(error);
      }, function () {
        return observer.complete();
      });
    });
    return result$.subscribe(function (data) {
      return event.sender.send(channel, id, 'data', data);
    }, function (error) {
      return event.sender.send(channel, id, 'error', error);
    }, function () {
      return event.sender.send(channel, id, 'complete');
    });
  });
};

/***/ }),

/***/ "@melonproject/exchange-aggregator":
/*!****************************************************!*\
  !*** external "@melonproject/exchange-aggregator" ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@melonproject/exchange-aggregator");

/***/ }),

/***/ "@melonproject/ganache-cli":
/*!********************************************!*\
  !*** external "@melonproject/ganache-cli" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@melonproject/ganache-cli");

/***/ }),

/***/ "@melonproject/protocol":
/*!*****************************************!*\
  !*** external "@melonproject/protocol" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@melonproject/protocol");

/***/ }),

/***/ "@melonproject/protocol/lib/contracts/dependencies/token/calls/getToken":
/*!*****************************************************************************************!*\
  !*** external "@melonproject/protocol/lib/contracts/dependencies/token/calls/getToken" ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@melonproject/protocol/lib/contracts/dependencies/token/calls/getToken");

/***/ }),

/***/ "@melonproject/protocol/lib/contracts/exchanges/transactions/makeOrderFromAccountOasisDex":
/*!***********************************************************************************************************!*\
  !*** external "@melonproject/protocol/lib/contracts/exchanges/transactions/makeOrderFromAccountOasisDex" ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@melonproject/protocol/lib/contracts/exchanges/transactions/makeOrderFromAccountOasisDex");

/***/ }),

/***/ "@melonproject/protocol/lib/contracts/fund/accounting/calls/getNativeToken":
/*!********************************************************************************************!*\
  !*** external "@melonproject/protocol/lib/contracts/fund/accounting/calls/getNativeToken" ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@melonproject/protocol/lib/contracts/fund/accounting/calls/getNativeToken");

/***/ }),

/***/ "@melonproject/protocol/lib/contracts/fund/accounting/calls/performCalculations":
/*!*************************************************************************************************!*\
  !*** external "@melonproject/protocol/lib/contracts/fund/accounting/calls/performCalculations" ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@melonproject/protocol/lib/contracts/fund/accounting/calls/performCalculations");

/***/ }),

/***/ "@melonproject/protocol/lib/contracts/fund/hub/calls/getCreationTime":
/*!**************************************************************************************!*\
  !*** external "@melonproject/protocol/lib/contracts/fund/hub/calls/getCreationTime" ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@melonproject/protocol/lib/contracts/fund/hub/calls/getCreationTime");

/***/ }),

/***/ "@melonproject/protocol/lib/contracts/fund/hub/calls/isShutDown":
/*!*********************************************************************************!*\
  !*** external "@melonproject/protocol/lib/contracts/fund/hub/calls/isShutDown" ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@melonproject/protocol/lib/contracts/fund/hub/calls/isShutDown");

/***/ }),

/***/ "@melonproject/protocol/lib/utils/environment/getTokenByAddress":
/*!*********************************************************************************!*\
  !*** external "@melonproject/protocol/lib/utils/environment/getTokenByAddress" ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@melonproject/protocol/lib/utils/environment/getTokenByAddress");

/***/ }),

/***/ "@melonproject/protocol/lib/utils/environment/getTokenBySymbol":
/*!********************************************************************************!*\
  !*** external "@melonproject/protocol/lib/utils/environment/getTokenBySymbol" ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@melonproject/protocol/lib/utils/environment/getTokenBySymbol");

/***/ }),

/***/ "@melonproject/token-math":
/*!*******************************************!*\
  !*** external "@melonproject/token-math" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@melonproject/token-math");

/***/ }),

/***/ "apollo-link":
/*!******************************!*\
  !*** external "apollo-link" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("apollo-link");

/***/ }),

/***/ "apollo-utilities":
/*!***********************************!*\
  !*** external "apollo-utilities" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("apollo-utilities");

/***/ }),

/***/ "bip39":
/*!************************!*\
  !*** external "bip39" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("bip39");

/***/ }),

/***/ "dataloader":
/*!*****************************!*\
  !*** external "dataloader" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("dataloader");

/***/ }),

/***/ "devtron":
/*!**************************!*\
  !*** external "devtron" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("devtron");

/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("electron");

/***/ }),

/***/ "electron-debug":
/*!*********************************!*\
  !*** external "electron-debug" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("electron-debug");

/***/ }),

/***/ "electron-devtools-installer":
/*!**********************************************!*\
  !*** external "electron-devtools-installer" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("electron-devtools-installer");

/***/ }),

/***/ "electron-is-dev":
/*!**********************************!*\
  !*** external "electron-is-dev" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("electron-is-dev");

/***/ }),

/***/ "ethers-wallet":
/*!********************************!*\
  !*** external "ethers-wallet" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("ethers-wallet");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "graphql":
/*!**************************!*\
  !*** external "graphql" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("graphql");

/***/ }),

/***/ "graphql-iso-date":
/*!***********************************!*\
  !*** external "graphql-iso-date" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("graphql-iso-date");

/***/ }),

/***/ "graphql-tools":
/*!********************************!*\
  !*** external "graphql-tools" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("graphql-tools");

/***/ }),

/***/ "graphql/execution":
/*!************************************!*\
  !*** external "graphql/execution" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("graphql/execution");

/***/ }),

/***/ "graphql/language":
/*!***********************************!*\
  !*** external "graphql/language" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("graphql/language");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),

/***/ "keytar":
/*!*************************!*\
  !*** external "keytar" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("keytar");

/***/ }),

/***/ "memoize-one":
/*!******************************!*\
  !*** external "memoize-one" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("memoize-one");

/***/ }),

/***/ "next":
/*!***********************!*\
  !*** external "next" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("next");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ "ramda":
/*!************************!*\
  !*** external "ramda" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("ramda");

/***/ }),

/***/ "rxjs":
/*!***********************!*\
  !*** external "rxjs" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("rxjs");

/***/ }),

/***/ "rxjs/operators":
/*!*********************************!*\
  !*** external "rxjs/operators" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("rxjs/operators");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),

/***/ "web3-eth-accounts":
/*!************************************!*\
  !*** external "web3-eth-accounts" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("web3-eth-accounts");

/***/ })

/******/ });
//# sourceMappingURL=main.map