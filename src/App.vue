<template>
  <div>
    <Header />
    <!-- 配置路由出口 -->
    <router-view></router-view>
    <Footer v-show="$route.meta.isShow"/>
  </div>
</template>
<script>
//引入Header与Footer非路由组件
import Header from "./components/Header";
import Footer from "./components/Footer";

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  mounted() {
    // 派发请求三级联动数据
    // 为什么写在这里：因为App组件只执行一次，性能进行优化！
    this.$store.dispatch("getCategoryList");
  },
};
</script>
<style>
</style>
