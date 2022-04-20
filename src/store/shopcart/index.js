//购物车仓库
import { reqCartList, reqDeleteCartById, reqUpdateCheckedByid } from '@/api'

const state = {
    cartList: [],
}
const actions = {
    //获取购物车列表数据
    async getCartList({ commit }) {
        const result = await reqCartList()
        // console.log(result)
        if (result.code == 200) {
            commit('GETCARTLIST', result.data)
        }
    },
    //删除购物车某一个产品
    async deleteCartListBySkuId({ commit }, skuId) {
        const result = await reqDeleteCartById(skuId)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error("faile"))
        }
    },
    //修改某一个商品的选中状态
    async updateCheckedById({ commit }, { skuId, isChecked }) {
        let result = await reqUpdateCheckedByid(skuId, isChecked)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error("faile"))
        }
    },
    // 删除全部选中的商品
    deleteAllChecked({ dispatch, getters }) {
        //context:小仓库，commit【提交mutations修改state】 getters【计算属性】 dispatch【派发action】 state【当前仓库数据】
        //获取购物车中全部的产品（是一个数组）
        let promiseAll = []
        //    console.log(dispatch,getters)
        // console.log(getters.cartList.cartInfoList)
        getters.cartList.cartInfoList.forEach(item => {
            let promise = item.isChecked == 1 ? dispatch('deleteCartListBySkuId', item.skuId) : ''
            promiseAll.push(promise)
        });
        //只要全部的p1|p2....都成功，返回结果即为成功
        //如果有一个失败，返回即为失败结果
        return Promise.all(promiseAll);
    },
    // 修改全部产品的选中状态
    updateAllCartIsChecked({dispatch,state},isChecked){
        // console.log(dispatch,state,isChecked)
        let promiseAll=[]
        state.cartList[0].cartInfoList.forEach(item=>{
           let promise=item.isChecked !=isChecked?dispatch('updateCheckedById',{skuId:item.skuId, isChecked}):''
           promiseAll.push(promise)
        })
        return Promise.all(promiseAll)
    }
}
const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList
    }
}
const getters = {
    cartList(state) {
        return state.cartList[0] || []
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}



