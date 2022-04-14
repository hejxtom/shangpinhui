import {reqGoodsInfo} from '@/api'

//商品详情页数据仓库
const state={
    goodsInfo:{}
}
const actions={
    async getGoodsInfo({commit},skuId){
        const result=await reqGoodsInfo(skuId)
        if(result.code===200){
            commit('GETGOODSINFO',result.data)
        }
    }
}
const mutations={
    GETGOODSINFO(state,goodsInfo){
        state.goodsInfo=goodsInfo
    }
}
const getters={
    // 为什么要写成：state.goodsInfo.categoryView || {}？
    // 因为categoryView必须是一个对象，当goodsInfo没有数据时，此时的categoryView=undefine,控制台报红
    categoryView(state){
        return state.goodsInfo.categoryView || {}
    },
    skuInfo(state){
        return state.goodsInfo.skuInfo || {}
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}
