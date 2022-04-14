import VueRouter from "vue-router";

//导入路由具体实现js
import routers from "@/router/routers";

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
      () => {},
      () => {}
    );
  }
};
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject);
  } else {
    originReplace.call(
      this.location,
      () => {},
      () => {}
    );
  }
};
//配置路由
export default new VueRouter({
  routes: routers,
  //滚动行为(注意参考Vue Router V3)
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { y: 0 };
  },
});
