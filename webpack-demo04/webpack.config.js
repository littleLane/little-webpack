//导出 node.js 处理路径的 path 模块
var path = require('path');

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

    // loaders 引用
    module: {
        rules: [{
            //匹配 css 样式文件
            test: /\.css$/,

            //对于样式文件的打包引用，非要用这两个 loader 进行处理
            //如果少了 style-loader 即使打包成功了，样式也不会生效
            //如果少了 css-loader 样式文件就不会打包成功，解析不了样式文件
            use: [
                { loader: 'style-loader' },
                { loader: 'css-loader' }
            ]
        }]
    }
}
