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

/***
 * createElement
 * vue中使用createElement方法来创建VNode，定义在vdom/create-element.js中
 *
 */

/***
 * update
 * 被调用的时机有两个，一个是首次渲染，一个是数据更新的时候（这一章只分析首次渲染的场景）
 * _update定义在instance/lifecycle.js中
 *_update主要就是调用了vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false),这里的__patch__就是调用了vdom/patch.js里的createPatchFunction方法
 *
 */

/***
 * 总结
 * data初始化调用了_init()方法，这个方法定义在instance/init.js，在这里把所有的配置加到了$options上，并初始化了各种内容，data在initState方法里进行初始化
 * 通过defineProperty属性给vm监控了data属性的set和get
 *
 *
 * vue挂载到页面过程
 * 通过web/index.js里定义的$mount,里面调用mountComponent方法,里生成了一个updateComponent = () => {vm._update(vm._render(), hydrating)}，这是视图更新的
 * _update方法，然后加到渲染watcher的回调函数中（初始化的时候会调用一次，渲染出页面视图），后续当数据被读取到的时候，都会调用这个_update方法来刷新视图
 *
 *
 * createElement
 * 通过_createElement生成一个VNode对象,这里会把children参数下变成一维数组（当编译 slot、v-for时需要）
 *
 *
 * update
 * 使用函数柯里化最终调取了createPatchFunction方法,通过方法里的createElm函数，在里面通过createChildren函数进行递归，从上往下递归，从下往上进行appendChild渲染
 * 从下往上通过insert插入到相应的父节点当中,把VNode渲染到真实的dom上。最后通过removeVnodes删除老的父节点，例如#app
 */