## 代码分割 - 使用 `require.ensure`

打开终端

`cd webpack-demo08`

`npm install` 或者 `cnpm install` 或者 `yarn install`

运行方式

`webpack` 或者 `npm run  build`

### `require.ensure()`

`webpack` 在编译时，会静态地解析代码中的 `require.ensure()`，同时将模块添加到一个分开的 `chunk` 当中。这个新的 chunk 会被 `webpack` 通过 `jsonp` 来按需加载。

语法如下：

```
    require.ensure(dependencies: String[], callback: function(require), chunkName: String)
```

#### 依赖 `dependencies`

这是一个字符串数组，通过这个参数，在所有的回调函数的代码被执行前，我们可以将所有需要用到的模块进行声明。

#### 回调 `callback`

当所有的依赖都加载完成后，`webpack`会执行这个回调函数。`require` 对象的一个实现会作为一个参数传递给这个回调函数。因此，我们可以进一步 `require()` 依赖和其它模块提供下一步的执行。

#### `chunk`名称 `chunkName`

`chunkName` 是提供给这个特定的 `require.ensure()` 的 `chunk` 的名称。通过提供 `require.ensure()` 不同执行点相同的名称，我们可以保证所有的依赖都会一起放进相同的 文件束`(bundle)`。


> 通过执行这个项目的 `webpack` 构建，我们发现 `webpack` 创建了2个新的文件束， `bundle.js` 和 `0.bundle.js`。

> `entry.js` 和 `a.js` 被打包进 `bundle.js`.

> `b.js` 被打包进 `0.bundle.js`.

> 注：`require.ensure` 内部依赖于 `Promises`。 如果你在旧的浏览器中使用 `require.ensure` 请记得 去 `shim Promise`.

这次的 `demo` 稍微复杂一点，在代码分块这块还是应用得比较多的，大家可以深入研究一下。还有就是注意的点也很多。

1、在 `require.ensure` 时设置了代码分块的名称，那么在 `webpack.config.js` 里面也应该配有相应的 `chunkFilename: '[name].js'`,否者分块的配置是不起作用的。

2、在  `webpack.config.js` 里面必须指定文件的目录，形如 `publicPath: './dist/'`，否者在 jsonp 请求加载文件时引入的文件路径就是错误的

3、在 `entry.js` 里面的 `test3` 设置了依赖按需加载，形如

```
    require.ensure(['./a.js'], function(require){
        require('./b.js');
    })
```

此时只有 `b.js` 是加载执行的，依赖文件 `a.js` 要引入后才能加载执行。
