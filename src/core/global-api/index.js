/* @flow */

/***
 * 在这里挂载一些vue的静态方法
 */

import config from '../config'
import { initUse } from './use'
import { initMixin } from './mixin'
import { initExtend } from './extend'
import { initAssetRegisters } from './assets'
import { set, del } from '../observer/index'
import { ASSET_TYPES } from 'shared/constants'
import builtInComponents from '../components/index'
import { observe } from 'core/observer/index'

import {
  warn,
  extend,
  nextTick,
  mergeOptions,
  defineReactive
} from '../util/index'

export function initGlobalAPI (Vue: GlobalAPI) {
  // config
  const configDef = {}
  configDef.get = () => config
  if (process.env.NODE_ENV !== 'production') {
    configDef.set = () => {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      )
    }
  }
  /***
   * 挂载config配置项
   */
  Object.defineProperty(Vue, 'config', configDef)

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.

  /***
   * 挂载util方法，变动较大，不推荐使用
   */
  Vue.util = {
    warn,
    extend,
    mergeOptions,
    defineReactive
  }

  Vue.set = set
  Vue.delete = del
  Vue.nextTick = nextTick

  Vue.options = Object.create(null)

  /***
   * 给Vue.options初始化component,directive,filter。因为vue初始化时没有这些，所以一开始为空
   */
  ASSET_TYPES.forEach(type => {
    Vue.options[type + 's'] = Object.create(null)
  })

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue

  /***
   * 引入keep-alive组件
   */
  extend(Vue.options.components, builtInComponents)

  /***
   * 挂载use，mixin,extend方法
   */
  initUse(Vue)
  initMixin(Vue)
  initExtend(Vue)
  /***
   * 挂载component,directive,filter方法
   */
  initAssetRegisters(Vue)
}
