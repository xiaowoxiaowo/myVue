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

/***
 * render
 * vue的_render是一个私有方法，用来把实例渲染成一个虚拟Node，定义在core/instance/render.js中
 * 在instance/lifecycle.js里的初始化里把_render方法添加到响应式依赖中，通过渲染watcher来触发updateComponent的_render方法
 */

/***
 * Virtual DOM
 * 用原生的js对象去描述一个DOM节点，vue中用VNode这样一个类去描述Virtual DOM, 定义在core/vdom/vnode.js中
 * VNode需要经过create,diff,patch等过程才能映射到真实的DOM上
 */

