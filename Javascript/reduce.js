function randInt(start, end) {
	start = ~~start
	end = ~~end
	return ~~(Math.random() * Math.abs(end - start)) + start
}

function randIntArr(start, end, num) {
	num = ~~Math.abs(num)
	let arr = []
	for (let i = 0; i < num; ++i) {
		arr.push(randInt(start, end))
	}
	return arr
}

function log (fn) {
	if (typeof fn !== 'function') {
		throw new Error('arguments type error')
	}
	console.log('Starting log function %s', fn.name)
}

function run (start, end, num) {
	start = ~~start
	end = ~~end
	num = ~~num
	let arr = randIntArr(start, end, num)
	console.log('obArr is %o', arr)
	return [].reduce.call(arr, (pre, cur, index) => {
		return pre + cur
	})
}

console.log(run(1, 10, 10))

module.exports = {
	randInt,
	randIntArr
}
