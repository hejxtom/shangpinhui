// 导入组件
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Search from "@/pages/Search";
import Register from "@/pages/Register";
import Detail from "@/pages/Detail";

export default [
  {
    path: "/home",
    component: Home,
    meta: { isShow: true },
  },
  {
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
