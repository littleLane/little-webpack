//test1 普通测试
require('./a');
require.ensure([], function(require){
    require('./b');
})

//test2 配置一个分块的名称为 testBundle
// require('./a');
// require.ensure([], function(require){
//     require('./b');
// }, 'testBundle')

//test3 设置依赖按需加载，此时 b.js 是直接执行的，要想 a.js 也执行，必须引入
// require.ensure(['./a.js'], function(require){
//     require('./b.js');
// })