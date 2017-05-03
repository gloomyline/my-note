/*
* @Author: Alan
* @Date:   2017-05-03 14:54:42
* @Last Modified by:  Alan
* @Last Modified time: 2017-05-03 16:46:31
*/

/**
 * 有一个数组a[N]顺序存放0~N-1, 要求没隔两个数删掉一个数，到末尾时
 * 循环至开头继续进行，求最后一个被删掉的原始下标位置。以8个数(N=7)为例：
 * {0, 1, 2, 3, 4, 5, 6, 7}, 0->1->2(删除)->3->4->5(删除)->6->7->0(删除),
 * 如此循环直到最后一个数被删除。算法实现
 */

var anArr = [],
	randN = Math.floor(Math.random() * 1000);
for(var i = 0;i < randN;i++){
	anArr.push(i);
}

console.log(anArr);
var first = 0, last, anoArr = anArr.slice();

/**
 * 每隔两个成员删除给定数组中的某个成员，
 * 遍历到数组结尾时循环至新数组开始，
 * 直至最后一个成员，输出次成员
 * 
 * @Author   Alan
 * @DateTime 2017-05-03
 * @arr    	Array
 * @return  Number
 */
function iter(arr) {
	var start = !!!first? 2 : 0;
	first = 1;

	var newArr = arr, len = arr.length;
	if (len > 1) {
		for(var i = start;i < len;i += 2) {
			newArr.splice(i, 1);
		}
		iter(newArr);
	} 
	else {
		console.log(newArr);
		last = parseInt(newArr.join(''));
	}
}

iter(anArr);
console.log(anoArr.indexOf(last));
