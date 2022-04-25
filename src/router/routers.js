// 导入组件
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Search from "@/pages/Search";
import Register from "@/pages/Register";
import Detail from "@/pages/Detail";
import AddCartSuccess from "@/pages/AddCartSuccess";
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'

export default [
  // 首页
  {
    path: "/home",
    component: Home,
    meta: { isShow: true },
  },
  // 登录
  {
    name: 'login',
    path: "/login",
    component: Login,
  },
  // 搜索
  {
    name: "search",
    path: "/search/:keyword?",
    component: Search,
    meta: { isShow: true },
    props: ($route) => {
      return {
        keyword: $route.params.keyword,
      };
    },
  },
  // 商品详情页
  {
    name: "detail",
    path: "/detail/:skuid",
    component: Detail,
    meta: { isShow: true },
  },
  // 添加购物车成功
  {
    name: "addCartSuccess",
    path: "/addCartSuccess",
    component: AddCartSuccess,
    meta: { isShow: true },
  },
  // 购物车
  {
    name: "shopCart",
    path: "/shopCart",
    component: ShopCart,
    meta: { isShow: true },
  },
  // 注册
  {
    path: "/register",
    component: Register,
  },
  // （生成）订单
  {
    name: 'trade',
    path: '/trade',
    component: Trade
  },
  // 支付
  {
    name: 'pay',
    path: '/pay',
    component: Pay
  },
   // 支付成功
   {
    name: 'paySuccess',
    path: '/paySuccess',
    component: PaySuccess
  },
  // 订单
  {
    name: 'center',
    path: '/center',
    component: Center
  },
  // 重定向到首页
  {
    path: "/",
    redirect: "/home",
  },
];
