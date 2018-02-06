/*
* @Author: AlanWang
* @Date:   2018-02-06 14:36:20
 * @Last modified by:
 * @Last modified time: 2018-02-06T17:12:32+08:00
*/

/**
 * A Promise object is created using the new keyword and its constructor.
 * This constructors takes as its argument a function, called the "executor function".
 * This function should take two functions as parameters.
 * The first of these functions(resolve) is called when the asynchronous task complete
 * successfully and returns the results of the task as a value.The second(reject) is called
 * when the task fails, and returns the reason for failure, which is typically an error object.
 */
const myFirstPromise = new Promise((resolve, reject) => {
  // do sth. asynchronous which eventually calls either:
  //
  //  resolve (someValue) // fulfilled
  // or
  //  reject ('failure reason') // rejected
})

// To provide a function with promise functionality, simply have it return a promise:
function myAsyncFunction (url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url)
    xhr.onload = () => resolve(xhr.responseText)
    xhr.onerror = () => reject(xhr.status.Text)
    xhr.send()
  })
}

/**
 * Examples
 * Basic Example
 */
let mySecPromise = new Promise((resolve, reject) => {
  // We call resolve(...) when we are doing asynchronously was successfully,
  // and reject(...) when it failed. Use setTimeout(...) to simulate async code.
  setTimeout(() => {
    resolve("Success!") // Evevything went well!
  }, 300)
})
mySecPromise.then(successMsg => {
  // successMsg is whatever we passed in the resolve(...) function above.
  // It does not have to be a string, but if it is only a succeed message, it probably will be.
  console.log('Yay! ' + successMsg)
})
