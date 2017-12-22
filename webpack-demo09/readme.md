## 代码分割 - 使用 `require.ensure`

打开终端

`cd webpack-demo08`

`npm install` 或者 `cnpm install` 或者 `yarn install`

运行方式

`webpack` 或者 `npm run  build`

### `devtool`

为了生成 `sourceMap` 这里 `webpack` 给出了 `7` 种配置方案。

- `eval` 文档上解释的很明白，每个模块都封装到 `eval` 包裹起来，并在后面添加 `//# sourceURL`

- `source-map` 这是最原始的 `source-map` 实现方式，其实现是打包代码同时创建一个新的 `sourcemap` 文件， 并在打包文件的末尾添加 `//# sourceURL` 注释行告诉 `JS` 引擎文件在哪儿

- `hidden-source-map` 文档上也说了，就是 `soucremap` 但没注释，没注释怎么找文件呢？貌似只能靠后缀，譬如 `xxx/bundle.js` 文件，某些引擎会尝试去找 `xxx/bundle.js.map`

- `inline-source-map` 为每一个文件添加 `sourcemap` 的 `DataUrl`，注意这里的文件是打包前的每一个文件而不是最后打包出来的，同时这个 `DataUrl` 是包含一个文件完整 `souremap` 信息的 `Base64` 格式化后的字符串，而不是一个 `url`。

- `eval-source-map` 这个就是把 `eval` 的 `sourceURL` 换成了完整 `souremap` 信息的 `DataUrl`

- `cheap-source-map` 不包含列信息，不包含 `loader` 的 `sourcemap`，（譬如 `babel` 的 `sourcemap`）

- `cheap-module-source-map` 不包含列信息，同时 `loader` 的 `sourcemap` 也被简化为只包含对应行的。最终的 `sourcemap` 只有一份，它是 `webpack` 对 `loader` 生成的 `sourcemap` 进行简化，然后再次生成的。

> `webpack` 不仅支持这 `7` 种，而且它们还是可以任意组合的，就如文档所说，你可以设置 `souremap` 选项为 `cheap-module-inline-source-map`。

这么多种配置，到底哪种方案是最好的呢？

1、大部分情况我们调试并不关心列信息，而且就算 `sourcemap` 没有列，有些浏览器引擎（例如 v8） 也会给出列信息，所以我们使用 `cheap` 模式可以大幅提高 `souremap` 生成的效率。

2、使用 `eval` 方式可大幅提高持续构建效率，参考 `webapck devtool` 文档 下方速度对比表格，这对经常需要边改边调的前端开发而言，非常重要！

3、使用 `module` 可支持 `babel` 这种预编译工具（在 `webpack` 里做为 `loader` 使用）。

4、`eval-source-map` 使用 `DataUrl` 本身包含完整 `sourcemap` 信息，并不需要像 `sourceURL` 那样，浏览器需要发送一个完整请求去获取 `sourcemap` 文件，这会略微提高点效率

由于上述这些理由，总结出 `cheap-module-eval-source-map` 绝大多数情况下都会是最好的选择

> 大家可以改变 devtool 的配置，看看会生成什么样的代码文件。

最后感谢 https://segmentfault.com/a/1190000004280859 提供了参考！！！