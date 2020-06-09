/***
 * 源码介绍
 */

/***
 * vue是用rollup编译的,rollup类似webpack，不过rollup只对js类的内容进行编译，所以更加的轻量，适合打包js库
 */

/***
 * Runtime only和Runtime + compiler版本有什么区别
 *
 * compiler会对js里的template进行编译，Runtime only不会对template进行编译(.vue文件是通过webpack的vue-loader进行编译的)
 */

//这是需要compiler来进行编译的
new Vue({
  template: `<div>{{ hi }}</div>`
})

//如果是render，不需要
new Vue({
  render(h) {
    return h('div', this.hi)
  }
})

/***
 * vue入口，因为编译的时候是用了platforms/web/entry-runtime-with-compiler文件，从里面的Vue层层向上溯源，找到Vue定义在core/instance/index.js里
 *
 * vue在instance/index.js里挂载了原型方法，在global-api/index.js挂载了静态方法
 */