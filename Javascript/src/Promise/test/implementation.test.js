/**
 * @Date:   2018-02-09T14:42:16+08:00
 * @Last modified time: 2018-02-09T17:15:48+08:00
 */
const Promise = require('../advanced/implementing.js')

console.log(1)
const p = new Promise(resolve => {
  console.log(2)
  setTimeout(() => {
    console.log(4)
    resolve({a: 'b'})
  }, 0)
})

console.log(3)
p.then(val => {
  console.log(5)
  // console.log(val)
})
