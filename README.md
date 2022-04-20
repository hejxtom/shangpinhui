# shangpinhui

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 第一次提交
1. 完成：
    * 首页、搜索页

 ### 完成商品详情页静态组件
 1. 完成：
    * 商品详情页静态组件
    * 路由模块化（routers.js）
    * （在router/index.js）加入滚动行为（scrollBehavior）

### 完成Detail组件的动态数据渲染(导航数据、商品数据)
1. 完成
    * Detail组件的vuex:
        1. 写请求的地址api
        2. 完成vuex三部曲（actions、state、mutations）
        3. 挂载时发送请求
    * Detail组件的数据渲染：
        * *注意点：
            1. vuex数据仓库需要写成的 state.goodsInfo.categoryView || {}
### 完成Detail组件的动态数据渲染(售卖属性、子组件)
1. 完成：
    * 售卖属性、子组件动态数据渲染
    * 放大镜（重要）、商品数量
    * 商品详情页开发完成
### 完成加入购物车
1. 完成：
    * 点击加入购物车后，发送请求
        + 注意：async+await的配合使用
        + 注意：此步骤发送请求后，要返回成功或者失败的标志（失败抛出异常）
    * 如何传递对象到其他页面？
        - 路由的query参数（不推荐）
        - 会话存储 
            * 注意：本地存储 vs 会话存储
### 完成购物车静态页面
1. 完成：
    * 购物车静态页面
    * 动态数据展示
    * 商品数量更改
### 完成购物车业务逻辑(未登录)
1. 完成：
    * 商品状态修改
    * 商品删除（单个、全部）
    * 商品数量
### 完成登录注册静态页面
1. 完成：
    * 登录注册静态页面
    * 登录页面图片引用：url(~@/assets/icons.png) no-repeat -10px -201px;
# 总结

