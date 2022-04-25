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
### 完成登陆注册
1. 完成：
    * 注册
    * 登录
    * 通过token获取用户信息
    * 退出登录
### 完成支付相关静态组件
1. 完成：
    * （生成）订单
    * 支付
    * 支付成功
    * 订单





# 总结
## 1. 环境搭建
### 1. 创建工程
* vue2：vue init webpack 项目的名字
* vue3~4：vue create 项目名称

### 2. 脚手架目录
+ node_modules:放置项目依赖的地方
+ public:一般放置一些共用的静态资源，打包上线的时候，public文件夹里面资源原封不动打包到dist文件夹里面
+ src：程序员源代码文件夹
    - assets文件夹：经常放置一些静态资源（图片），assets文件夹里面资源webpack会进行打包为一个模块（js文件夹里面）
    - components文件夹:一般放置非路由组件（或者项目共用的组件）
    - App.vue 唯一的根组件
    - main.js 入口文件【程序最先执行的文件】
+ babel.config.js:babel配置文件
+ package.json：看到项目描述、项目依赖、项目运行指令
+ README.md:项目说明文件
### 3. 修改配置文件
1. 浏览器自动打开
```js
在package.json文件中
"scripts": {
    "serve": "vue-cli-service serve --open",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint"
},
```
2. 关闭eslint校验工具
```js
创建vue.config.js文件：需要对外暴露
module.exports = {
   lintOnSave:false,
}
```
3. src文件夹的别名的设置 
* 因为项目大的时候src（源代码文件夹）：里面目录会很多，找文件不方便，设置src文件夹的别名的好处，找文件会方便一些
```js
创建jsconfig.json文件
{
    "compilerOptions": {
        "baseUrl": "./",
        "paths": {
            "@/*": [
                "src/*"
            ]
        }
    },
    "exclude": [
        "node_modules",
        "dist"
    ]
}
```
## 2. 配置
### 1. 路由的配置
1. 项目结构
    * 确定项目结构顺序:上中下 -----只有中间部分在发生变化，中间部分应该使用的是路由组件
    * 2个非路由组件|四个路由组件
        + 两个非路由组件：Header 、Footer
        + 路由组件:Home、Search、Login（没有底部的Footer组件，带有二维码的）、Register（没有底部的Footer组件，带二维码的）
    * 创建路由组件【一般放在views|pages文件夹】
    * 配置路由，配置完四个路由组件
2. 路由的跳转
    * 路由的跳转就两种形式：
        + 声明式导航（router-link：务必要有to属性）
        + 编程式导航push||replace
    * 编程式导航更好用：因为可以书写自己的业务逻辑
3. 非路由组件使用分为几步:
* 第一步：定义
* 第二步：引入
* 第三步：注册
* 第四步:使用

### 导入依赖
1. 路由
```js
npm install --save vue-router@3
--save:可以让你安装的依赖，在package.json文件当中进行记录
``` 
2. loader
```js
npm install --save less less-loader@5
切记less-loader安装5版本的，不要安装在最新版本，安装最新版本less-loader会报错，报的错误setOption函数未定义
```


#### 要点：
1. public 和 assets文件夹区别
2. v-show与v-if区别?
    * v-show:通过样式display控制
    * v-if：通过元素上树与下树进行操作
3. 路由传参
    * params参数：路由需要占位，程序就崩了，属于URL当中一部分
    * query参数：路由不需要占位，写法类似于ajax当中query参数
    * 路由传递参数相关面试题
        1. 路由跳转传递参数（对象式写法）path是否可以结合params参数一起使用?
            + 答：不可以：不能这样书写，程序会崩掉
        2. 如何指定params参数可传可不传? 
            * 答：
                - 如果路由要求传递params参数，但是你就不传递params参数,发现一件事，URL会有问题
                - 在配置路由的时候，在占位符后面加上一个[问号]，表示params可以传递或者不传递。例：/seach/:keword?
        3. params参数可以传递也可以不传递，但是如果传递是空串,路径会出问题。如何解决？
            * 答：使用undefined。例：params:{keyword:''||undefined}
        4. 如果指定name与params配置, 但params中数据是一个"", 无法跳转，路径会出问题

        5. 路由组件能不能传递props数据?
        * 答：可以，有三种：布尔值写法、对象写法、函数写法

## 要点：
2. 组件通信-----（工作使用频率非常高、面试的时候经常出现）
* 父->子:props、插槽、ref
* 子->父：自定义事件
* 万能：vuex、$bus、pubsub

