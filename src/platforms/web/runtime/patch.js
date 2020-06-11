/* @flow */

import * as nodeOps from 'web/runtime/node-ops'
import { createPatchFunction } from 'core/vdom/patch'
import baseModules from 'core/vdom/modules/index'
import platformModules from 'web/runtime/modules/index'

// the directive module should be applied last, after all
// built-in modules have been applied.
/***
 * 2.数据驱动 - update
 * platformModules是web端属性
 * baseModules是vue自己创建的属性
 */
const modules = platformModules.concat(baseModules)

/***
 * 2.数据驱动 - update
 * 通过createPatchFunction返回给patch一个函数
 * nodeOps是一些操作dom的方法
 * modules是一些操作dom属性的方法
 */

/***
 * 2.数据驱动 - update
 * 为什么要用createPatchFunction返回一个patch方法呢？
 * 使用函数柯里化，把nodeOps这种跟平台相关的参数跟功能参数分离，减少代码耦合，提高代码整洁度
 * 返回一个patch函数出来，通过闭包将里面用到的这些平台相关参数保存起来，以后每次调用patch都可以获取到这些参数
 */
export const patch: Function = createPatchFunction({ nodeOps, modules })
