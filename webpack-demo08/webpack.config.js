var path = require('path');

module.exports = function(env){
    return {
        entry: './app/entry.js',
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, './dist'),

            //注意：这里这个一定要配打包生成的目录，否则在加载时就会报错
            publicPath: './dist/',

            //配置分块的文件
            chunkFilename: '[name].js'
        }
    }
}