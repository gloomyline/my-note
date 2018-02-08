const { randInt, randIntArr } = require('./reduce')

let arr = randIntArr(1, 10, 10)
console.log(11, arr)
let randEl = arr[randInt(0, 9)]
console.log(22, randEl)
Array.prototype.splice.call(arr, Array.prototype.indexOf.call(arr, randEl), 1)
console.log(33, arr)
