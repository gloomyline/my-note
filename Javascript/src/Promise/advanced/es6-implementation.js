/**
 * @Date:   2018-02-11T11:04:40+08:00
 * @Last modified time: 2018-02-11T15:36:43+08:00
 */

// States
//
// 0 - pending
// 1 - fulfilled with _value
// 2 - rejected with _value
// 3 - adopted the state of another promise, _value
//
// once the state is no longer pending (0) it is immutable

import asap from 'asap/raw'

const noop = function () {}
let uid = 0

class Promise {
  constructor (fn) {
    if (typeof fn !== 'function') {
      throw new TypeError('Promise constructor\'s argument is not a function.')
    }
    // Use _uid to identify unique instance of this class
    this._uid = ++uid

    this._deferredState = 0
    this._state = 0
    this._value = null
    this._deferreds = null

    // To avoid using try/catch inside critical functions,
    // we extract them here.
    this.LAST_ERROR = null
    this.IS_ERROR = {}

    if (fn === noop) return
    this._doResolve(fn)
  }

  _getThen (o) {
    try {
      return o.then
    } catch (exc) {
      this.LAST_ERROR = exc
      return this.IS_ERROR
    }
  }
  _tryCallOne (fn, a) {
    try {
      fn(a)
    } catch (exc) {
      this.LAST_ERROR = exc
      return this.IS_ERROR
    }
  }

  _tryCallTwo (fn, a, b) {
    try {
      fn(a, b)
    } catch (exc) {
      this.LAST_ERROR = exc
      return this.IS_ERROR
    }
  }

  _doResolve (fn) {
    let done = false
    let result = this._tryCallTwo(fn, value => {
      if (done) return
      done = true
      this._resolve(value)
    }, reason => {
      if (done) return
      done = true
      this._reject(reason)
    })
    if (!done && result === this.IS_ERROR) {
      done = true
      this._reject(this.LAST_ERROR)
    }
  }

  _resolve (newValue) {
    // Promise Resolution Procedure:
    // https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
    if (newValue === this) {
      return this._reject(new TypeError('A promise cannot be resolved with itself.'))
    }
    if (newValue &&
      (typeof newValue === 'object' || typeof newValue === 'function')
    ) {
      const then = this._getThen(newValue)
      if (then === this.IS_ERROR) {
        return this._reject(this.LAST_ERROR)
      }
      if (then === this.then &&
        newValue instanceof Promise
      ) {
        this._state = 3
        this._value = newValue
        this._finale()
        return
      } else if (typeof then === 'function') {
        this._doResolve(then.bind(newValue))
        return
      }
    }
    this._state = 1
    this._value = newValue
    this._finale()
  }

  _reject (reason) {
    this._state = 2
    this._value = reason
    if (Promise._onReject) {
      Promise._onReject(reason)
    }
    this._finale()
  }

  _handle (deferred) {
    while (this._state === 3) {
      this = this._value
    }
    if (Promise._onHandle) {
      Promise._onHandle(this)
    }
    if (this._state === 0) {
      if (this._deferredState === 0) {
        this._deferredState = 1
        this._deferreds = deferred
        return
      }
      if (this._deferredState === 1) {
        this._deferredState = 2
        this._deferreds = [this._deferreds, deferred]
        return
      }
      this._deferreds.push(deferred)
      return
    }
    this._handleResolved(deferred)
  }

  _handleResolved (deferred) {
    asap(() => {
      const cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected
      if (cb === null) {
        if (this._state === 1) {
          this._resolve(deferred.promise, this._value)
        } else {
          this._reject(deferred.promise, this._value)
        }
        return
      }
      const ret = this._tryCallOne(cb, this._value)
      if (ret === this.IS_ERROR) {
        this._reject(deferred.promise, this.LAST_ERROR)
      } else {
        this._resolve(deferred.promise, ret)
      }
    })
  }

  _finale () {
    if (this._deferredState === 1) {
      this._handle(this._deferreds)
      this._deferreds = null
    }
    if (this._deferredState === 2) {
      for (let i = 0; i < this._deferreds.length; ++i) {
        this._handle(this._deferreds[i])
      }
      this._deferreds = null
    }
  }

}

console.log(1, new Promise(noop))
