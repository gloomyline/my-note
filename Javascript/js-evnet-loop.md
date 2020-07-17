# 浅谈`JS`中的`Event Loop`

## 准备工作，数据结构中的`堆(Heap)、栈(Stack)、队列(Queue)`

1. 堆————利用完全二叉树维护的一组数据

2. 栈

    只能表尾进行添加(add)，删除(pop)操作的线性表，它按照`后进先出`的原则存储数据

3. 队列

    只允许在表的前端(front)进行删除，而在表的后端(rear)进行插入操作的线性表，故队列又称作`先进先出`

## JS调用栈

  `Javascript`是一门单线程语言，它有一个主线程`main-thread`和调用栈(执行栈)`call-stack`，所有的任务都会被防到调用栈中等待主线程执行

  既然是栈，肯定采用先进后出的原则，当函数执行的时候，会被添加到栈的顶部，当执行完成后，会被从栈顶移除，直至调用栈被清空。

## 为什么会存在 `Event Loop`

![Event Loop](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9tbWJpei5xcGljLmNuL3N6X21tYml6X3BuZy9pY0xseHpLa0xHSWRhVTlRREJtMTFKM093Sjh4ZHhyNTdmbVhITU9yWW1tdmV1NjF0dXhxYVNPaWFOUTQ4Tk1ZZDRseGx6MTB4TmtadlNTY3EyRk13R1B3LzY0MA?x-oss-process=image/format,png)

1. js 从上到下解析方法，将其中的同步任务按照执行顺序排列到执行栈中；

2. 当程序调用外部的 API 时（比如 ajax、setTimeout 等），会将此类异步任务挂起，继续执行执行栈中的任务。等异步任务返回结果后，再按照顺序排列到事件队列中；

3. 主线程先将执行栈中的同步任务清空，然后检查事件队列中是否有任务，如果有，就将第一个事件对应的回调推到执行栈中执行，若在执行过程中遇到异步任务，则继续将这个异步任务将这个异步任务挂起，等异步任务返回结果后，再按照顺序排列到事件队列中

4. 主线程每次将执行栈清空后，就去事件队列中检查是否有任务，如果有，就每次取出一个推到执行栈中执行，这个循环往复的过程被称为“Event Loop 事件循环”

举个例子

    setTimeout(function () {
      console.log('setTimeout01');
    },1000)
    setTimeout(function () {
      console.log('setTimeout02');
    },0)
    new Promise(function (resolve) {
      console.log('new promise');
      resolve('.then')
    }).then(function (res) {
      console.log(res);
    })
    console.log('同步');

首先setTimeOut会被挂起，new Promise正常执行，输出‘new promise’。.then回调函数被挂起。console正常执行，输出‘同步’

异步任务返回结果后，再按照顺序排列到事件队列中。

大家都知道先输出的是setTimeout02，再输出setTimeout01。那setTimeout02和.then那个先输出，大家知道吗？继续往下看，会给到你答案。

## 宏任务、微任务

除了广义的同步任务和异步任务，我们对任务有更精细的定义，一种宏任务（MacroTask）也叫Task，一种叫微任务（MicroTask）

1. macro-task(宏任务)：
 
  当前调用栈中执行的任务称为宏任务。包含script全部代码、setTimeout、setInterval、setImmediate、I/O、UI Rendering。

2. micro-task(微任务)：

  当前（此次事件循环中）宏任务执行完，在下一个宏任务开始之前需要执行的任务为微任务。包含Process.nextTick（Node独有）、Promise、Object.observe(废弃)、MutationObserver

  不同类型的任务会进入对应的Event Queue，宏任务中的事件放在callback queue中，由事件触发线程维护；微任务的事件放在微任务队列中，由js引擎线程维护。

  不同类型的任务会进入对应的Event Queue，比如setTimeout和setInterval会进入相同的Event Queue。

## 80%的前端都会搞错的两个点
1.setTimeout

setTimeout，大家平时都用到过，它就是一个延时执行器,下面这段代码会隔一秒后输出

setTimeout(() => { console.log('ff'); },1000) 
我们稍微改变一下

setTimeout(() => { console.log('ff'); },1000) 
sleep(50000000)
现在我们会发现，过一秒之后并没有输出ff.这是为什么呢？我们分析下这段代码

首先整段代码作为宏任务进入主线程执行
遇到setTimeout,那么将其回调函数注册后分发到宏任务事件队列。
顺序执行sleep,等sleep执行完，执行栈清空了。再将事件队列中的第一个任务移入执行栈中
所以我们要注意，setTimeout中的时间是等待加入事件队列中的时间，不是立即执行的时间。平时我们感觉它就是立即执行的时间，是因为当把setTimeout中的回调函数加入事件队列的时候执行栈就已经被清空了，所以它会立即执行。

我们还经常遇到setTimeout(fn,0)这样的代码，0秒后执行又是什么意思呢？是不是可以立即执行呢？

答案是不会的，setTimeout(fn,0)的含义是，指定setTimeout中的回调函数会被立即加入事件队列中，不用再等多少秒了，只要主线程执行栈内的同步任务全部执行完成，栈为空就马上执行。

2.javascript的执行和运行

执行和运行有很大的区别，javascript在不同的环境下，比如node，浏览器，Ringo等等，执行方式是不同的。而运行大多指javascript解析引擎，是统一的。

Event Loop是javascript的执行机制

## 测试题
看到这里大家可能会觉得Event Loop不过如此，一道练习题测试下大家是否真的完全掌握了
  ```
  setTimeout(function () {
    console.log('a');
    new Promise(function (resolve,reject) {
      resolve();
      console.log('b');
    }).then(function () {
      console.log('c')
    })
  },1000)
  setTimeout(function () {
    console.log('d');
  },0)
  new Promise(function (resolve,reject) {
    reject();
    console.log('e');
  }).then(function () {
    console.log('f')
  }).catch(()=>{
    console.log('g')
  })
  console.log('h')
  ```
    
把上面知识点都消化了的同学肯定知道答案是：

e h g d a b c