利用 `extract-text-webpack-plugin` 插件启动多个提取实例将多个样式文件分开提取

插件 `github `地址 https://github.com/webpack-contrib/extract-text-webpack-plugin

打开终端

`cd webpack-demo06`

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