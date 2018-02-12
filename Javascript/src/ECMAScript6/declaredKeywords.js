/**
 * @Date:   2018-02-11T15:37:54+08:00
 * @Last modified time: 2018-02-11T15:53:26+08:00
 */
'use strict'

// declare a object called 'foo' by keyword 'const' will make it into a constant
const foo = {
  a: 1,
  b: 'abc',
  c: '123abc',
  x: function (i) { return ++i },
  y: {
    ya: 'xyz',
    yb: 789
  }
}

function freeze (obj) {
  Object.freeze(obj)
  Object.keys(obj).forEach(key => {
    let item = obj[key]
    if (typeof item === 'object') {
      freeze(item)
    } else {
      Object.freeze(item)
    }
  })
}

freeze(foo)

// Would get a TypeError, cannot assign to read only property 'b' of Object 'foo'
// foo.b = 'xyz'

// Would get TypeError, cannot add property foo, object is not extensible
// foo.foo = 'foo'
