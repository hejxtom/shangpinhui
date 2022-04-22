// 导入组件
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Search from "@/pages/Search";
import Register from "@/pages/Register";
import Detail from "@/pages/Detail";
import AddCartSuccess from "@/pages/AddCartSuccess";
import ShopCart from '@/pages/ShopCart'

export default [
  {
    path: "/home",
    component: Home,
    meta: { isShow: true },
  },
  {
    name:'login',
    path: "/login",
    component: Login,
  },
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
  {
    name: "detail",
    path: "/detail/:skuid",
    component: Detail,
    meta: { isShow: true },
  },
  {
    name: "addCartSuccess",
    path: "/addCartSuccess",
    component: AddCartSuccess,
    meta: { isShow: true },
  },
  {
    name: "shopCart",
    path: "/shopCart",
    component: ShopCart,
    meta: { isShow: true },
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/",
    redirect: "/home",
  },
];
