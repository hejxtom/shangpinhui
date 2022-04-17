import { reqGoodsInfo, reqAddOrUpdateShopCart } from '@/api'
import {getUUID} from '@/utils/uuid_token'
//商品详情页数据仓库
const state = {
    goodsInfo: {},
    uuid_token:getUUID()
}
const actions = {
    //获取产品信息的action
    async getGoodsInfo({ commit }, skuId) {
        const result = await reqGoodsInfo(skuId)
        if (result.code === 200) {
            commit('GETGOODSINFO', result.data)
        }
    },
    //加入购物车的||修改某一个产品的个数
    async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
        //发请求:前端带一些参数给服务器【需要存储这些数据】，存储成功了，没有给返回数据
        //不需要在三连环（仓库存储数据了）
        //注意:async函数执行返回的结果一定是一个promise【要么成功，要么失败】
        let result = await reqAddOrUpdateShopCart(skuId, skuNum)
        if (result.code == 200) {
            return "ok"
        } else {
            return Promise.reject(new Error("faile"))
        }
    }
}
const mutations = {
    GETGOODSINFO(state, goodsInfo) {
        state.goodsInfo = goodsInfo
    }
}
const getters = {
    // 为什么要写成：state.goodsInfo.categoryView || {}？
    // 因为categoryView必须是一个对象，当goodsInfo没有数据时，此时的categoryView=undefine,控制台报红
    // 简化导航数据
    categoryView(state) {
        return state.goodsInfo.categoryView || {}
    },
    // 简化商品数据
    skuInfo(state) {
        return state.goodsInfo.skuInfo || {}
    },
    // 售卖属性
    spuSaleAttrList(state) {
        return state.goodsInfo.spuSaleAttrList || {}
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}
