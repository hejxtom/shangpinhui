<template>
  <!-- 三级联动组件:注册为全局组件 -->
  <div class="type-nav">
    <div class="container">
      <!-- 事件的委派|事件代理 -->
      <div @mouseleave="leaveShow" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <transition name='sort'>
          <div class="sort" v-show="show">
            <div class="all-sort-list2" @click="goSearch">
              <!-- 一级目录 -->
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
              >
                <h3
                  @mouseenter="changeIndex(index)"
                  :class="{ cur: currentIndex === index }"
                >
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                </h3>

                <div
                  class="item-list clearfix"
                  :style="{
                    display: currentIndex === index ? 'block' : 'none',
                  }"
                >
                  <div class="subitem">
                    <!-- 二级目录 -->
                    <dl
                      class="fore"
                      v-for="(c2, index) in c1.categoryChild"
                      :key="c2.categoryId"
                    >
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em
                          v-for="(c3, index) in c2.categoryChild"
                          :key="c3.categoryId"
                        >
                          <a
                            :data-categoryName="c1.categoryName"
                            :data-category3Id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                    <!-- /二级目录 -->
                  </div>
                </div>
              </div>
              <!-- /一级目录 -->
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
//引入lodash:是把lodash全部封装好的函数全都引入进来了
//按需引入：只是引入节流函数，其他的函数没有引入（模块），这样做的好处是，当你打包项目的时候体积会小一些
import throttle from "lodash/throttle.js";
export default {
  name: "TypeNav",
  data() {
    return {
      currentIndex: -1, //控制三级目录
      show: true,
    };
  },
  mounted() {
    //隐藏三级联动，挂载即判断
    if (this.$route.path != "/home") {
      this.show = false;
    }
  },
  //计算属性
  computed: {
    ...mapState({
      categoryList: (state) => {
        return state.home.categoryList.filter((c, index) => {
          //只要15条
          return index < 15;
        });
      },
    }),
  },
  methods: {
    //用于修改组件实例身上的currentIndex的属性值
    //当用户鼠标移入到h3身上的时候就会立即出发一次
    changeIndex: throttle(function (index) {
      //修改当前currentIndex索引值
      //函数节流:在50MS(规定)时间之内只能执行一次
      this.currentIndex = index;
    }, 50),
    //进行路由跳转的回调函数
    goSearch(event) {
      //event.tartget：获取到的是触发事件的元素（div、h3、a、dl）
      let node = event.target;
      //给a标签添加自定义属性data-categoryName,全部的字标签当中只有a标签带有自定义属性，别的标签名字----dataset纯属扯淡
      let { categoryname, category1id, category2id, category3id } =
        node.dataset;
      //第二个问题解决了：点击的到底是不是a标签（只要这个标签身上带有categoryname）一定是a标签
      if (categoryname) {
        let loction = { name: "search" };
        let query = { categoryName: categoryname };

        //一定是a标签：一级目录
        if (category1id) {
          query.category1id = category1id;
        } else if (category2id) {
          query.category2id = category2id;
        } else {
          query.category3id = category3id;
        }

        //动态给location配置对象添加query属性
        loction.query = query;
        //如果有params参数，需要带上
        if(this.$route.params){
          // 传递params参数
          loction.params=this.$route.params
        }

        //路由跳转
        this.$router.push(loction);
      }
    },
    //当鼠标移入的时候，让商品分类列表进行展示
    enterShow() {
      if (this.$route.path != "/home") {
        this.show = true;
      }
    },
    //当鼠标离开的时候，让商品分类列表进行隐藏
    leaveShow() {
      this.currentIndex = -1;
      if (this.$route.path != "/home") {
        this.show = false;
      }
    },
  },
};
</script>

<style lang="less" scoped>
a {
  cursor: pointer;
}
a:hover {
  text-decoration: underline;
}
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
              text-decoration: none;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;
                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }
        .cur {
          background-color: #999d9c;
        }
      }
    }
    //过渡动画的样式
    //过渡动画开始状态（进入）
    .sort-enter{
      height: 0px;
    }
    // 过渡动画结束状态（进入）
    .sort-enter-to{
      height: 461px;
    }
     // 定义动画时间、速率
    .sort-enter-active {
      transition: all 0.3s linear;
    }
  }
}
</style>
</style>