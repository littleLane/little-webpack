//导出 node.js 处理路径的 path 模块
const path = require('path');
const webpack = require('webpack');

//导出配置文件对象
module.exports = {
    //定义入口文件，文件路径是相对 webpack.config.js 的
    entry: './app/index.js',

    //定义输出文件
    output: {
        //文件的名字为 bundle.js
        filename: 'bundle.js',

        //设置输出文件存放的路径，利用 path.resolve 解析，__dirname 指的是 webpack.config.js 当前目录
        //大致意思是在 webpack.config.js 所在目录新建一个 dist 目录，并将生成的 bundle.js 存放在生成的 dist 目录下
        path: path.resolve(__dirname, 'dist')
    },

    //配置 devtool 生成不同类型的 sourceMap，其详细解释和配置见 readme
    devtool: '#source-map',

    //利用插件将样式单独输出到一个文件
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            sourceMap: true,
            parallel: true
        })
    ]
}
