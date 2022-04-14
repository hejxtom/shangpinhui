<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread:面包屑-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类的面包屑 -->
            <li class="with-x" v-if="searchParam.categoryName">
              {{ searchParam.categoryName }}<i @click="removeCategoryName">×</i>
            </li>
            <!-- 关键字的面包屑 -->
            <li class="with-x" v-if="searchParam.keyword">
              {{ searchParam.keyword }}<i @click="removeKeyword">×</i>
            </li>
            <!-- 品牌的面包屑 -->
            <li class="with-x" v-if="searchParam.trademark">
              {{ searchParam.trademark }}<i @click="removeTrademark">×</i>
            </li>
            <!-- 商品售卖属性的面包屑 -->
            <li
              class="with-x"
              v-for="(prop, index) in searchParam.props"
              :key="index"
            >
              {{ prop.split(":")[1] }}
              <i @click="removeProps(index)">×</i>
            </li>
          </ul>
        </div>
        <!--/bread-->
        <!--selector-->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo" />

        <!--details-->
        <div class="details clearfix">
          <!-- 排序 -->
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: isSyn }" @click="changOrder(1)">
                  <a
                    >综合<span
                      v-show="isSyn"
                      class="iconfont"
                      :class="{
                        'icon-long-arrow-up': isAsc,
                        'icon-long-arrow-down': !isAsc,
                      }"
                    ></span
                  ></a>
                </li>
                <li :class="{ active: !isSyn }" @click="changOrder(2)">
                  <a
                    >销量<span
                      v-show="!isSyn"
                      class="iconfont"
                      :class="{
                        'icon-long-arrow-up': isAsc,
                        'icon-long-arrow-down': !isAsc,
                      }"
                    ></span
                  ></a>
                </li>
              </ul>
            </div>
          </div>
          <!-- /排序 -->
          <!-- 商品 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li
                class="yui3-u-1-5"
                v-for="(goods, index) in goodsList"
                :key="goods.id"
              >
                <div class="list-wrap">
                  <div class="p-img">
                    <a href="item.html" target="_blank"
                      ><img :src="goods.defaultImg"
                    /></a>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ goods.price }}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" :title="goods.title">{{
                      goods.title
                    }}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- /商品 -->
          <!-- 分页 -->
          <Pagination
            :pageNo="searchParam.pageNo"
            :pageSize="searchParam.pageSize"
            :total="total"
            :continues="5"
            @getPageNo="getPageNo"
          />
          <!-- /分页 -->
        </div>
        <!--/details-->
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from "./SearchSelector/SearchSelector";
import { mapGetters, mapState } from "vuex";
export default {
  name: "Search",
  components: {
    SearchSelector,
  },
  data() {
    return {
      searchParam: {
        //产品相应的id
        category1id: "",
        category2id: "",
        category3id: "",
        //产品的名字
        categoryName: "",
        //搜索的关键字
        keyword: "",
        //排序:初始状态应该是综合且降序
        order: "1:desc",
        //第几页
        pageNo: 1,
        //每一页展示条数
        pageSize: 3,
        //平台属性的操作
        props: [],
        //品牌
        trademark: "",
      },
    };
  },
  computed: {
    ...mapGetters(["goodsList"]),
    // 1:代表综合
    // 2:代表价格
    // 3:asc代表升序
    // 4:desc代表降序
    isSyn() {
      return this.searchParam.order.indexOf("1") != -1;
    },
    isAsc() {
      return this.searchParam.order.indexOf("asc") != -1;
    },
    ...mapState({
      total: (state) => state.search.searchList.total,
    }),
  },
  //在挂载之前调用一次|可以在发请求之前将带有参数进行修改
  beforeMount() {
    //在发请求之前，把接口需要传递参数，进行整理（在给服务器发请求之前，把参数整理好，服务器就会返回查询的数据）
    Object.assign(this.searchParam, this.$route.query, this.$route.params);
  },
  mounted() {
    //在发请求之前咱们需要将searchParams里面参数进行修改带给服务器
    this.getData();
  },
  methods: {
    getData() {
      this.$store.dispatch("getSearchList", this.searchParam);
    },
    //删除分类的名字
    removeCategoryName() {
      //把带给服务器的参数置空了，还需要向服务器发请求
      //带给服务器参数说明可有可无的：如果属性值为空的字符串还是会把相应的字段带给服务器
      //但是你把相应的字段变为undefined，当前这个字段不会带给服务器
      this.searchParam.categoryName = undefined;
      this.searchParam.category1id = undefined;
      this.searchParam.category2id = undefined;
      this.searchParam.category3id = undefined;
      this.getData();
      //地址栏也需要需改：进行路由跳转(现在的路由跳转只是跳转到自己这里)
      //严谨：本意是删除query，如果路径当中出现params不应该删除，路由跳转的时候应该带着
      if (this.$route.params) {
        this.$router.push({ name: "search", params: this.$route.params });
      }
    },
    //删除关键字
    removeKeyword() {
      //把带给服务器的参数置空了，还需要向服务器发请求
      this.searchParam.keyword = undefined;
      //发送请求
      this.getData();
      //调用全局总线清除输入框（关键字）
      this.$bus.$emit("clear");
      //进行路由的跳转
      if (this.$route.query) {
        this.$router.push({ name: "search", query: this.$route.query });
      }
    },
    //自定义事件回调
    trademarkInfo(trademark, a, b, c) {
      // console.log(trademark)
      // //1:整理品牌字段的参数  "ID:品牌名称"
      this.searchParam.trademark = `${trademark.tmId}:${trademark.tmName}`;
      //再次发请求获取search模块列表数据进行展示
      this.getData();
    },
    //删除品牌的信息
    removeTrademark() {
      //将品牌信息置空
      this.searchParam.trademark = "";
      //再次发送请求
      this.getData();
    },
    //收集平台属性地方回调函数（自定义事件）
    attrInfo(prop) {
      //数组去重
      if (this.searchParam.props.indexOf(prop) === -1) {
        this.searchParam.props.push(prop);
      }
      //再次发请求
      this.getData();
    },
    //删除商品售卖信息
    removeProps(index) {
      this.searchParam.props.splice(index, 1);
      this.getData();
    },
    //排序的操作
    changOrder(flag) {
      //flag:用户每一次点击li标签的时候，用于区分是综合（1）还是价格（2）
      //现获取order初始状态【咱们需要通过初始状态去判断接下来做什么】
      let originOrder = this.searchParam.order;
      let orginsFlag = originOrder.split(":")[0];
      let originSort = originOrder.split(":")[1];
      //新的排序方式
      let newOrder = "";
      //判断的是多次点击的是不是同一个按钮
      if (flag == orginsFlag) {
        newOrder = `${orginsFlag}:${originSort == "desc" ? "asc" : "desc"}`;
      } else {
        //点击不是同一个按钮
        newOrder = `${flag}:${"desc"}`;
      }
      //需要给order重新赋值
      this.searchParam.order = newOrder;
      //再次发请求
      this.getData();
    },
    //点击页码回调函数
    getPageNo(pageNo) {
      // console.log(pageNo)
      if (this.searchParam.pageNo != pageNo) {
        this.searchParam.pageNo = pageNo;
        this.getData();
      }
    },
  },
  //数据监听：监听组件实例身上的属性的属性值变化
  watch: {
    //监听路由的信息是否发生变化，如果发生变化，再次发起请求
    $route(newValue, oldValue) {
      Object.assign(this.searchParam, this.$route.query, this.$route.params);
      //  console.log(this.searchParam)
      //再次发起ajax请求
      this.getData();
      //每一次请求完毕，应该把相应的1、2、3级分类的id置空的，让他接受下一次的相应1、2、3
      //分类名字与关键字不用清理：因为每一次路由发生变化的时候，都会给他赋予新的数据
      this.searchParam.category1id = undefined;
      this.searchParam.category2id = undefined;
      this.searchParam.category3id = undefined;
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>