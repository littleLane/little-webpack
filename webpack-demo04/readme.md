## 利用 `webpack.config.js` 配置文件打包 `lodash`、样式文件 和 一个函数文件

打开终端

`cd webpack-demo04`

`npm install` 或者 `cnpm install` 或者 `yarn install`

运行方式

`webpack` 或者 `npm run  build`

终端会输出如下内容，证明打包成功！！

```bash

    Hash: 29f7cb34e3f5c13dd10f
    Version: webpack 3.10.0
    Time: 586ms
        Asset    Size  Chunks                    Chunk Names
    bundle.js  561 kB       0  [emitted]  [big]  main
        [0] ./app/index.js 282 bytes {0} [built]
        [2] (webpack)/buildin/global.js 509 bytes {0} [built]
        [3] (webpack)/buildin/module.js 517 bytes {0} [built]
        [4] ./style/index.css 1.09 kB {0} [built]
        [5] ./node_modules/_css-loader@0.28.7@css-loader!./style/index.css 271 bytes {0} [built]
            + 4 hidden modules

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