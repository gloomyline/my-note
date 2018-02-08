/**
 * @Date:   2018-02-08T15:51:53+08:00
 * @Last modified time: 2018-02-08T16:41:23+08:00
 */
'use strict'

const Promise = require('../advanced/implementing.js')

console.log('asynchronous mutation start')
let p1 = new Promise((resolve, reject) => {
  console.log('asynchronous action start.')
  // use global function setTimeout to simulate asynchronous action
  setTimeout(() => {
    console.log('asynchronous action done.')
    if ((Math.random() * 2 - 1) > 0) {
      resolve('onFulfilled.')
    } else {
      reject('reason')
    }
  }, Math.random() * 3000 + 1000)
})
p1.then(fulfilledMsg => {
  console.log(fulfilledMsg)
}, exc => {
  console.log(exc)
})


console.log('asynchronous mutation done')
