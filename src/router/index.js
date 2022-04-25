import VueRouter from "vue-router";

//导入路由具体实现js
import routers from "@/router/routers";

// 引入仓库
import store from '@/store'

//先把VueRouter原型对象的push，先保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

//重写push|replace
//第一个参数：告诉原来push方法，你往哪里跳（传递哪些参数）
//第二个参数：成功时回调
//第三个参数：失败时回调
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    //call||apply区别
    //相同点，都可以调用函数一次，都可以篡改函数的上下文
    //不同点，call与apply传递参数：call传递参数用逗号隔开，apply方法执行，传递数组
    originPush.call(this, location, resolve, reject);
  } else {
    originPush.call(
      this,
      location,
      () => { },
      () => { }
    );
  }
};
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject);
  } else {
    originReplace.call(
      this.location,
      () => { },
      () => { }
    );
  }
};


//配置路由
let router = new VueRouter({
  routes: routers,
  //滚动行为(注意参考Vue Router V3)
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { y: 0 };
  },
});

router.beforeEach(async (to, from, next) => {
  //to:获取到要跳转到的路由信息
  //from：获取到从哪个路由跳转过来来的信息
  //next: next() 放行  next(path) 放行
  //获取仓库中的token-----可以确定用户是登录了

  let token = store.state.user.token;
  let name = store.state.user.userInfo.name
  //用户登录
  if (token) {
    //已经登录而且还想去登录------不行
    if (to.path == '/login' || to.path == '/register') {
      next("/")
    } else {
      //已经登陆了,访问的是非登录与注册
      //登录了且拥有用户信息放行
      if (name) {
        next()
      } else {
        //登陆了且没有用户信息
        //在路由跳转之前获取用户信息且放行
        try {
          await store.dispatch('getUserInfo')
          next();
        } catch (error) {
          //token失效从新登录
          await store.dispatch('userLogout')
          next('/login')
        }
      }
    }
  } else {
    // 未登录
    if (to.path == '/shopCart') {
      next("/")
    } else {
      next()
    }
  }
})

export default router
