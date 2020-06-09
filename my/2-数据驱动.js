/***
 * 数据驱动
 */

/***
 * data初始化
 * 在instance/index.js的_init()函数对vue进行初始化，_init()定义在instance/init.js里。注释内容在代码上，可以根据代码函数一步步查看，本章节只看data部分
 */


/***
 * vue挂载到页面过程
 * instance/init.js里，通过vm.$mount(vm.$options.el)挂载到页面dom中。
 * $mount定义在runtime/index.js, 带compiler的版本会在entry-runtime-with-compiler.js里对template进行编译，然后调用runtime/index.js的$mount方法，具体看代码注释
 */