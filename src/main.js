import Vue from "vue";
import App from "./App.vue";

//引入VueRouter
import VueRouter from "vue-router";
// 引入路由器
import router from "./router";

// 全局组件只需要引用一次，所有组件共用
// 引入三级联动组件---全局组件
import TypeNav from "@/components/TypeNav";

import Carousel from "@/components/Carousel";

import Pagination from "@/components/Pagination"


//引入仓库
import store from "./store";

// 引入mock---执行！
import "@/mock/mockServe";

//引入swiper样式
import "swiper/css/swiper.css";

// 引入API
import * as API from '@/api'

// 注册路由插件
Vue.use(VueRouter);

// 注册全局组件
Vue.component(TypeNav.name, TypeNav);

Vue.component(Carousel.name, Carousel);

Vue.component(Pagination.name, Pagination);


//测试
// import {reqGoodsInfo} from './api'
// reqGoodsInfo(23)

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  beforeCreate() {
    //全局事件总线
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API
  },
  //需要把router进行注册
  //可以让全部的组件（非路由|路由组件）都可以获取到$route|$router属性
  //$route(路由)：可以获取到路由信息（path、query、params）
  //$router:进行编程式导航路由跳转push||replace
  router,
  //在入口文件这里注册store，在每一个组件的身上都拥有一个$store这个属性
  store,
}).$mount("#app");
