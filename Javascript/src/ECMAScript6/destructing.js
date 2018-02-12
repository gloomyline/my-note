/**
 * @Date:   2018-02-11T16:30:15+08:00
 * @Last modified time: 2018-02-11T16:45:56+08:00
 */
function* fibs() {
  let a = 0;
  let b = 1;
  while (true) {
    // yield will push [a, b] into generator if here is not semicolon
    yield a;
    [a, b] = [b, a + b]
  }
}

let [fir, sec, thi, fou, fif, six] = fibs()
console.log(fir, sec, six)

// default value
// destructing assignment allows to have default value, like below
let [foo = true] = []
console.log(foo)

let [a , b = 'y'] = ['x', undefined]
console.log(a, b)
