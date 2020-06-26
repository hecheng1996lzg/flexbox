import Router from 'vue-router'

// 1. 定义 (路由) 组件。
// 可以从其他文件 import 进来
import Relativity from '../components/FlexContainerAndFlexItem/Relativity'
import FlexContainerAndFlexItem from '../components/FlexContainerAndFlexItem/FlexContainerAndFlexItem'

import AlignItems from '../components/Container/AlignItems'
import FlexDirection from '../components/Container/FlexDirection'
import JustifyContent from '../components/Container/JustifyContent'
import MainAxisAndCrossAxis from '../components/Container/MainAxisAndCrossAxis'

import FlexGrow from "../components/Item/FlexGrow";
import FlexShrink from "../components/Item/FlexShrink";
import Flex from "../components/Item/Flex";

// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。
const routes = [
  {path: '/', redirect: '/flexContainerAndFlexItem'},
  {path: '/flexContainerAndFlexItem', component: FlexContainerAndFlexItem},
  {path: '/relativity', component: Relativity},

  {path: '/mainAxisAndCrossAxis', component: MainAxisAndCrossAxis},
  {path: '/flexDirection', component: FlexDirection},
  {path: '/justifyContent', component: JustifyContent},
  {path: '/alignItems', component: AlignItems},

  {path: '/flexGrow', component: FlexGrow},
  {path: '/flexShrink', component: FlexShrink},
  {path: '/flex', component: Flex},
]

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
export default new Router({
  routes // (缩写) 相当于 routes: routes
})

