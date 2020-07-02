# CSS 中的 float

## 浮动的原始意义

> 浮动出现的意义其实只是用来让文字环绕图片而已，仅此而已。而我们目前用浮动实现页面布局本不是浮动该干的事情。 [出自](https://www.zhangxinxu.com/wordpress/2010/01/css-float%e6%b5%ae%e5%8a%a8%e7%9a%84%e6%b7%b1%e5%85%a5%e7%a0%94%e7%a9%b6%e3%80%81%e8%af%a6%e8%a7%a3%e5%8f%8a%e6%8b%93%e5%b1%95%e4%b8%80/)

## 浮动的本质

1. 包裹性

  实现宽度自适应按钮，让其宽度随按钮包含的文字大小撑开，可以使用`display: inline-block`，同样我们也可以利用浮动包裹性的特点，使用`float:left`实现，如此看来，在包裹性这一层面上，**浮动**等同于带有方向性的**行内块元素**

  ```
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>宽度自适应按钮两种实现方式</title>
    <style>
      body {
        margin: 0;
      }
      .main {
        width: 400px;
        height: 300px;
        background: black;
      }
      .btn {
        display: inline-block;
      }
      .bfc {
        overflow: auto;
        margin-top: 10px;
      }
      .btn1 {
        float: left;
      }
      .label {
        display: block;
        padding: 0 13px 0 13px;
        line-height: 26px;
        color: red;
        background: white;
        border: 1px solid red;
      }
    </style>
  </head>
  <body>
    <div class="main">
      <a class="btn"><span class="label">inline-block</span></a>
      <div class="bfc">
        <a class="btn1"><span class="label">float</span></a>
      </div>
    </div>
  </body>
  </html>
  ```

  2. 破坏性

  >文字之所以会环绕被float的图片，究其根本是因为float破坏了正常的**line boxes**

  ## 浮动产生的影响及如何避免

  1. 让`父容器高度塌陷`

  ```
  .left{
    width: 100px;
    height: 100px;
    float: left;
    background: red;
  }
  .right{
    width: 100px;
    height: 100px;
    float: left;
    background: blue;
  }
  ...
  <div class="container">
    <div class="left"></div>
    <div class="right"></div>
  </div>
  ```
  上述左右两个`div`被设置了float属性，会导致父级容器container的高度塌陷为`0`，进而影响父容器后续其他元素的排列情况

  2. 如何清除浮动带来的影响

  - 给父容器设置固定高度

    既然会使父容器高度塌陷，给其设置固定高度不就直接解决问题，但是这么一来，缺少灵活性，在父容器要求不定高的场景下无法使用

  - 使用伪元素`::after`，设置`clear: both;`

    `clear`是css中的定位属性，规定哪一侧不允许其他浮动元素，`clear: both;`就是规定在左右两侧均不允许浮动元素。

    由于只作用于块级元素上，所以要设置`display: block;`

    ```
    .container{
      width: 300px;
      border: 2px solid green;
    }
    .container::after{
      content: '';
      display: block;
      clear: both;
    }
    .left{
      width: 100px;
      height: 100px;
      float: left;
      background: red;
    }
    .right{
      width: 100px;
      height: 100px;
      float: left;
      background: blue;
    }
    ```
  
  3. 在父级容器中创建BFC，闭合浮动

    利用**BFC渲染规则**，其是一个隔离独立的容器，容器里面的子元素和外面的元素互不影响，其内部的浮动元素参与其高度计算

    ```
    .container{
      overflow: auto;
    }
    .left{
    width: 100px;
    height: 100px;
    float: left;
    background: red;
    }
    .right{
      width: 100px;
      height: 100px;
      float: left;
      background: blue;
    }
    ```