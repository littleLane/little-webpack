## 将第三方框架和工具库提取出来

打开终端

`cd webpack-demo07`

`npm install` 或者 `cnpm install` 或者 `yarn install`

运行方式

`webpack` 或者 `npm run  build`

终端会输出如下内容，证明打包成功！！

```bash

    Hash: 48481d4974312956ca23
Version: webpack 3.10.0
Time: 971ms
          Asset       Size  Chunks                    Chunk Names
      bundle.js     545 kB       0  [emitted]  [big]  main
 style/main.css  136 bytes       0  [emitted]         main
style/main.less  106 bytes       0  [emitted]         main
   [0] ./app/index.js 310 bytes {0} [built]
   [2] (webpack)/buildin/global.js 509 bytes {0} [built]
   [3] (webpack)/buildin/module.js 517 bytes {0} [built]
   [4] ./style/index.css 41 bytes {0} [built]
   [5] ./less/index.less 41 bytes {0} [built]
    + 2 hidden modules
Child extract-text-webpack-plugin node_modules/_extract-text-webpack-plugin@3.0.2@extract-text-webpack-plugin/dist node_modules/_css-loader@0.28.7@css-loader/index.js!node_modules/_postcss-loader@2.0.9@postcss-loader/lib/index.js!style/index.css:
       [0] ./node_modules/_css-loader@0.28.7@css-loader!./node_modules/_postcss-loader@2.0.9@postcss-loader/lib!./style/index.css 328 bytes {0} [built]
        + 1 hidden module
Child extract-text-webpack-plugin node_modules/_extract-text-webpack-plugin@3.0.2@extract-text-webpack-plugin/dist node_modules/_css-loader@0.28.7@css-loader/index.js!node_modules/_less-loader@4.0.5@less-loader/dist/cjs.js!less/index.less:
       [0] ./node_modules/_css-loader@0.28.7@css-loader!./node_modules/_less-loader@4.0.5@less-loader/dist/cjs.js!./less/index.less 296 bytes {0} [built]
        + 1 hidden module

```

此时生成的打包文件就是最最简单、纯粹的，可以自己 `debugger` 看看打包源文件。

从上面的输出代码中可以看到

`Hash` => 此次打包的 hash 值
`Version` => 此次打包所用 webpack 的版本号
`Time` => 此次打包所用时间

接下来就是一些打包的具体信息

`Asset` => 输出文件的名称
`Size` => 输出文件的大小
`Chunks` => 打包生成的代码块
`Chunks Names` => 打包生成的代码块名称

`webpack.config.js` 配置解析详细查看该文件

## `extract-text-webpack-plugin` 配置

> new ExtractTextPlugin(options: filename | object)

<table>
    <tr>
        <th width=30%>名称</th>
        <th width=20%>类型</th>
        <th width="50%">描述</th>
    </tr>
    <tr>
        <td> `id` </td>
        <td> `{String}` </td>
        <td> 此插件实例的唯一`id`。 （仅限高级用途，默认情况下自动生成） </td>
    </tr>
    <tr>
        <td> `filename` </td>
        <td> `{String}` </td>
        <td> (必填) 生成文件的文件名。会包含 `[name]`, `[id]` 和 `[contenthash]` </td>
    <tr>
        <td> `options.allChunks` </td>
        <td> `{Boolean}` </td>
        <td> 向所有额外的 `chunk` 提取（默认只提取初始加载模块 </td>
    </tr>
    <tr>
        <td> `options.disable` </td>
        <td> `{Boolean}` </td>
        <td> 禁用插件 </td>
    </tr>
    <tr>
        <td> `options.ignoreOrder` </td>
        <td> `{Boolean}` </td>
        <td> 禁用顺序检查 (对 `CSS Modules` 有用!), 默认 `false` </td>
    </tr>
</table>

- `[name]` chunk 的名称
- `[id]` chunk 的数量
- `[contenthash]` 提取文件根据内容生成的哈希

> 警告: `ExtractTextPlugin` 对 每个入口 `chunk` 都生成对应的一个文件, 所以当你配置多个入口 chunk 的时候，你必须使用 `[name]`, `[id] or [contenthash]`

## `#extract`

> ExtractTextPlugin.extract(options: loader | object)

从一个已存在的加载器 `(loader)` 中创建一个 提取 `(extracting)` 加载器。支持这些加载器类型： `{ loader: [name]-loader -> {String}, options: {} -> {Object} }`.


<table>
    <tr>
        <th width=30%>名称</th>
        <th width=20%>类型</th>
        <th width="50%">描述</th>
    </tr>
    <tr>
        <td> `options.use` </td>
        <td> `{String}/{Array}/{Object}` </td>
        <td> (必填), 加载器 `(Loader)`, 被用于将资源转换成一个输出的 `CSS` 模块 </td>
    </tr>
    <tr>
        <td> `options.fallback` </td>
        <td> `{String}/{Array}/{Object}` </td>
        <td> 加载器 `(例如 'style-loader')`, 应用于当 `css` 没有被提取(也就是一个额外的 `chunk`，当 `allChunks: false)` </td>
    <tr>
    <tr>
        <td> `options.publicPath` </td>
        <td> `{String}` </td>
        <td> 对加载器的 `publicPath` 配置重写 </td>
    <tr>
</table>

注意：使用 `postcss-loader` 依赖包时，要在项目的根目录建 `postcss.config.js` 配置文件，打包才能成功，否则终端会报相关配置文件不存在的错误。

## 打包详解

项目中引入了 `loash` 和 `moment` 两个 `js` 工具库，当直接在终端运行 `webpack` 或者 `npm run build` 后，再去查看生成的 `bundle.js` 文件，发现我们引入的两个工具库都被打包进去了。这样的打包方式不明智的，因为第三方工具库是相对固定不变的，我们希望利用浏览器的缓存机制将这些工具库缓存起来，这样就会很好的优化加载。还有就是我们在开发时如果改动了 `index.js` 文件，其实文件改动是很小的，但是每次都要重新打包生成 `bundle.js` 文件，其实里面的代码改动量是很小的，这样就得不偿失了。

### 解决方案

- 1、重命名 `webpack.config.js1` 为 `webpack.config.js` 进行打包，此时在 `dist` 目录会生成类似 `6f06133dc91680324acd.vendor.js` 和 `801fd8fd7efaf07bafa0.main.js` 的文件，但是这两个文件里面都包含 `moment` 的代码，显然这不是我们想要的

- 2、重命名 `webpack.config.js2` 为 `webpack.config.js` 进行打包，此时在 `dist` 目录会生成类似 `6f06133dc91680324acd.vendor.js` 和 `801fd8fd7efaf07bafa0.main.js` 的文件，`vendor.js` 文件里面包含 `moment` 的代码，而 `main.js` 文件不包括，显然这就是我们想要的，但是这里只是对 `moment` 工具库做了处理，如果项目中引入了多个第三方工具库，怎么一起处理呢？

- 3、重命名 `webpack.config.js3` 为 `webpack.config.js` 进行打包，此时在 `dist` 目录会生成类似 `6f06133dc91680324acd.vendor.js` 和 `801fd8fd7efaf07bafa0.main.js` 的文件，`vendor.js` 文件里面包含 `moment` 和 `lodash` 的代码，而 `main.js` 文件不包括，显然这就是我们想要的。但是还有一个问题不知道大家注意到了没有，那就是在每次项目打包的时候，生成的 `vendor.js` 拼接的 `chunkhash` 都变了，这样我们都不能从浏览器缓存中获益了

- 4、重命名 `webpack.config.js4` 为 `webpack.config.js` 进行打包，此时在 `dist` 目录会生成类似 `6f06133dc91680324acd.vendor.js`、`5dff17e4514ac25f6c6f.manifest.js` 和 `801fd8fd7efaf07bafa0.main.js` 的文件.这里的问题在于，每次构建时，`webpack` 生成了一些 `webpack runtime` 代码，用来帮助 `webpack` 完成其工作。当只有一个 `bundle` 的时候，`runtime` 代码驻留在其中。但是当生成多个 `bundle` 的时候，运行时代码被提取到了公共模块中，在这里就是 `vendor` 文件。
为了防止这种情况，我们需要将运行时代码提取到一个单独的 `manifest` 文件中。尽管我们又创建了另一个 `bundle`，其开销也被我们在 `vendor` 文件的长期缓存中获得的好处所抵消。