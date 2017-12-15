这次打包 `lodash` 和 一个函数文件

打开终端

`cd webpack-demo02`

`npm install` 或者 `cnpm install` 或者 `yarn install`

`webpack app/index.js dist/bundle.js`

终端会输出如下内容，证明打包成功！！

```bash

    Hash: 39683496d308241ed778
    Version: webpack 3.10.0
    Time: 394ms
        Asset    Size  Chunks                    Chunk Names
    bundle.js  544 kB       0  [emitted]  [big]  main
        [0] ./app/index.js 254 bytes {0} [built]
        [2] (webpack)/buildin/global.js 509 bytes {0} [built]
        [3] (webpack)/buildin/module.js 517 bytes {0} [built]
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

## 疑问

> 这里提出一个大大的疑问：网上有人说将三方依赖包以 `--save-dev` 和 `--save` 两种方式安装，在 `webpack` 最后打包会不一样。

> 以 `--save-dev` 形式安装，依赖包不会被打进最后的项目包，以 `--save` 形式安装的最后会被打进项目包

> 然而我在这里试过，并没有什么影响，希望大家也试试！！当然，后续我也会给出相关的解答。