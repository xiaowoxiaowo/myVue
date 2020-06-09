import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

/***
 * 为什么用es5函数方式来定义，不用es6类呢？
 * 因为函数方式更利于原型方法的拓展，直接在原型上定义新方法就可以，适合模块化的编程
 * es6拓展需要用继承的方式，而且需要预先定义所有的方法或变量。
 */
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
    //警告内容: Vue必须用new的方式来创建
  }
  this._init(options)
}

/***
 * 在这里挂载一些vue的原型方法
 */

initMixin(Vue)
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)

export default Vue
