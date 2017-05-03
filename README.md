# my-note
记录一下每天的学习心得

## 一. update log    

### 添加 Vue getting started （- 2017/03/16）


### 完善 Vue getting started （- 2017/03/17）
1. calculated props
    a. obeserve Watchers
        虽然计算属性在大多数情况下更合适，但有时也需要一个自定义的 watcher 。这是为什么 Vue 提供一个更通用的方法通过 watch 选项，来响应数据的变化。当你想要在数据变化响应时，执行异步操作或开销较大的操作，这是很有用的。

2. class and style binding

    数据绑定一个常见需求是操作元素的 class 列表和它的内联样式。因为它们都是属性 ，我们可以用v-bind 处理它们：只需要计算出表达式最终的字符串。不过，字符串拼接麻烦又易错。因此，在 v-bind 用于 class 和 style 时， Vue.js 专门增强了它。表达式的结果类型除了字符串之外，还可以是对象或数组。

    a. object grammar

    ```
    <div v-bind:class="classObject"></div>

    data: {
      isActive: true,
      error: null
    },
    computed: {
      classObject: function () {
        return {
          active: this.isActive && !this.error,
          'text-danger': this.error && this.error.type === 'fatal',
        }
      }
    }
    ```
    b. array grammar
    
    ```
    <div v-bind:class="[activeClass, errorClass]">

    data: {
      activeClass: 'active',
      errorClass: 'text-danger'
    }

    渲染为:
    <div class="active text-danger"></div>
    ```
    c. used on component
    ```
    当你在一个定制的组件上用到 class 属性的时候，这些类将被添加到根元素上面，这个元素上已经存在当你在一个定制的组件上用到 class 属性的时候，这些类将被添加到根元素上面，这个元素上已经存在的类不会被覆盖。的类不会被覆盖。
    ```
3. conditional render
4. list render

### essays (- 2017/03/17)
1. 注意在 JavaScript 中对象和数组是引用类型，指向同一个内存空间

2. (- 2017/05/3)
添加关于数组循环迭代删除算法实现


