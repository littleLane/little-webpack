## 输出（Output）

配置 `output` 选项可以控制 `webpack` 如何向硬盘写入编译文件。注意：即使可以存在多个入口起点，但只指定一个输出配置。

### 用法（Usage）

在 `webpack` 中配置 `output` 属性的最低要求是，将它的值设置为一个对象，包括以下两点：

- 1、`filename` 用于输出文件的文件名。
- 2、目标输出目录 `path` 的绝对路径。

##### webpack.config.js

```JavaScript
    const config = {
        output: {
            filename: 'bundle.js',
            path: __dirname + '/dist'
        }
    };

    module.exports = config;
```

此配置将一个单独的 bundle.js 文件输出到项目根目录下的 ./dist 目录中。

### 多个入口起点

如果配置创建了多个单独的 `"chunk"`（例如，使用多个入口起点或使用像 `CommonsChunkPlugin` 这样的插件），则应该使用占位符`(substitutions)`来确保每个文件具有唯一的名称。

```JavaScript
    {
        entry: {
            app: './src/app.js',
            search: './src/search.js'
        },
        output: {
            filename: '[name].js',
            path: __dirname + '/dist'
        }
    }

    // 写入到项目根目录下：./dist/app.js, ./dist/search.js
```

### 高级进阶

以下是使用 `CDN` 和资源 `hash` 的复杂示例：

##### config.js

```JavaScript
    output: {
        path: "/home/proj/cdn/assets/[hash]",
        publicPath: "http://cdn.example.com/assets/[hash]/"
    }
```

在编译时不知道最终输出文件的 `publicPath` 的情况下，`publicPath` 可以留空，并且在入口起点文件运行时动态设置。如果你在编译时不知道 `publicPath`，你可以先忽略它，并且在入口起点设置 `__webpack_public_path__`。

```JavaScript
    __webpack_public_path__ = myRuntimePublicPath
    // 剩余的应用程序入口
```