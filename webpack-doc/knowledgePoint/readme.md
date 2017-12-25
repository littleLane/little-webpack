## 概念

`webpack` 是一个现代 `JavaScript` 应用程序的模块打包器`(module bundler)`。当 `webpack` 处理应用程序时，它会递归地构建一个依赖关系图`(dependency graph)`，其中包含应用程序需要的每个模块，然后将所有这些模块打包成少量的 `bundle` - 通常只有一个，由浏览器加载。

它是高度可配置的，但是，在开始前你需要先理解四个核心概念：`入口(entry)`、`输出(output)`、`loader`、`插件(plugins)`。

本文档旨在给出这些概念的高度概述，同时提供具体概念的详尽相关用例。

### 入口(Entry)

`webpack` 创建应用程序所有依赖的关系图`(dependency graph)`。图的起点被称之为入口起点`(entry point)`。入口起点告诉 `webpack` 从哪里开始，并根据依赖关系图确定需要打包的内容。可以将应用程序的入口起点认为是根上下文`(contextual root)` 或 `app` 第一个启动文件。

在 `webpack` 中，我们使用 `webpack` 配置对象`(webpack configuration object)` 中的 `entry` 属性来定义入口。

接下来我们看一个最简单的例子：

##### webpack.config.js

```JavaScript
    module.exports = {
        entry: './path/to/my/entry/file.js'
    };
```

根据不同应用程序的需要，声明 entry 属性有多种方式。

[了解更多](./EntryPoints.md)

### 出口(Output)

将所有的资源`(assets)`归拢在一起后，还需要告诉 `webpack` 在哪里打包应用程序。`webpack` 的 `output` 属性描述了如何处理归拢在一起的代码`(bundled code)`。

##### webpack.config.js

```JavaScript
    const path = require('path');

    module.exports = {
        entry: './path/to/my/entry/file.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'my-first-webpack.bundle.js'
        }
    };
```

在上面的例子中，我们通过 `output.filename` 和 `output.path` 属性，来告诉 `webpack bundle` 的名称，以及我们想要生成`(emit)`到哪里。

> 你可能看到项目生成`(emitted 或 emit)`贯穿我们整个文档和插件 `API`。它是“`生产(produced)`”或“`排放(discharged)`”的特殊术语。

`output` 属性还有更多可配置的特性，但让我们花一些时间先了解一些 `output` 属性最常见的用例。

[了解更多](./Output.md)