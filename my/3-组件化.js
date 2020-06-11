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

