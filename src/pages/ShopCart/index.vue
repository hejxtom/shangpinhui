<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <!-- 表头 -->
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <!-- /表头 -->
      <!-- 中间  -->
      <div class="cart-body">
        <ul
          class="cart-list"
          v-for="(cartInfo, index) in cartInfoList"
          :key="cartInfo.id"
        >
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cartInfo.isChecked == 1"
              @click="updateChecked(cartInfo.skuId, $event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cartInfo.imgUrl" />
            <div class="item-msg">{{ cartInfo.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cartInfo.skuPrice }}.00</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="handler('mins', -1, cartInfo)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="cartInfo.skuNum"
              minnum="1"
              class="itxt"
              @change="handler('change', $event.target.value * 1, cartInfo)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="handler('add', 1, cartInfo)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cartInfo.cartPrice * cartInfo.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a
              href="/"
              class="sindelet"
              @click.prevent="deleteCartById(cartInfo.skuId)"
              >删除</a
            >
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
      <!-- /中间 -->
    </div>
    <!-- 底部 -->
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="isAllCheck && cartInfoList.length > 0"
          @click="updateAllCartChecked"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none" @click.prevent="deleteAllChecked">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" href="###" target="_blank" @click.prevent="$router.push('/trade')">结算</a>
        </div>
      </div>
    </div>
    <!-- /底部 -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import throttle from "lodash/throttle";
export default {
  name: "ShopCart",
  mounted() {
    this.getData();
  },
  computed: {
    ...mapGetters(["cartList"]),
    //购物车数据
    cartInfoList() {
      return this.cartList.cartInfoList || [];
    },
    //计算购买产品的总价
    totalPrice() {
      let sum = 0;
      this.cartInfoList.forEach((item) => {
        sum += item.cartPrice * item.skuNum;
      });
      return sum;
    },
    //判断底部复选框是否勾选【全部产品都选中，才勾选】
    isAllCheck() {
      return this.cartInfoList.every((item) => item.isChecked == 1);
    },
  },
  methods: {
    //获取个人购物车数据
    getData() {
      this.$store.dispatch("getCartList");
    },

    //修改某一个产品的个数
    /* 
    type:为了区分这三个元素
    disNum形参:+ 变化量（1）  -变化量（-1）   input最终的个数（并不是变化量）
    cartInfo:哪一个产品【身上有id】 */
    handler: throttle(async function (type, disNum, cartInfo) {
      // console.log(">>>", type, disNum, cartInfo);
      switch (type) {
        case "add":
          disNum = 1;
          break;
        case "mins":
          // if (cartInfo.skuNum < 0) {
          //   disNum = 0;
          // } else {
          //   disNum = -1;
          // }
          //判断产品的个数大于1，才可以传递给服务器-1
          //如果出现产品的个数小于等于1，传递给服务器个数0（原封不动）
          disNum = cartInfo.skuNum > 1 ? -1 : 0;
          break;
        case "change":
          //用户输入进来的最终量，如果非法的（带有汉字|出现负数），带给服务器数字零
          if (isNaN(disNum) || disNum < 1) {
            disNum = 0;
          } else {
            //属于正常情况（小数：取证），带给服务器变化的量 用户输入进来的 - 产品的起始个数
            disNum = parseInt(disNum) - cartInfo.skuNum;
          }
          break;
      }

      try {
        //派发action
        await this.$store.dispatch("addOrUpdateShopCart", {
          skuId: cartInfo.skuId,
          skuNum: disNum,
        });
        //再一次获取服务器最新的数据进行展示
        this.getData();
      } catch (error) {
        alert("请求失败");
      }
    }, 70),

    //删除购物车某一个产品
    async deleteCartById(skuId) {
      try {
        //如果删除成功再次发请求获取新的数据进行展示
        await this.$store.dispatch("deleteCartListBySkuId", skuId);
        //成功后查询
        this.getData();
      } catch (error) {
        alert("删除失败");
      }
    },

    //修改某个产品的勾选状态
    async updateChecked(skuId, event) {
      let isChecked = event.target.checked ? "1" : "0";
      try {
        await this.$store.dispatch("updateCheckedById", {
          skuId: skuId,
          isChecked: isChecked,
        });
        //成功后查询
        this.getData();
      } catch (error) {
        alert("修改勾选状态失败");
      }
    },

    // 删除全部选中的商品
    async deleteAllChecked() {
      try {
        //派发一个action
        await this.$store.dispatch("deleteAllChecked");
        //再发请求获取购物车列表
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },

    // 修改全部产品的选中状态
    async updateAllCartChecked(event){
      let isChecked=event.target.checked? '1':'0'
      try {
        await this.$store.dispatch('updateAllCartIsChecked', isChecked)

        // 发送请求
        this.getData()
      } catch (error) {
        alert('修改全部状态失败！')
      }
      // console.log(event)
    }
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
