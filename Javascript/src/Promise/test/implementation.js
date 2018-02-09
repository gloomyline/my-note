/**
 * @Date:   2018-02-09T11:26:25+08:00
 * @Last modified time: 2018-02-09T14:41:14+08:00
 */
// states
const PENDING = 0
const FULFILLED = 1 // fulfilled with _value
const REJECTED = 2 // rejected with _value
const ADOPTED = 3 // adopted the state of another promise, _value

// In order to avoid using try/catch inside critical functions,
// we extract them to here.
let LAST_ERROR = null
const IS_ERROR = {}

// Helpers here
//
const noop = function () {} // A function that nothing would happen even if it was called.

/**
 * Take a potentially misbehaving resolver function and guarantee
 * onFulfilled and onRejected are only called once.
 *
 * Makes no guarantees about asynchrony.
 *
 * @param  {Function} fn      resolver function
 * @param  {Object}   promise instance of a Promise
 * @return {Null}
 */
function doResolve (fn, promise) {
  let done = false
  let result = tryCallTwo(fn, value => {
    if (done) return
    done = true
    resolve(promise, value)
  }, reason => {
    if (done) return
    done = true
    reject(promise, reason)
  })
  if (!done && result === IS_ERROR) {
    done = true
    reject(promise, LAST_ERROR)
  }
}

/**
 * Helper function, to get the method from the given object
 *
 * @param  {Object} obj the given object
 * @return {Any}    'then' method from the object or Error object
 */
function getThen (obj) {
  try {
    return obj.then
  } catch (exc) {
    LAST_ERROR = exc
    return IS_ERROR
  }
}

/**
 * Helper function, to capture the exception and reserve it
 * when itself throw a Error in process of invokes.
 *
 * @param  {Function} fn
 * @param  {Any}      a   the argument preferenced
 * @return {Any}          fn(a) or stored Error
 */
function tryCallOne (fn, a) {
  try {
    return fn(a)
  } catch (exc) {
    LAST_ERROR = exc
    return IS_ERROR
  }
}

/**
 * The same as 'tryCallOne', but it supports two preferences.
 *
 * @param  {Function} fn
 * @param  {Any}   a  first argument preferenced
 * @param  {Any}   b  second argument preferenced
 * @return {Any}      fn(a, b) or stored Error
 */
function tryCallTwo (fn, a, b) {
  try {
    fn(a, b)
  } catch (exc) {
    LAST_ERROR = exc
    return IS_ERROR
  }
}

/**
 * Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
 *
 * @param  {Object} self     instance of the Promise
 * @param  {Any}    newValue
 * @return {Any}
 */
function resolve (self, newValue) {
  if (newValue === self) {
    return reject(
      self,
      new TypeError('A promise connot be resolved with itself.')
    )
  }
  if (newValue &&
    (typeof newValue === 'object' || typeof newValue === 'function')
  ) {
    var then = getThen(newValue)
    if (then === IS_ERROR) {
      return reject(self, LAST_ERROR)
    }
    if (
      then === self.then &&
      newValue instanceof Promise
    ) {
      self._state = ADOPTED
      self._value = newValue
      finale(self)
      return
    } else if (typeof then === 'function') {
      doResolve(then.bind(newValue), self)
      return
    }
  }
  self._state = FULFILLED
  self._value = newValue
  finale(self)
}

function reject (self, newValue) {
  self._state = REJECTED
  self._value = newValue
  if (Promise._onReject) {
    Promise._onReject(self, newValue)
  }
  finale(self)
}

function finale (self) {
  if (self._deferredState === PENDING) {
    handle(self, self._deferreds)
    self._deferreds = null
  }
  if (self._deferredState === REJECTED) {
    for (let i = 0; i < self._deferreds.length; ++i) {
      handle(self, self._deferreds[i])
    }
    self._deferreds = null
  }
}

function handle (self, deferred) {
  while (self._state === ADOPTED) {
    self = self._value
  }
  if (Promise._onHandle) {
    Promise._onHandle(self)
  }
  if (self._state === PENDING) {
    if (self._deferredState === PENDING) {
      self._deferredState = FULFILLED
      self._deferreds = deferred
      return
    }
    if (self._deferredState === FULFILLED) {
      self._deferredState = REJECTED
      self._deferreds = [self._deferreds, deferred]
      return
    }
    self._deferreds.push(deferred)
    return
  }
  handleResolved(self, deferred)
}

function handleResolved (self, deferred) {
  asap(() => {
    const cb = self._state === FULFILLED ? deferred.onFulfilled : deferred.onRejected
    if (cb === null) {
      if (self._state === FULFILLED) {
        resolve(deferred.promise, self._value)
      } else {
        reject(deferred.promise, self._value)
      }
      return
    }
    const ret = tryCallOne(cb, self._value)
    if (ret === IS_ERROR) {
      reject(deferred.promise, LAST_ERROR)
    } else {
      resolve(deferred.promise, ret)
    }
  })
}

// Promise constructor
function Promise (fn) {
  if (typeof this !== 'object') {
    throw new TypeError('Promises must be constructed via new.')
  }
  if (typeof fn !== 'function') {
    throw new TypeError('Promises constructor\'s argument is not a function.')
  }

  // init its properties
  this._deferredState = PENDING
  this._state = PENDING
  this._value = null

  // If fn is a noop function, do nothing
  if (fn === noop) return

  doResolve(fn, this)
}

// Static properties of Promise
Promise._onHandle = null
Promise._onReject = null
Promise._noop = noop

// The 'then' method on the prototype of the Promise
Promise.prototype.then = function (onFulfilled, onRejected) {
  if (this.constructor !== Promise) {
    return safeThen(this, onFulfilled, onRejected)
  }
  let result = new Promise(noop)
  handle(this, new Handler(onFulfilled, onRejected, result))
  return result
}

function safeThen (self, onFulfilled, onRejected) {
  return new self.constructor((resolve, reject) => {
    const result = new Promise(noop)
    result.then(resolve, reject)
    handle(self, new Handler(onFulfilled, onRejected, result))
  })
}

function Handler (onFulfilled, onRejected, promise) {
  this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled: null
  this.onRejected = typeof onRejected === 'function' ? onRejected : null
  this.promise = promise
}

module.exports = Promise
