# Formatting Contexts

  Formatting Contexts是页面中的一块渲染区域，它拥有一套渲染规则，决定其子元素将如何定位，以及和其它元素的关系和相互作用。

  说白了就是一个决定如何渲染元素的容器。

## BFC(Block Formatting Contexts)

### 1. BFC的概念

  BFC全称是`Block Formatting Contexts`，也就是块级元素作为父容器的渲染区域

### 2. BFC的渲染规则

  1. 内部的块级元素会在垂直方向，一个接一个地放置

  2. 块级元素垂直方向的距离由`margin`决定，属于同一个`BFC`的两个相邻的块级元素的margin会发生重叠

  3. 对于从左往右的格式化，每个元素（块级元素与行内元素）的左边缘，与包含块的左边缘相接触，
  (对于从右往左的格式化则相反)。即使包含块中的元素存在浮动也是如此，除非其中元素再生成一个BFC。

  4. BFC区域不会与浮动元素重叠。

  5. BFC是一个独立隔离的容器，容器里面的子元素和外面的元素互不影响。

  6. BFC区域计算高度是，其内部的浮动元素也参与。

### 3. BFC的触发条件 

  1. 根元素`html`

  2. `float`的值不为`none`

  3. `position`的值不为`static`或`relative`

  4. `display`的值是`inline-block、inline-flex、flex、flow-root、table-caption、table-cell`。

  5. `overflow`的值不为`visible`

### 4. BFC的应用

  1. 清除浮动

    根据BFC渲染规则的第6条（BFC区域计算高度是，其内部的浮动元素也参与。）,来解决浮动是容器高度坍塌的问题

  2. 解决上下margin边距问题

    不属于同一个BFC的两个相邻块级元素的margin就 不会发生 重叠。

  3. 实现自适应两栏布局

    由于BFC区域不会与浮动元素重叠

    ```
    .main{
      height: 100vh;
    }
    .side-bar{
      width: 20%;
      min-width: 200px;
      height: 100%;
      float: left;
      background: red;
    }
    .content{
      height: 100%;
      background: blue;
      overflow: auto;
    }
    ...
    <div class="main">
      <div class="side-bar">侧边栏</div>
      <div class="content">主体内容</div>
    </div>
    ```

## IFC(Inline Formatting contexts)

### 1. IFC的概念

  IFC的全称是Inline Formatting Contexts，也就是“内联格式化上下文”。

### 2. IFC的生成条件

  IFC的形成条件非常简单，块级元素中仅包含内联级别元素，需要注意的是当IFC中有块级元素插入时，会产生两个匿名块将父元素分割开来，产生两个IFC。

### 3. IFC的渲染规则

  1. 子元素水平方向横向排列，并且垂直方向起点为元素顶部。

  2. 子元素只会计算横向样式空间，【padding、border、margin】，垂直方向样式空间不会被计算，【padding、border、margin】。

  3. 在垂直方向上，子元素会以不同形式来对齐（vertical-align）。

  4. 能把在一行上的框都完全包含进去的一个矩形区域，被称为该行的行框（line box）。行框的宽度是由包含块（containing box）和与其中的浮动来决定。

  5. IFC中的“line box”一般左右边贴紧其包含块，但float元素会优先排列。

  6. IFC中的“line box”高度由 CSS 行高计算规则来确定，同个IFC下的多个line box高度可能会不同。

  7. 当 inline-level boxes的总宽度少于包含它们的line box时，其水平渲染规则由 text-align 属性值来决定。

  8. 当一个“inline box”超过父元素的宽度时，它会被分割成多个boxes，这些 boxes 分布在多个“line box”中。如果子元素未设置强制换行的情况下，“inline box”将不可被分割，将会溢出父元素。

### 4. IFC的应用

  1. 水平居中：当一个块要在环境中水平居中时，设置其为inline-block则会在外层产生IFC，通过text-align则可以使其水平居中。

  2. 垂直居中：创建一个IFC，用其中一个元素撑开父元素的高度，然后设置其vertical-align:middle，其他行内元素则可以在此父元素下垂直居中。

## FFC(Flex Formatting Contetxts)概念和应用

### 1. FFC的概念

  FFC的全称是`Flex Formatting Contexts`，弹性盒型模型

### 2. FFC生成的条件

  父级设置 `display: flex`或者`display: inline-flex`

### 3. FFC渲染规则

  可以看 [阮一峰的Flex 布局教程：语法篇](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html) ，讲的非常详细。

  要注意一点。生成FFC后，其子元素的float、clear和vertical-align属性将失效。

### 4. FFC的应用

  1. 自动撑开页面高度，底栏总是出现在页面底部，实现经典的`Sticky布局`

  ```
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Sticky</title>
    <style>
      body{
        margin: 0;
        padding: 0;
      }
      .container{
        display: flex;
        flex-direction: column;
        height: 100vh;
        background: black;
      }
      .content{
        flex: 1;
        background: blue;
      }
      .footer{
        flex: 0 0 200px;
        height: 200px;
        background: red;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="content">
        <ul class="list">
         <li class="item">项目</li>
         <!-- ... ... 加载更多的数据内容 -->
         <li class="item">项目</li>
        </ul>
      </div>
      <div class="footer">底部</div>
    </div>
  </body>
  </html>
  ```

  2. 经典的圣杯布局