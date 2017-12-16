## First Simple Demo

一个最简单的 `webpack` 打包的实例。

打开终端

cd webpack-demo01

npm install 或者 cnpm install 或者 yarn install

webpack app/index.js dist/bundle.js

终端会输出如下内容，证明打包成功！！

```bash

    Hash: 1e625720936bb7e51000
    Version: webpack 3.10.0
    Time: 41ms
        Asset     Size  Chunks             Chunk Names
    bundle.js  2.47 kB       0  [emitted]  main
        [0] ./app/index.js 1 bytes {0} [built]

```

此时生成的打包文件就是最最简单、纯粹的，可以自己 `debugger` 看看打包源文件。