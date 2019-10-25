# JS 模块规范

## CommonJS

1. 特点

    - 模块可以多次加载，但是只会在第一次加载时运行一次，然后运行结果就被缓存了，以后再加载，就直接读取缓存结果。要想让模块再次运行，必须清除缓存。

    - 模块加载会阻塞接下来代码的执行，需要等到模块加载完成才能继续执行——同步加载。

2. 环境：服务器环境

3. 应用：nodejs的模块规范参照commonJS实现

4. 语法：

    - 导入：require('路径')

    - 导出：module.exports和exports

5. 注意：

    > module.exports和exports的的区别是exports只是对module.exports的一个引用，相当于Node为每个模块提供一个exports变量，指向module.exports。这等同在每个模块头部，有一行var exports = module.exports;这样的命令。

6. demo

```
// a.js
// 相当于这里还有一行：var exports = module.exports;代码
exports.a = 'Hello world';  // 相当于：module.exports.a = 'Hello world';

// b.js
var moduleA = require('./a.js');
console.log(moduleA.a);     // 打印出hello world
```

## AMD

1. 定义：即 (Asynchronous Module Definition)，这种规范是异步的加载模块，requireJs应用了这一规范。先定义所有依赖，然后在加载完成后的回调函数中执行：

1. 特点：

    - 异步加载

    - 管理模块之间的依赖性，便于代码编写和维护

2. 环境: 浏览器环境

3. 应用： requireJS参照AMD规范实现

4. 语法：

    - 导入：require(['模块名称'], function('模块变量引用'){//代码})
    - 导出：define(function(){return'值'})

5. 缺点：

    > AMD虽然实现了异步加载，但是开始就把所有依赖写出来是不符合书写的逻辑顺序的，能不能像commonJS那样用的时候再require，而且还支持异步加载后再执行呢？

6. demo

```
// a.js
define(function (){
　　return {
　　　a:'hello world'
　　}
});
// b.js
require(['./a.js'], function (moduleA){
    console.log(moduleA.a); // 打印出：hello world
});
```

## CMD

1. 特点

    CMD是在AMD基础上改进的一种规范，和AMD不同在于对依赖模块的执行时机处理不同，CMD是就近依赖，而AMD是前置依赖。

2. 环境：浏览器环境

3. 应用：seajs是参照CMD规范实现的，requireJS的最新的几个版本也是部分参照了CMD规范的实现

4. `AMD和CMD最大的区别:` 是对依赖模块的执行时机处理不同，而不是加载的时机或者方式不同，二者皆为异步加载模块。

    AMD依赖前置，js可以方便知道依赖模块是谁，立即加载；而CMD就近依赖，需要使用把模块变为字符串解析一遍才知道依赖了那些模块，这也是很多人诟病CMD的一点，牺牲性能来带来开发的便利性，实际上解析模块用的时间短到可以忽略。

5. 语法：

    - 导入：define(function(require, exports, module) {});

    - 导出：define(function (){return '值');

6. demo
```
// a.js
define(function (require, exports, module){
　　exports.a = 'hello world';
});
// b.js
define(function (require, exports, module){
    var moduleA = require('./a.js');
    console.log(moduleA.a); // 打印出：hello world
});
```

## UMD

1. 特点：

    兼容AMD和commonJS规范的同时，还兼容全局引用的方式

2. 环境：浏览器或服务器环境

3. 语法：

    无导入导出规范，只有如下的一个常规写法：
    ```
    (function (root, factory) {
        if (typeof define === 'function' && define.amd) {
            //AMD
            define(['jquery'], factory);
        } else if (typeof exports === 'object') {
            //Node, CommonJS之类的
            module.exports = factory(require('jquery'));
        } else {
            //浏览器全局变量(root 即 window)
            root.returnExports = factory(root.jQuery);
        }
    }(this, function ($) {
        //方法
        function myFunc(){};
        //暴露公共方法
        return myFunc;
    }));
    ```

### ES6模块和CommonJS模块的差异

1. `CommonJS`模块输出的是一个值的拷贝，`ES6`模块输出的是值的引用

    - `CommonJS` 模块输出的是值的拷贝，也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。

    - `JS` 引擎对脚本静态分析的时候，遇到模块加载命令`import`，就会生成一个只读引用。等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值。

2. `CommonJS`模块是运行时加载，`ES6`模块是编译时输出的接口

    - `CommonJS` 加载的是一个对象（即`module.exports`属性），该对象只有在脚本运行完才会生成。

    - 而 `ES6` 模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成。