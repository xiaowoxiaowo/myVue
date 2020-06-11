/***
 * 组件化
 */

/***
 * cteateComponent
 * 在render时候的_createElement方法调用，当rendei传入的createElement参数是组件的时候调用cteateComponent方法（vdom/create-element.js）
 * cteateComponent定义在vdom/create-component.js
 *
 *
 * 总结
 * cteateComponent先使用vue.extend，创建一个继承Vue的“子类”。然后通过installComponentHooks安装一些组件钩子，最后生成一个组件的VNode
 * 注意，组件VNode的children是空,componentOptions有相关的数据
 * 给组件定义了一个_Ctor属性来缓存创建的子类Sub，如果下次还是通过相同cid的Vue来extend组件，会直接从缓存里读取
 */

/***
 * patch
 * 组件patch也是调用vdom/patch.js里的createElm方法
 *
 *
 * 总结
 * 父组件patch递归调用createElm(patch.js)方法，当有组件存在时，会运行createComponent(patch.js)方法
 * 在createComponent方法里运行上面installComponentHooks安装的init(create-component.js)函数
 * 在里面运行createComponentInstanceForVnode(vnode,activeInstance)方法(定义在create-component.js),vnode是父的vnode,activeInstance是父的vm实例。
 * 然后把参数带入这个新的构造器当中new vnode.componentOptions.Ctor(options),Ctor是render的时候继承的一个类。所以会执行Vue原型上的_init()方法。
 * 在_init()里，因为是组件，所以用initInternalComponent(定义在instance/init.js)来合并配置项
 *
 * opts = vm.$options
 * const parentVnode = options._parentVnode
 * opts.parent = options.parent
 * opts._parentVnode = parentVnode
 * initInternalComponent通过上面几行，来给vm.$options设置占位符vnode和父组件的vm实例，然后执行_init()里的initLifecycle(定义在instance/lifecycle.js)方法
 *
 * 通过vm.$options设置的占位符vnode和父组件的vm实例给父组件的$children数组push当前子组件vm，并将子组件与父组件建立关系。完毕之后结束，继续执行init(create-component.js)函数
 *
 * 手动把子组件挂载到占位符vnode的元素上，child.$mount(hydrating ? vnode.elm : undefined, hydrating)，执行mount的mountComponent（定义在instance/lifecycle.js）方法
 *
 * 定义了一个子组件的渲染watcher,调用子组件的vm._update(vm._render(), hydrating)方法
 *
 * 在子组件的render方法里，我们可以从vm.$options取到_parentVnode（占位符vnode），用来给当前组件的vm.$vnode和vnode.parent赋值，render完成之后，调用update方法
 *
 * 在update里vm._vnode = vnode保存子组件的渲染vnode，activeInstance = vm变成子组件vm，调用子组件的__patch__方法，这时候传入的vm.$el是空,再次patch
 *
 * 在patch里调createElm(vnode, insertedVnodeQueue),第三个参数为空。在createElm递归创建元素,但是如果是组件，第三个参数parentElm是空所以insert不会执行，创建完毕
 *
 * _update()完毕，继续执行组件的createComponent(patch.js)方法,调用initComponent(patch.js)方法vnode.elm = vnode.componentInstance.$el给vnode.elm赋值子组件父元素
 *
 * 然后执行insert(parentElm, vnode.elm, refElm)方法将子组件插入父组件的dom，
 *
 *
 * activeInstance为当前激活的vm实例，在子组件初始化的时候当做父组件的vm传入，用来构建父子组件关系，比如$children,$parent的赋值
 * vm.$vnode是组件的占位vnode,就是组件的父元素的根目录的元素, 子组件的render方法里被赋值，在子组件patch的时候，知道子元素应该插入到哪个父元素中
 * vm._vnode是组件的渲染vnode, 子组件的update方法里被赋值
 * 嵌套组件的插入顺序是先子后父
 */