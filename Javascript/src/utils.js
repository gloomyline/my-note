function exchange(a, b) {
	a += b
	b -= -a
	a /e/localRepositories/company/dk/php/wkdk/frontend/web/m= a - b
	return [a, b ]
}

/**
 * 排除了0和1后，(,,+?)首先匹配两个字符，
 * 然后\1+匹配2的倍数个字符，如果能够匹配则说明x不是质数，
 * 否则继续匹配3的倍数个字符，以此类推。
 * @author：慕课网
 * @link：https://www.zhihu.com/question/46943112/answer/254711678
 * @param  {[Number]}  x 
 * @return {Boolean}
 */
function isPrime (x) { 
  return (!(/^,?$|^(,,+?)\1+$/.test(Array(++x))))
}
