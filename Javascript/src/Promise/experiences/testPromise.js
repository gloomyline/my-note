/**
 * @Date:   2018-02-06T17:09:19+08:00
 * @Last modified time: 2018-02-06T17:41:15+08:00
 */
 /**
  * Advanced Example
  *
  * This example shows the mechanism of a Promise.The testPromise method is called
  * by a interval time.It creates a promise that will be fulfilled, using
  * setTimeout, to the promise count(number starting from 1) every 1~3 secondes,
  * at random.The Promise constructor is used to create the promise.
  *
  * The fulfillment of the promise is simply logged, via a fulfill callback set using p1.then().
  * A few logs show how the synchronous part of the method is decoupled from asynchronous
  * completion of the promise.
  */
let promiseCount = 0
const intervalId = setInterval(() => {
  testPromise()
}, 1000)
function testPromise () {
  let thisPromiseCount = ++promiseCount
  if (thisPromiseCount > 10) {
    clearInterval(intervalId)
    return
  }
  console.log(`${thisPromiseCount}) Started (Sync code started)`)
  const promise = new Promise((resolve, reject) => {
    console.log(`${thisPromiseCount}) Promise started (Async code started)`)
    setTimeout(() => {
      if (Math.random() >= .5) {
        resolve(thisPromiseCount)
      } else {
        reject(`(${thisPromiseCount}) Error`)
      }
    }, Math.random() * 2000 + 1000)
  })
  promise.then((val) => {
    console.log(`${thisPromiseCount}) Promise fulfilled (Async code terminated)`)
  }).catch((reason) => {
    console.log(`Handle rejected promise (${reason}) here.`)
  })
}
