/**
 * @Date:   2018-02-08T15:51:53+08:00
 * @Last modified time: 2018-02-09T15:24:12+08:00
 */
'use strict'

const Promise = require('../advanced/implementing.js')

const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    if (Math.random() * 2 - 1 > 0) {
      resolve(1)
    } else {
      reject(-1)
    }
  }, 1000)
})

p1.then(val => {
  console.log(val)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(++val)
    })
  }, 1000)
}, e => {
  console.log(e)
}).then(val => {
  console.log(val)
}, e => {
  console.log(e)
})
